export const WEEK_START_DAY = {
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
  };
  
  export const SCHEDULAR_VIEWS = {
    DAY: 0,
    WEEK: 1,
  };

  export const LANGUAGES = {
    EN: 'en',
    AR: 'ar',
  };

  const rtl = ['ar'];
  export const isRTLLanguage = language => {
    return rtl.includes(language) 
  };
  
  