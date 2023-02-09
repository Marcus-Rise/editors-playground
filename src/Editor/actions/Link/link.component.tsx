import {FC, useCallback, useState} from 'react';
import {Action} from '../action';
import { ReactComponent as LinkOutline } from '@admiral-ds/icons/build/system/LinkOutline.svg';
import LinkModal from './LinkModal';
import {
  getRange,
  restoreCaret,
  selectNode
} from '../../utils/selection';
import { createLink, getLink, isLink } from '../../utils/dom';

const COMMAND_CREATE_LINK = 'createLink';
const COMMAND_UNLINK = 'unlink';
const COMMAND_INSERT_HTML = 'insertHTML';

const Link: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const [range, setRange] = useState(getRange());

  const handleClick = useCallback(() => {
    setRange(getRange());

    setOpen(true);
  }, [setActive, isActive]);

  const handleSelectionChange = useCallback(() => {
    if (!isOpen) {
      setActive(isLink());
    }
  }, [setActive, isActive, isOpen]);

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(
    (href?: string, text?: string) => {
      if (range.collapsed && !isActive) {
        restoreCaret(range);
        document.execCommand(COMMAND_CREATE_LINK, false, text);
        document.execCommand(COMMAND_CREATE_LINK, false, href);
      } else {
        const link = createLink(text, href);

        new Promise((resolve) => {
          setTimeout(() => {
            selectNode(range);
            resolve(void 0);
          });
        }).then(() => {
          document.execCommand(
            href ? COMMAND_INSERT_HTML : COMMAND_UNLINK,
            false,
            link.outerHTML
          );
        });
      }
      handleModalClose();
    },
    [setActive, isActive, range]
  );
  const { href, text } = getLink();

  return (
    <>
      <Action
        tooltip="Ссылка"
        onClick={handleClick}
        isActive={isActive}
      >
        <LinkOutline />
      </Action>
      <LinkModal
        isOpen={isOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        initialLink={href}
        initialText={text}
      />
    </>
  );
};

export {Link};
