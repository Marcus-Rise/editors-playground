import {FC, MouseEvent, useCallback, useRef, useState} from 'react';
import {Action} from '../action';
import { ColorIcon } from './assets/color';
import { Theme } from '@admiral-ds/react-ui';
import { useTheme } from 'styled-components';
import { getColors } from './colors';
import { convertRGBtoHex } from '../../utils/color';
import { ColorContainer, ColorItem, Dropdown } from './styles';

const COMMAND = 'foreColor';

const Color: FC = () => {
  const theme = useTheme() as Theme;
  const colors = getColors(theme);
  const [isActive, setActive] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    setDropdownOpen(true);
    setActive(true);
  }, [setActive, isActive]);

  const handleSelectionChange = useCallback(() => {
    const [_, ...restColors] = Object.values(colors);

    setActive(
      restColors.includes(
        convertRGBtoHex(document.queryCommandValue(COMMAND)).toUpperCase()
      )
    );
  }, [setActive, isActive, colors]);

  const handleItemMouseDown = useCallback(
    (color: string, event: MouseEvent) => {
      event.stopPropagation();
      document.execCommand(COMMAND, false, colors[color]);
      handleDropdownClose();
    },
    []
  );

  const handleDropdownClose = useCallback(() => {
    setDropdownOpen(false);
    setActive(false);
  }, [setActive]);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);
  return (
    <>
      {isDropdownOpen && (
        <Dropdown
          targetRef={ref}
          menuFocus="firstOption"
          onMouseDown={handleMouseDown}
          onClickOutside={handleDropdownClose}
        >
          <ColorContainer>
            {Object.keys(colors).map((color) => (
              <ColorItem
                key={color}
                color={color}
                onMouseDown={handleItemMouseDown.bind(this, color)}
              />
            ))}
          </ColorContainer>
        </Dropdown>
      )}
      <Action
        tooltip="Цвет"
        ref={ref}
        onClick={handleClick}
        isActive={isActive}
      >
        <ColorIcon color={document.queryCommandValue(COMMAND)} />
      </Action>
    </>
  );
};

export {Color};
