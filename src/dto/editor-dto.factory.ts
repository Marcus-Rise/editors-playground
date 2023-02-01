import {EditorDto, ServerDto} from "./types";
import data from '../data.json';

abstract class EditorDtoFactory {
  static fromServerDto(_dto: ServerDto): EditorDto {
    return data.blocks;
  }
}

export {EditorDtoFactory}
