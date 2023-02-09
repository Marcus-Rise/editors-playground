const GAP = 8;

export type TooltipPositionType =
  | 'bottom'
  | 'top'
  | 'left'
  | 'right'
  | 'bottomPageCenter'
  | 'topPageCenter';
export type CalculationResult = {
  check: (anchorElementRect: DOMRect, tooltipRect: DOMRect) => boolean;
};

export function getTooltipDirection(
  anchorElement: HTMLElement,
  tooltipElement: HTMLElement,
  scrollbarSize: number,
  tooltipPosition?: TooltipPositionType
): any {
  const anchorElementRect: DOMRect = anchorElement.getBoundingClientRect();
  const tooltipRect: DOMRect = tooltipElement.getBoundingClientRect();
  const positions = Object.entries(getPositionMapper(scrollbarSize)) as [
    TooltipPositionType,
    CalculationResult
  ][];

  const compatiblePositions = tooltipPosition
    ? positions.filter((kv) => {
        return kv[0] === tooltipPosition;
      })
    : positions.filter((kv) => {
        return kv[1].check(anchorElementRect, tooltipRect);
      });

  return compatiblePositions.length ? compatiblePositions[0][0] : 'bottom';
}

function getPositionMapper(
  scrollbarSize: number
): Record<TooltipPositionType, CalculationResult> {
  return {
    bottom: {
      check: (anchorElementRect: DOMRect, tooltipRect: DOMRect) => {
        const isEnoughOnBottom =
          window.innerHeight - anchorElementRect.bottom - scrollbarSize >
          GAP + tooltipRect.height;
        const isEnoughOnLeft =
          anchorElementRect.left + anchorElementRect.width / 2 >
          tooltipRect.width / 2;
        const isEnoughOnRight =
          window.innerWidth -
            anchorElementRect.right -
            scrollbarSize +
            anchorElementRect.width / 2 >
          tooltipRect.width / 2;
        return isEnoughOnBottom && isEnoughOnLeft && isEnoughOnRight;
      }
    },
    top: {
      check: (anchorElementRect: DOMRect, tooltipRect: DOMRect) => {
        const isEnoughOnTop = anchorElementRect.top > GAP + tooltipRect.height;
        const isEnoughOnLeft =
          anchorElementRect.left + anchorElementRect.width / 2 >
          tooltipRect.width / 2;
        const isEnoughOnRight =
          window.innerWidth -
            anchorElementRect.right -
            scrollbarSize +
            anchorElementRect.width / 2 >
          tooltipRect.width / 2;
        return isEnoughOnTop && isEnoughOnLeft && isEnoughOnRight;
      }
    },
    left: {
      check: (anchorElementRect: DOMRect, tooltipRect: DOMRect) => {
        const isEnoughOnLeft = anchorElementRect.left > GAP + tooltipRect.width;
        const isEnoughOnTop =
          anchorElementRect.top >
          (tooltipRect.height - anchorElementRect.height) / 2;
        const isEnoughOnBottom =
          window.innerHeight - anchorElementRect.bottom - scrollbarSize >
          (tooltipRect.height - anchorElementRect.height) / 2;
        return isEnoughOnLeft && isEnoughOnBottom && isEnoughOnTop;
      }
    },
    right: {
      check: (anchorElementRect: DOMRect, tooltipRect: DOMRect) => {
        const isEnoughOnRight =
          window.innerWidth - anchorElementRect.right - scrollbarSize >
          GAP + tooltipRect.width;
        const isEnoughOnTop =
          anchorElementRect.top >
          (tooltipRect.height - anchorElementRect.height) / 2;
        const isEnoughOnBottom =
          window.innerHeight - anchorElementRect.bottom - scrollbarSize >
          (tooltipRect.height - anchorElementRect.height) / 2;
        return isEnoughOnRight && isEnoughOnBottom && isEnoughOnTop;
      }
    },
    bottomPageCenter: {
      check: (anchorElementRect: DOMRect, tooltipRect: DOMRect) => {
        const isEnoughOnBottom =
          window.innerHeight - anchorElementRect.bottom - scrollbarSize >
          GAP + tooltipRect.height;
        const isEnoughOnCenter =
          window.innerWidth - scrollbarSize >= tooltipRect.width;
        return isEnoughOnBottom && isEnoughOnCenter;
      }
    },
    topPageCenter: {
      check: (anchorElementRect: DOMRect, tooltipRect: DOMRect) => {
        const isEnoughOnTop = anchorElementRect.top > GAP + tooltipRect.height;
        const isEnoughOnCenter =
          window.innerWidth - scrollbarSize >= tooltipRect.width;
        return isEnoughOnTop && isEnoughOnCenter;
      }
    }
  };
}

export const getScrollableParents = (parent: Element | null | undefined) => {
  const parents: Array<Element> = [];

  if (parent) {
    let currentParent = parent;
    while (currentParent) {
      const computedStyle = window.getComputedStyle(currentParent);
      if (
        computedStyle.getPropertyValue('overflow') === 'auto' ||
        computedStyle.getPropertyValue('overflow') === 'scroll' ||
        computedStyle.getPropertyValue('overflow-x') === 'auto' ||
        computedStyle.getPropertyValue('overflow-x') === 'scroll' ||
        computedStyle.getPropertyValue('overflow-y') === 'auto' ||
        computedStyle.getPropertyValue('overflow-y') === 'scroll'
      ) {
        parents.push(currentParent);
      }
      currentParent = currentParent.parentElement as Element;
    }
  }
  return parents;
};

export const getScrollbarSize = () => {
  let scrollBarWidth = 0;
  const scrollbox = document.createElement('div');
  scrollbox.innerHTML = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem 
    nonummy nibh euismod tincidunt ut lacreet dolore magna aliguam erat volutpat. 
    Ut wisis enim ad minim veniam, quis nostrud exerci tution ullamcorper suscipit 
    lobortis nisl ut aliquip ex ea commodo consequat.`;
  scrollbox.style.overflow = 'scroll';
  scrollbox.style.fontSize = '14px';
  scrollbox.style.height = '50px';
  scrollbox.style.maxHeight = '50px';
  scrollbox.style.width = '100px';
  scrollbox.style.position = 'absolute';
  scrollbox.style.top = '-100000px';
  scrollbox.style.left = '-100000px';
  document.body.appendChild(scrollbox);
  scrollBarWidth = scrollbox.offsetWidth - scrollbox.clientWidth;
  document.body.removeChild(scrollbox);
  return scrollBarWidth || 16;
};
