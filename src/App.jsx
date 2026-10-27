import { useState } from 'react'
import appStore from './utils/appstore'
import Body from './components/Body'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}
export default App
