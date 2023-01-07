export const APP = {
  SET_APP_LANGUAGE: 'SET_APP_LANGUAGE',
};

export const setLanguage = payload => ({
  type: APP.SET_APP_LANGUAGE,
  payload,
});
