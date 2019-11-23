import "@babel/polyfill"
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import ExifIndex from './components/ExifIndex'

const store = configureStore()

render(
  <Provider store={store}>
    <div>
      <ExifIndex />
    </div>
  </Provider>,
  document.getElementById('root')
)

