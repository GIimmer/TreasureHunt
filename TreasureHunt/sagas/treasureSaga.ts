import treasureApi from "../api";
import { takeLatest, put, retry } from "redux-saga/effects";
import { TREASURE } from "../constants";
import { IAction } from "../typescript";

function* checkTreasure(siteId: number) {
    try {
        const hasTreasure: boolean = yield retry(3, 250, treasureApi.siteHasTreasure, siteId);
        const treasureAction: IAction = { type: hasTreasure ? TREASURE.FOUND : TREASURE.NOT_FOUND };
        yield put(treasureAction);
    } catch (error) {
        yield put({ type: TREASURE.CHECK_FAILURE });
    }
}

export function* watchCheckTreasure(id: number) {
    yield takeLatest(TREASURE.CHECK, checkTreasure, id);
}