import {jsx} from 'slate-hyperscript'
import {Node as SlateNode} from "slate";

const deserialize = (el: Element, markAttributes = Object.create({})): Array<SlateNode> | SlateNode => {
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
    case 'A':
      return jsx(
        'element',
        {type: 'link', url: el.getAttribute('href')},
        children
      )
    default:
      return children
  }
}

export {deserialize}
