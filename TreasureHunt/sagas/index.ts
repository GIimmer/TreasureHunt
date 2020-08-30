import { all } from 'redux-saga/effects';

import locationsSaga from './locationsSaga';
import treasureSaga from './treasureSaga';
import errorSaga from './errorSaga'

export default function* rootSaga() {
    yield all([locationsSaga(), treasureSaga(), errorSaga()]);
}