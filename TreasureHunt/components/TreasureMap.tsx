import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { IState, IAction, ILocation } from '../typescript/interfaces'
import MapView, { Region, MarkerProps } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { clickLocation, loadLocations } from '../actions/locations'
import { getMinMax } from '../utilities/utilityFuncs'


type ITreasureMapProps = IState & {
    [key: string]: Function
}

export class TreasureMap extends Component<ITreasureMapProps> {
    locations: ILocation[];    

    constructor(props: ITreasureMapProps) {
        super(props);
        this.locations = props.locations.locations;
    }

    onSelect(marker: MarkerProps) {
        this.props.clickLocation(Number.parseInt(marker.identifier as string))
    }

    computeInitialRegion(locations: ILocation[]): Region {
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


    render() {
        const initialRegion = this.computeInitialRegion(this.locations);
        return (
            <MapView
                initialRegion={initialRegion}
            >
                {
                    this.locations && this.locations.length && this.locations.map(location => {
                        return <Marker 
                        title={location.id.toString()}
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        onSelect={}
                        >

                        </Marker>
                    })
                }

                
            </MapView>
        )
    }
}

const mapStateToProps = (state: IState): IState => ({
    ...state
});

const mapDispatchToProps = (dispatch: any) => ({
    loadLocations(){
        dispatch(loadLocations()) as Dispatch<IAction>
    },
    clickLocation(id: number){
        dispatch(clickLocation(id)) as Dispatch<IAction>
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TreasureMap)
