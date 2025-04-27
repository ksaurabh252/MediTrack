import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AIInteractionPopup from './popup/popup.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AIInteractionPopup>
    <App />
    </AIInteractionPopup>
  </React.StrictMode>,
)
