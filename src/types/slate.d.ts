import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

type FormattedText = { text: string; bold?: true }

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

type CustomElement = ParagraphElement | CodeElement | HeadingElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
