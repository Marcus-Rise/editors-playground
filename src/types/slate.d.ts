import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

type FormattedText = { text: string; bold?: true; italic?: true; underline?: true }

type CustomText = FormattedText

type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

type CodeElement = {
  type: 'code'
  children: CustomText[]
}

type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

type LinkElement = {
  type: 'link'
  url: string;
  children: CustomText[]
}

type CustomElement = ParagraphElement | CodeElement | HeadingElement | LinkElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
