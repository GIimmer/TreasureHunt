import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';

import configureStore from './store'
import TreasureMap from './components/TreasureMap';

const store = configureStore();

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
   <Provider store={store}>
     <TreasureMap></TreasureMap>
   </Provider> 
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  }
});

export default App;
