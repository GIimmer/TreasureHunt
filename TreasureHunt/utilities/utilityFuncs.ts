import { ILocation } from "../typescript";
import { Region } from "react-native-maps";

export function getMinMax<T>(list: T[], comparatorFunc: (a: any, b: any) => number): T[] {
    const sorted = list.sort(comparatorFunc);
    return [sorted[0], sorted[sorted.length - 1]];
}

export function initialRegionFromLocations(locations: ILocation[]): Region | null {
        if (!locations || !locations.length) return null;

        const latBuffer = .01;
        const longBuffer = .01;

        function getCenterAndDelta(min: number, max: number, buffer: number): number[] {
            const midpointDiff = (max - min)/2;
            return [min + midpointDiff, midpointDiff + buffer]
        }

        const [latMin, latMax] = getMinMax<ILocation>(locations, (a, b) => a.latitude - b.latitude);
        const [latCenter, latDelta] = getCenterAndDelta(latMin.latitude, latMax.latitude, latBuffer);

        const [longMin, longMax] = getMinMax<ILocation>(locations, (a, b) => a.longitude - b.longitude);
        const [longCenter, longDelta] = getCenterAndDelta(longMin.longitude, longMax.longitude, longBuffer);


        return {
            latitude: latCenter,
            longitude: longCenter,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
        }
    }