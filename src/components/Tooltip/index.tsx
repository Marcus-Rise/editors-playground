import {FakeTarget, Portal, TooltipContainer, TooltipWrapper} from './styles';
import {
  getScrollableParents,
  getScrollbarSize,
  getTooltipDirection,
  TooltipPositionType
} from './utils';
import {
  cloneElement,
  FC,
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";

export interface ITooltipProps extends HTMLAttributes<HTMLDivElement> {
  renderContent: () => ReactNode;
  container?: Element | null;
  withDelay?: boolean;
  trigger?: 'hover';
  visible?: boolean;
  children: ReactElement;
  anchorElementRef: MutableRefObject<HTMLElement | null>;
  tooltipPosition?: TooltipPositionType;
}

const TOOLTIP_DELAY = 1500;

export const Tooltip: FC<ITooltipProps> = ({
  renderContent,
  container: userContainer,
  withDelay,
  tooltipPosition,
  children,
  anchorElementRef,
  visible: globalVisible,
  trigger,
  ...props
}) => {
  const tooltipElementRef = useRef<HTMLDivElement | null>(null);
  const container: Element = userContainer || document.body;
  let scrollableParents: Array<Element> | undefined = undefined;
  let showTooltipTimer: any;

  const [visible, setVisible] = useState<boolean>(Boolean(globalVisible));
  const [portalFlexDirection, setPortalFlexDirection] = useState('');
  const [portalFullWidth, setPortalFullWidth] = useState(false);

  const hideTooltip = () => setVisible(false);

  const manageTooltip = (scrollbarSize: number) => {
    if (anchorElementRef.current && tooltipElementRef.current) {
      const direction = getTooltipDirection(
        anchorElementRef.current,
        tooltipElementRef.current,
        scrollbarSize,
        tooltipPosition
      );
      const tooltip = tooltipElementRef.current;
      switch (direction) {
        case 'topPageCenter':
          setPortalFlexDirection('column-reverse');
          setPortalFullWidth(true);
          tooltip.style.margin = '0 0 8px 0';
          break;
        case 'bottomPageCenter':
          setPortalFlexDirection('column');
          setPortalFullWidth(true);
          tooltip.style.margin = '8px 0 0 0';
          break;
        case 'left':
          setPortalFlexDirection('row-reverse');
          setPortalFullWidth(false);
          tooltip.style.margin = '0 8px 0 0';
          break;
        case 'right':
          setPortalFlexDirection('row');
          setPortalFullWidth(false);
          tooltip.style.margin = '0 0 0 8px';
          break;
        case 'top':
          setPortalFlexDirection('column-reverse');
          setPortalFullWidth(false);
          tooltip.style.margin = '0 0 8px 0';
          break;
        case 'bottom':
        default:
          setPortalFlexDirection('column');
          setPortalFullWidth(false);
          tooltip.style.margin = '8px 0 0 0';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', hideTooltip);
    window.addEventListener('scroll', hideTooltip);

    if (!scrollableParents && anchorElementRef.current) {
      scrollableParents = getScrollableParents(anchorElementRef.current);
      scrollableParents?.forEach((el) =>
        el.addEventListener('scroll', hideTooltip)
      );
    }
    return () => {
      clearTimeout(showTooltipTimer);
      window.removeEventListener('resize', hideTooltip);
      window.removeEventListener('scroll', hideTooltip);
      scrollableParents?.forEach((el) =>
        el.removeEventListener('scroll', hideTooltip)
      );
    };
  });

  useEffect(() => {
    const scrollbarSize = getScrollbarSize();
    manageTooltip(scrollbarSize);
  }, [anchorElementRef, tooltipPosition, container]);

  useEffect(() => {
    if (tooltipElementRef.current) {
      tooltipElementRef.current.style.opacity = '1';
    }
  }, [tooltipElementRef.current, visible]);

  useEffect(() => {
    anchorElementRef.current?.addEventListener('mouseenter', handleMouseEnter);
    anchorElementRef.current?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      anchorElementRef.current?.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );
      anchorElementRef.current?.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  }, [anchorElementRef.current]);

  const handleMouseEnter = () => {
    showTooltipTimer = window.setTimeout(
      () => {
        setVisible(true);
        manageTooltip(getScrollbarSize());
      },
      withDelay ? TOOLTIP_DELAY : 0
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(showTooltipTimer);
    hideTooltip();
  };

  const element = (
    <Portal
      targetRef={anchorElementRef}
      container={container}
      flexDirection={portalFlexDirection}
      fullContainerWidth={portalFullWidth}
    >
      <FakeTarget />
      <TooltipWrapper ref={tooltipElementRef}>
        <TooltipContainer role="tooltip" {...props}>
          {renderContent()}
        </TooltipContainer>
      </TooltipWrapper>
    </Portal>
  );

  return (
    <>
      {cloneElement(children, {
        onFocus: handleMouseEnter,
        onBlur: handleMouseLeave,
        ref: anchorElementRef
      })}
      {trigger === 'hover' && visible && element}
      {visible && globalVisible && element}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
