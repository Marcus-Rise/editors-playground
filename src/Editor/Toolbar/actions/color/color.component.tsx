import {ComponentProps, FC, MouseEvent, useCallback, useRef, useState} from 'react';
import {Action} from '../action';
import {ColorIcon} from './assets/color';
import {Theme} from '@admiral-ds/react-ui';
import {useTheme} from 'styled-components';
import {getColors} from './colors';
import {ColorContainer, ColorItem, Dropdown} from './styles';

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children"> & {
  onSelect: (color: string) => void;
};

const Color: FC<Props> = ({onSelect, ...props}) => {
  const theme = useTheme() as Theme;
  const colors = getColors(theme);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    setDropdownOpen(true);
  }, []);


  const handleDropdownClose = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  /*const handleSelectionChange = useCallback(() => {
    const [_, ...restColors] = Object.values(colors);

    setActive(
      restColors.includes(
        convertRGBtoHex(document.queryCommandValue(COMMAND)).toUpperCase()
      )
    );
  }, [setActive, isActive, colors]);*/

  const handleItemMouseDown = useCallback(
    (color: string, event: MouseEvent) => {
      event.stopPropagation();
      onSelect(colors[color]);
      handleDropdownClose();
    },
    [colors, handleDropdownClose, onSelect]
  );

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
        {...props}
        tooltip="Цвет"
        ref={ref}
        onClick={handleClick}
      >
        <ColorIcon color={""} />
      </Action>
    </>
  );
};

export {Color};
