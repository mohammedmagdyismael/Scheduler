import { fork } from 'redux-saga/effects';
import appSaga from './app';

const sagas = [
  appSaga,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
