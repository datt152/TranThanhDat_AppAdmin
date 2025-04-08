import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardContent from './components/DashboardContent.jsx'
import ProjectContent from './components/ProjectContent.jsx'
import TeamsContent from './components/TeamsContent.jsx'
import AnalysticsContent from './components/AnalyticsContent.jsx'
import MessageContent from './components/MessageContent.jsx'
import IntegrationsContent from './components/IntegrationsContent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DashboardContent />} />
          <Route path="/projects" element={<ProjectContent/>} />
          <Route path="/teams" element={<TeamsContent />} />
          <Route path="/analytics" element={<AnalysticsContent/>} />
          <Route path="messages" element={<MessageContent/>}/>
          <Route path="integrations" element={<IntegrationsContent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
