import {
  InputField,
  Modal,
  ModalButtonPanel,
  ModalContent,
  ModalTitle
} from '@admiral-ds/react-ui';
import {
  ChangeEvent, FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Fieldset, overlayStyles, AddButton, CanselButton } from './styles';

type LinkModalDto = {
  link?: string;
}

type LinkModalProps = {
  isOpen: boolean;
  initialLink?: string;
  initialText?: string;
  onClose: () => void;
  onSubmit: (dto: LinkModalDto) => void;
};

const LinkModal: FC<LinkModalProps> = ({
  isOpen,
  initialLink,
  initialText,
  onClose,
  onSubmit
}) => {
  const [link, setLink] = useState(initialLink);

  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit({link});
  }, [onSubmit, link]);

  const reset = useCallback(() => {
    setLink('');
  }, []);

  useEffect(() => {
    if (initialLink ?? initialText) {
      setLink(initialLink);
    }

    if (!isOpen) {
      reset();
    }
  }, [initialLink, initialText, isOpen, reset]);

  const handleLinkChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLink(event.target.value);
    },
    []
  );

  const container = useMemo(() => {
    return document.querySelector('[role=dialog]') ?? document.body;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      closeOnOutsideClick
      closeOnEscapeKeyDown
      onClick={handleClick}
      container={container}
      overlayStyledCss={overlayStyles}
      onClose={onClose}
    >
      <ModalTitle>Добавить ссылку</ModalTitle>
      <ModalContent>
        <Fieldset>
          <InputField
            label="Адрес ссылки"
            placeholder="www.example.ru"
            value={link}
            onChange={handleLinkChange}
          />
        </Fieldset>
      </ModalContent>
      <ModalButtonPanel>
        <AddButton onClick={handleSubmit}>Добавить</AddButton>
        <CanselButton onClick={onClose}>Отменить</CanselButton>
      </ModalButtonPanel>
    </Modal>
  );
};

export default LinkModal;
export type {LinkModalDto};
