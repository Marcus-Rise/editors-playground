import {EditorDto, ServerDto} from "./types";

abstract class ServerDtoFactory {
  static fromEditorDto(dto: EditorDto): ServerDto {
    return `<p>awdawdwad</p>`;
  }
}

export {ServerDtoFactory}
