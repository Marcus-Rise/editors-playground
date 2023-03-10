import styled from 'styled-components';
import {FC} from "react";

type Props = {
  color?: string;
};

const Rect = styled.rect`
  fill: ${(props) => props.fill} !important;
`;

const ColorIcon: FC<Props> = ({color}) =>
  (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_21338_69235)">
        <path
          d="M14.167 14.4418C14.167 14.3168 14.2156 14.1988 14.3128 14.1085C14.5003 13.9418 14.7851 13.9557 14.9517 14.1363L17.1366 16.5621L19.2323 14.139C19.399 13.9515 19.6837 13.9445 19.8712 14.1112C20.0518 14.2779 20.0657 14.5626 19.899 14.7501L17.4977 17.5134C17.3033 17.7287 16.97 17.7287 16.7755 17.5134L14.2851 14.7474C14.2017 14.6571 14.167 14.5529 14.167 14.4418Z"
          fill="#747782"
        />
        <Rect
          x="0.833008"
          y="15"
          width="11.6667"
          height="1.25"
          rx="0.625"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.07607 1.66688C6.85045 1.66207 6.63285 1.78924 6.53301 2.0075L1.719 12.5324C1.58503 12.8253 1.71387 13.1713 2.00677 13.3053C2.29967 13.4393 2.64572 13.3105 2.77969 13.0175L4.41892 9.4337H9.71576L11.355 13.0177C11.489 13.3106 11.8351 13.4394 12.128 13.3054C12.4209 13.1715 12.5497 12.8254 12.4157 12.5325L7.60172 2.00761C7.50446 1.79496 7.29541 1.66879 7.07607 1.66688ZM7.06734 3.64345L4.95242 8.26732H9.18227L7.06734 3.64345Z"
          fill="#747782"
        />
      </g>
      <defs>
        <clipPath id="clip0_21338_69235">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );

export {ColorIcon}
