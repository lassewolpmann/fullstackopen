import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import './index.css'
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
    window.Promise = PromisePolyfill
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)