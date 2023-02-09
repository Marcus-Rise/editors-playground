import styled from 'styled-components';
import {ReactNode} from "react";

const getPaddingStyle = (padding?: PaddingType) => {
  switch (typeof padding) {
    case 'object':
      return {
        'padding-top': padding.top,
        'padding-right': padding.right,
        'padding-bottom': padding.bottom,
        'padding-left': padding.left
      };
    case 'string':
      return { padding };
    case 'number':
      return { padding };
  }
};

enum RoundSize {
  s = '8px',
  m = '12px'
}

const getRoundStyle = (round?: RoundType) => {
  return {
    'border-radius': round && RoundSize[round]
  };
};

type PaddingType =
  | Partial<Record<keyof typeof PageSide, number>>
  | number
  | 'none';

type RoundType = keyof typeof RoundSize;

 enum PageSide {
  top,
  bottom,
  left,
  right
}

export type Props = {
  padding?: PaddingType;
  round?: RoundType;
  children?: ReactNode;
  scrollable?: boolean;
};

const Container = styled.div<Props>(({ padding, round, scrollable }) => ({
  ...getPaddingStyle(padding),
  ...getRoundStyle(round),

  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: scrollable ? 'auto' : 'none'
}));

Container.defaultProps = {
  padding: {
    top: 16,
    right: 32,
    left: 32,
    bottom: 32
  }
};

export default Container;
