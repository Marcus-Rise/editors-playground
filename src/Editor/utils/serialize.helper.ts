import {Text} from "slate";
import escapeHtml from "escape-html";
import {CustomElement, CustomText} from "../../types/slate";

const serialize = (node: CustomElement | CustomText): string => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)

    if (node.bold) {
      string = `<strong>${string}</strong>`
    } else if (node.italic) {
      string = `<i>${string}</i>`
    }

    return string
  }

  const children = node.children.map(n => serialize(n)).join('')

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}

export {serialize};
