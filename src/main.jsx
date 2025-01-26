import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

let display = true

if(screen.width < 640) {
  display = true
} else {
  display = false
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App/>
      {
        display?
        <Toaster
        position='top-right'/>
        :
        <Toaster
        position='top-center'
        />
      }
    </Provider>
  </StrictMode>
)
