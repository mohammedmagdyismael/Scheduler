import Color from 'color';
import ColorString from 'color-string';

const baseColors = {
  primaryBlue: '#0070cd',
  primaryRed: '#ef0f0f',
  blueShadeOne: '#3e8ddd',
  blueShadeTwo: '#005cb8',
  primaryGrey: '#58595b',
  greyShadeOne: '#808184',
  greyShadeTwo: '#e0e0e0',
  greyShadeThree: '#f5f5f5',
  primaryGreen: '#7cbb69',
  primaryYellow: '#ffd350',
  white: '#fff',
  transparent: 'transparent',
  facebook: '#4e7ebe',
  google: '#ea4335',
  qitaf: '#712C81',
};

const COLORS = {
  PRIMARY_BLUE: 'primaryBlue',
  PRIMARY_RED: 'primaryRed',
  DANGER: 'danger',
  PAGE_BACKGROUND: 'pageBackground',
  SUCCESS: 'success',
  WARNING: 'warning',
  LINK: 'link',
  DISABLED: 'disabled',
  TEXT: 'text',
  HELP_TEXT: 'helpText',
  BORDER: 'border',
  HEADER: 'header',
  WHITE: 'white',
  SEPARATOR: 'separator',
  SHIMMER_BACKGROUND: 'shimmerBackground',
  SHIMMER_EFFECT: 'shimmerEffect',
  TRANSPARENT: 'transparent',
  BUTTON_BORDER: 'buttonBorder',
  HOVER: 'hover',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  ILLUSTRATION_BACKGROUND: 'illustrationBackground',
  DISPLAY_NAME_BACKGROUND: 'displayNameBackground',
  QITAF: 'qitaf',
};

const COLORS_VALUES = {
  [COLORS.PRIMARY_BLUE]: baseColors.primaryBlue,
  [COLORS.PRIMARY_RED]: baseColors.primaryRed,
  [COLORS.DANGER]: baseColors.primaryRed,
  [COLORS.PAGE_BACKGROUND]: baseColors.greyShadeThree,
  [COLORS.SUCCESS]: baseColors.primaryGreen,
  [COLORS.WARNING]: baseColors.primaryYellow,
  [COLORS.LINK]: baseColors.primaryBlue,
  [COLORS.BUTTON_BORDER]: baseColors.greyShadeTwo,
  [COLORS.DISABLED]: baseColors.greyShadeTwo,
  [COLORS.TEXT]: baseColors.primaryGrey,
  [COLORS.HELP_TEXT]: baseColors.greyShadeOne,
  [COLORS.BORDER]: baseColors.greyShadeTwo,
  [COLORS.HEADER]: baseColors.primaryBlue,
  [COLORS.WHITE]: baseColors.white,
  [COLORS.SEPARATOR]: baseColors.greyShadeTwo,
  [COLORS.SHIMMER_BACKGROUND]: baseColors.greyShadeThree,
  [COLORS.SHIMMER_EFFECT]: baseColors.greyShadeTwo,
  [COLORS.HOVER]: baseColors.greyShadeThree,
  [COLORS.FACEBOOK]: baseColors.facebook,
  [COLORS.GOOGLE]: baseColors.google,
  [COLORS.ILLUSTRATION_BACKGROUND]: ColorString.to.rgb(
    Color(baseColors.blueShadeOne)
      .alpha(0.2)
      .rgb()
      .array(),
  ),
  [COLORS.DISPLAY_NAME_BACKGROUND]: ColorString.to.rgb(
    Color(baseColors.primaryBlue)
      .alpha(0.1)
      .rgb()
      .array(),
  ),
  [COLORS.QITAF]: baseColors.qitaf,
};

export { COLORS, COLORS_VALUES };
export default COLORS;
