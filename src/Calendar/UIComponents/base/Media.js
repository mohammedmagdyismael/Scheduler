import { css } from 'styled-components';

const sizes = {
  maxTablet: 1023,
  maxPhone: 767,
};

// create a media template
const media = {};
media.phone = (...args) => css`
  @media only screen and (max-width: ${sizes.maxPhone}px) {
    ${css(...args)};
  }
`;
media.tablet = (...args) => css`
  @media only screen and (min-width: ${sizes.maxPhone +
      1}px) and (max-width: ${sizes.maxTablet}px) {
    ${css(...args)};
  }
`;
media.desktop = (...args) => css`
  @media only screen and (min-width: ${sizes.maxTablet + 1}px) {
    ${css(...args)};
  }
`;

export default media;
