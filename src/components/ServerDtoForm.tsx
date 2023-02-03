import type {FC} from 'react';
import {FormEventHandler, useEffect, useState} from "react";
import {ServerDto} from "../dto";

type Props = { onChange: (dto: ServerDto) => void, defaultValue: ServerDto };
const ServerDtoForm: FC<Props> = ({defaultValue, onChange}) => {
  const [dto, setDto] = useState<ServerDto>(defaultValue);

  useEffect(() => {
    setDto(defaultValue);
  }, [defaultValue])

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onChange(dto);
  }

  return (
    <form onSubmit={submit}>
      <br/>
      <label htmlFor="dto-input">Server dto html</label>
      <br/>
      <textarea name="dto" id="dto-input" cols={100} rows={10} value={dto}
                onChange={(e) => setDto(e.target.value)}/>
      <br/>
      <button type={"submit"}>Submit</button>
    </form>
  );
};

export {ServerDtoForm};
