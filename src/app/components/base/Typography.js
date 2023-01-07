export const FONT_TYPES = {
  MEGA_TITLE: 'megaTitle',
  SUPER_TITLE: 'superTitle',
  TITLE: 'title',
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  BODY: 'body',
  CAPTION: 'caption',
};

export const FONT_SIZES = {
  // Breakpoints: ['400px', '576px', '786px', '992px']
  [FONT_TYPES.MEGA_TITLE]: ['70px', '70px', '70px', '70px'],
  [FONT_TYPES.SUPER_TITLE]: ['30px', '30px', '30px', '30px'],
  [FONT_TYPES.TITLE]: ['18px', '20px', '21px', '21px'],
  [FONT_TYPES.HEADING]: ['19px', '19px', '18px', '18px'],
  [FONT_TYPES.SUBHEADING]: ['16px', '16px', '17px', '17px'],
  [FONT_TYPES.BODY]: ['15px', '15px', '14px', '13px'],
  [FONT_TYPES.CAPTION]: ['13px', '13px', '12px', '12px'],
};

export const FONT_WEIGHTS = {
  SEMI_BOLD: 600,
  NORMAL: 500,
  LIGHT: 400,
};

export const LINE_HEIGHTS = {
  [FONT_TYPES.MEGA_TITLE]: '74px',
  [FONT_TYPES.SUPER_TITLE]: '34px',
  [FONT_TYPES.TITLE]: '24px',
  [FONT_TYPES.HEADING]: '20px',
  [FONT_TYPES.SUBHEADING]: '18px',
  [FONT_TYPES.BODY]: '16px',
  [FONT_TYPES.CAPTION]: '14px',
};
