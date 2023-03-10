import {jsx} from 'slate-hyperscript'
import {Descendant} from "slate";
import {FormattedText} from "../../types/slate";

const deserialize = (el: Element, markAttributes?: Partial<FormattedText>): Descendant[] | Descendant => {
  if (el.nodeType === Node.TEXT_NODE) {
    return [jsx('text', markAttributes, el.textContent)]
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return []; // null
  }

  const nodeAttributes = {...markAttributes}

  // define attributes for text nodes
  switch (el.nodeName) {
    case 'STRONG': {
      nodeAttributes.bold = true;
      break;
    }
    case 'I': {
      nodeAttributes.italic = true;
      break;
    }
    case 'U': {
      nodeAttributes.underline = true;
      break;
    }
    case 'FONT': {
      const color = el.attributes.getNamedItem("color")?.value;

      nodeAttributes.color = color ?? undefined;
      break;
    }
    case 'A': {
      const href = el.attributes.getNamedItem("href")?.value;

      nodeAttributes.href = href ?? undefined;
      break;
    }
  }

  const children = Array.from(el.childNodes)
    .map(node => deserialize(node as Element, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx('text', nodeAttributes, ''))
  }

  switch (el.nodeName) {
    case 'BODY':
      return jsx('fragment', {}, children)
    case 'BR':
      return {text: '\n'} // '\n'
    case 'BLOCKQUOTE':
      return jsx('element', {type: 'quote'}, children)
    case 'P':
      return jsx('element', {type: 'paragraph'}, children)
    case 'LI':
      return jsx('element', {type: 'list_item'}, children)
    case 'OL':
      return jsx('element', {type: 'list_ordered'}, children)
    case 'UL':
      return jsx('element', {type: 'list_unordered'}, children)
    case 'TABLE':
      return jsx('element', {type: 'table'}, children)
    case 'TR':
      return jsx('element', {type: 'table_row'}, children)
    case 'TD':
      return jsx('element', {type: 'table_cell'}, children)
    default:
      return children
  }
}

export {deserialize}
