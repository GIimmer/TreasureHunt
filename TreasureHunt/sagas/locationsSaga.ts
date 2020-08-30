import { take, call, put, takeEvery } from 'redux-saga/effects'
import { LOCATIONS } from '../constants'
import treasureApi from '../api'
import { locationsLoaded } from '../actions/locations';
import { setError } from '../actions/errors';


export function* loadLocations() {
    try {
        const locations = yield call(treasureApi.getTreasureSites);
        console.log('locations: ', locations);
        yield put(locationsLoaded(locations));
    } catch (error) {
        yield put(setError(error, LOCATIONS.LOAD_FAIL));       
    }
}

export default function* locationsSaga() {
    yield takeEvery(LOCATIONS.LOAD, loadLocations);
}