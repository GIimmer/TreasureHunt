import { call, put, takeEvery } from 'redux-saga/effects'
import { LOCATIONS } from '../constants'
import treasureApi from '../api'
import { locationsLoaded } from '../actions/locations'
import { checkTreasure } from './treasureSaga'
import { setError } from '../actions/errors'
import { IAction } from '../typescript'


export function* loadLocations() {
    try {
        const locations = yield call(treasureApi.getTreasureSites);
        yield put(locationsLoaded(locations));
    } catch (error) {
        yield put(setError(error, LOCATIONS.LOAD_FAIL));
    }
}

function* clickLocation({ payload }: IAction) {
    yield* checkTreasure(payload);
}

export default function* locationsSaga() {
    yield takeEvery(LOCATIONS.LOAD, loadLocations);
    yield takeEvery(LOCATIONS.CLICK, clickLocation);
}