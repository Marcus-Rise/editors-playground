export const createLink = (text = '', href = '') => {
  const link = document.createElement('a');
  link.setAttribute('href', href);
  const textElement = document.createTextNode(text);
  link.appendChild(textElement);

  return link;
};

export const isLink = () => {
  const selection = window.getSelection();
  const startA =
    (selection?.anchorNode?.parentNode as HTMLLinkElement)?.tagName === 'A';
  const endA =
    (selection?.focusNode?.parentNode as HTMLLinkElement)?.tagName === 'A';
  return startA || endA;
};

export const getLink = () => {
  const selection = window.getSelection();
  const href = (selection?.anchorNode?.parentNode as HTMLLinkElement)?.href;
  const text = !isLink()
    ? selection?.toString()
    : (selection?.anchorNode?.parentNode as HTMLLinkElement)?.innerText;

  return { href, text };
};
