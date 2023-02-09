import {FC, useCallback, useState} from 'react';
import {Action} from '../action';
import {ReactComponent as LinkOutline} from '@admiral-ds/icons/build/system/LinkOutline.svg';
import LinkModal from './LinkModal';

type Props = {
  value: {
    text?: string;
    link?: string;
  }
  onSubmit: (text?: string, link?: string) => void;
};
const Link: FC<Props> = ({onSubmit, value: {link, text}}) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Action
        tooltip="Ссылка"
        onClick={handleClick}
      >
        <LinkOutline/>
      </Action>
      <LinkModal
        isOpen={isOpen}
        onClose={handleModalClose}
        onSubmit={onSubmit}
        initialLink={link}
        initialText={text}
      />
    </>
  );
};

export {Link};
