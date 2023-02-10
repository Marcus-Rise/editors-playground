import {ComponentProps, FC, useCallback, useState} from 'react';
import {Action} from '../action';
import {ReactComponent as LinkOutline} from '@admiral-ds/icons/build/system/LinkOutline.svg';
import LinkModal from './LinkModal';

type Submit = ComponentProps<typeof LinkModal>["onSubmit"];
type Props = {
  value?: {
    text?: string;
    link?: string;
  }
  onSubmit: Submit;
};
const Link: FC<Props> = ({onSubmit, value}) => {
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
        tooltip="Ссылка"
        onClick={open}
      >
        <LinkOutline/>
      </Action>
      <LinkModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={submit}
        initialLink={value?.link}
        initialText={value?.text}
      />
    </>
  );
};

export {Link};
