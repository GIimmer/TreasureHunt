import treasureApi from "../api";
import { put, retry } from "redux-saga/effects";
import { TREASURE, TREASURE_TEXT, ERROR_TEXT } from "../constants";
import { IAction } from "../typescript";
import { setError } from "../actions/errors";
import { Alert, Vibration } from "react-native";

export function* checkTreasure(siteId: number) {
    try {
        const hasTreasure: boolean = yield retry(3, 250, treasureApi.siteHasTreasure, siteId);

        const treasureAction: IAction = { type: TREASURE.FOUND };

        // I decided to put the native functionality in the saga because..
        //  - Reducers are supposed to purely map actions to state
        //  - Components should ideally just map state to the UI
        // ..therefore perhaps Saga seems like the place to put messy stuff like this
        if (hasTreasure) {
            Vibration.vibrate(400);
            Alert.alert(TREASURE_TEXT.found);

        } else {
            Alert.alert(TREASURE_TEXT.notFound);
            treasureAction.type = TREASURE.NOT_FOUND;
        }

        yield put(treasureAction);

    } catch (error) {
        Alert.alert(ERROR_TEXT.genericAlert);
        yield put(setError(error, TREASURE.CHECK_FAILURE));
    }
}