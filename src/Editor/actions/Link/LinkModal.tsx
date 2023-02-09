import {
  InputField,
  Modal,
  ModalButtonPanel,
  ModalContent,
  ModalTitle
} from '@admiral-ds/react-ui';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Fieldset, overlayStyles, AddButton, CanselButton } from './styles';

type LinkModalProps = {
  isOpen: boolean;
  initialLink?: string;
  initialText?: string;
  onClose: () => void;
  onSubmit: (text?: string, link?: string) => void;
};

const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  initialLink,
  initialText,
  onClose,
  onSubmit
}) => {
  const [link, setLink] = useState(initialLink);
  const [text, setText] = useState(initialText);

  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(link, text);
  }, [onSubmit, link, text]);

  const reset = useCallback(() => {
    setLink('');
    setText('');
  }, [setLink, setText]);

  useEffect(() => {
    if (initialLink ?? initialText) {
      setLink(initialLink);
      setText(initialText);
    }

    if (!isOpen) {
      reset();
    }
  }, [initialLink, initialText, isOpen]);

  const handleLinkChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLink(event.target.value);
    },
    []
  );

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
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
            label="Отображаемый текст"
            placeholder="Пример текста ссылки"
            value={text}
            onChange={handleTextChange}
          />
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
