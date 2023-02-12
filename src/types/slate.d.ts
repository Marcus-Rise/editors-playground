import {BaseEditor} from 'slate'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {BaseElement} from "slate/dist/interfaces/element";

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

type FormattedText = { text: string; bold?: true; italic?: true; underline?: true; color?: string; href?: string;}

type CustomText = FormattedText;

type ParagraphElement = BaseElement & {
  type: 'paragraph'
  children: CustomText[]
}

type ListItem = BaseElement & {
  type: 'list_item';
  children: CustomText[];
};

type ListOrderedElement = BaseElement & {
  type: 'list_ordered';
  children: Array<ListItem | ListOrderedElement | ListUnOrderedElement>;
}

type ListUnOrderedElement = BaseElement & {
  type: 'list_unordered';
  children: Array<ListItem | ListOrderedElement | ListUnOrderedElement>;
}

type CustomElement = ParagraphElement | ListOrderedElement | ListUnOrderedElement | ListItem;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
