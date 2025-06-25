import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { store } from '../Componenets/Redux/Store.js'
// import { Provider} from 'react-redux'
import {ProvideMain} from '../Componenets/Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
      <ProvideMain>
        <App />
      </ProvideMain>
    {/* </Provider> */}
  </StrictMode>,
)

