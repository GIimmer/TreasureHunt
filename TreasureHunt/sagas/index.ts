import { all } from 'redux-saga/effects';

import locationsSaga from './locationsSaga';

export default function* rootSaga() {
    yield all([locationsSaga()]);
}