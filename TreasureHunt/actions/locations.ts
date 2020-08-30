import { IAction, ILocation } from "../typescript";
import { LOCATIONS } from "../constants";


const loadLocations = (): IAction => ({
    type: LOCATIONS.LOAD
});

const locationsLoaded = (locations: ILocation[]): IAction => ({
    type: LOCATIONS.LOAD_SUCCESS,
    payload: locations
})

const clickLocation = (id: number): IAction => ({
    type: LOCATIONS.CLICK,
    payload: id
});

export {
    loadLocations,
    locationsLoaded,
    clickLocation
}