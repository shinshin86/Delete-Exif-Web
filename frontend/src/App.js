import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import ExifIndex from './components/ExifIndex';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <ExifIndex />
  </Provider>
);
