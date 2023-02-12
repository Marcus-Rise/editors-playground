import {ComponentProps, FC, useCallback, useState} from 'react';
import {Action} from '../action';
import {ReactComponent as LinkOutline} from '@admiral-ds/icons/build/system/LinkOutline.svg';
import LinkModal from './LinkModal';
import {FormattedText} from "../../../../types/slate";

type Submit = ComponentProps<typeof LinkModal>["onSubmit"];
type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children"> & {
  value?: FormattedText["href"];
  onSubmit: Submit;
};
const Link: FC<Props> = ({onSubmit, value, ...props}) => {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const submit: Submit = useCallback((dto) => {
    onSubmit(dto);

    close();
  }, [close, onSubmit]);

  return (
    <>
      <Action
        {...props}
        tooltip="Ссылка"
        onClick={open}
      >
        <LinkOutline/>
      </Action>
      <LinkModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={submit}
        value={value}
      />
    </>
  );
};

export {Link};
