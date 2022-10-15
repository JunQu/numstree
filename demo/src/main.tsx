import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

const rootNode = document.getElementById('root')!
const rootElement = createRoot(rootNode)

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
