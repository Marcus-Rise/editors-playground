export const selectNode = (range: Range) => {
  if (range.collapsed) {
    range.selectNode(range.startContainer);
  } else {
    range.setStart(range.startContainer, range.startOffset);
    range.setEnd(range.endContainer, range.endOffset);
  }

  document.getSelection()?.removeAllRanges();
  document.getSelection()?.addRange(range);
};

export const getRange = () => {
  const selection = document.getSelection();

  return selection?.rangeCount
    ? selection.getRangeAt(0)
    : document.createRange();
};

export const restoreCaret = (range: Range) => {
  document.getSelection()?.collapse(range.endContainer, range.endOffset);
};
