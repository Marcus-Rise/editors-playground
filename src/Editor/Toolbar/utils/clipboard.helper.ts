const copyToClipboard = (text: string) => {
  return navigator.clipboard.writeText(text);
}

const readFromClipboard = () => {
  return navigator.clipboard.readText();
}

export {copyToClipboard, readFromClipboard};
