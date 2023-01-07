import { takeEvery, all, put } from 'redux-saga/effects';
import { APP } from '../actions/app';

function* test(payload) {
  console.log(payload)
}

export default function* actionsSaga() {
  yield all([
    takeEvery(APP.SET_APP_LANGUAGE, test),
  ]);
}
