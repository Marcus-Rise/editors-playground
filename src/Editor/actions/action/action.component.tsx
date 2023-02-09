import {FC, forwardRef, MouseEvent, ReactNode, Ref, useCallback, useMemo, useRef} from 'react';
import {Root, Tooltip, Wrapper} from './styles';

export type Props = {
  children: ReactNode;
  tooltip: string;
  ref?: Ref<HTMLDivElement> | null;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
};

const Action: FC<Props> = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      tooltip,
      isActive,
      onClick,
      disabled
    },
    ref
  ) => {
    const renderTooltip = useMemo(() => () => tooltip, [tooltip]);
    const iconRef = useRef<HTMLButtonElement>(null);

    const handleMouseDown = useCallback((event: MouseEvent) => {
      event.preventDefault();
    }, []);

    return (
      <Wrapper ref={ref}>
        <Tooltip
          trigger="hover"
          tooltipPosition="top"
          disabled={disabled}
          anchorElementRef={iconRef}
          renderContent={renderTooltip}
        >
          <Root
            ref={iconRef}
            onMouseDown={handleMouseDown}
            disabled={disabled}
            isActive={isActive}
            onClick={onClick}
          >
            {children}
          </Root>
        </Tooltip>
      </Wrapper>
    );
  }
);

Action.displayName = 'Action';

export {Action};
