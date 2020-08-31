import treasureApi from "../api";
import { put, retry } from "redux-saga/effects";
import { TREASURE, TREASURE_TEXT } from "../constants";
import { IAction } from "../typescript";
import { setError } from "../actions/errors";
import { Alert, Vibration } from "react-native";

export function* checkTreasure(siteId: number) {
    try {
        console.log('checkTreasure: ', siteId);
        const hasTreasure: boolean = yield retry(3, 250, treasureApi.siteHasTreasure, siteId);
        console.log('hasTreasure', hasTreasure);
        let treasureAction: IAction = { type: TREASURE.FOUND };
        if (hasTreasure) {
            Vibration.vibrate(400);
            Alert.alert(TREASURE_TEXT.found);
        } else {
            Alert.alert(TREASURE_TEXT.notFound);
            treasureAction.type = TREASURE.NOT_FOUND;
        }
        yield put(treasureAction);
    } catch (error) {
        console.log('in treasure error')
        yield put(setError(error, TREASURE.CHECK_FAILURE));
    }
}