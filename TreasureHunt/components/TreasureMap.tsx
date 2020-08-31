import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { IState, IAction, ILocation } from '../typescript/interfaces'
import MapView, { MapEvent } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { clickLocation, loadLocations } from '../actions/locations'
import { initialRegionFromLocations } from '../utilities/utilityFuncs'


type ITreasureMapProps = ITreasureMapFunctions & ITreasureMapState

type IMapEvent = MapEvent & { nativeEvent: { id: string }};

// I typically use functional components, but for complex components like this I sometimes still use classes.
// I will look into making this functional/perhaps modularizing the markers shortly.
export class TreasureMap extends Component<ITreasureMapProps> {
    state: ITreasureMapProps;

    constructor(props: ITreasureMapProps) {
        super(props);
        this.state = {
            locations: props.locations,
            locationsLoading: props.locationsLoading,
            loadLocations: props.loadLocations,
            clickLocation: props.clickLocation
        }
    }

    componentDidMount() {
        this.props.loadLocations();
    }
    
    componentDidUpdate(previousProps: ITreasureMapProps, previousState: ITreasureMapProps) {
        if (this.props.locations !== previousProps.locations) {
            this.setState({
                ...previousState,
                locations: this.props.locations
            })   
        }
    }

    onSelect(event: IMapEvent) {
        event.preventDefault();
        this.props.clickLocation(Number.parseInt(event.nativeEvent.id));
    }

    render() {
        const initialRegion = initialRegionFromLocations(this.state.locations);
        return (
            <>
            {
                initialRegion &&
                <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={initialRegion}
                >
                {
                    this.state.locations && this.state.locations.map(location => {
                        return <Marker 
                        key={location.id}
                        identifier={location.id.toString()}
                        title={`Marker ${location.id.toString()}`}
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        onPress={this.onSelect.bind(this)}
                        />
                    })
                }
                </MapView>
            }
            </>
        )
    }
}

// -------------- StateToProps -------------- //
interface ITreasureMapState {
    locations: ILocation[];
    locationsLoading: boolean;
}

const mapStateToProps = (state: IState): ITreasureMapState => {
    return {
        locations: state.locations.locations,
        locationsLoading: state.locations.loading
    }
};

// -------------- DispatchToProps -------------- //
interface ITreasureMapFunctions {
    loadLocations: () => void;
    clickLocation: (id: number) => void;
}

const mapDispatchToProps = (dispatch: any): ITreasureMapFunctions => ({
    loadLocations(){
        dispatch(loadLocations()) as Dispatch<IAction>
    },
    clickLocation(id: number){
        dispatch(clickLocation(id)) as Dispatch<IAction>
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(TreasureMap)
