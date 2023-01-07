export const languages = [
  {
    name: 'English',
    key: 'en',
  },
  {
    name: 'عربي',
    key: 'ar',
  },
  {
    name: 'Española',
    key: 'es',
  },
];

const rtl = ['ar'];

export const isRTLLanguage = language => {
    return rtl.includes(language) 
  };