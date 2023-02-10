import {Text} from "slate";
import escapeHtml from "escape-html";
import {CustomElement, CustomText} from "../../types/slate";

const serialize = (node: CustomElement | CustomText): string => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)

    if (node.bold) {
      string = `<strong>${string}</strong>`
    }

    if (node.italic) {
      string = `<i>${string}</i>`
    }

    if (node.underline) {
      string = `<u>${string}</u>`
    }

    if (node.color) {
      string = `<font color="${node.color}">${string}</font>`
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
