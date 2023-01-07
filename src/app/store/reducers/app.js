import { APP } from '../actions/app';

const initialState = {
  language: 'en',
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case APP.SET_APP_LANGUAGE:
      return {
        ...state,
        language: payload.payload,
      };
    default:
      return state;
  }
};
