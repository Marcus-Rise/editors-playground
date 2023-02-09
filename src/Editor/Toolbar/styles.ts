import styled from 'styled-components';

export const Root = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.color['Neutral/Neutral 20']};
  border-top: 1px solid ${({theme}) => theme.color['Neutral/Neutral 20']};

  padding: 8px 0;

  white-space: nowrap;
  overflow: auto;

  display: flex;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Group = styled.div`
  display: inline-flex;

  &:not(:last-child) {
    border-right: 1px solid ${({theme}) => theme.color['Neutral/Neutral 20']};
    padding-right: 8px;
  }

  &:not(:first-child) {
    padding-left: 8px;
  }

  & > div:not(:last-child) {
    margin-right: 4px;
  }
`;
