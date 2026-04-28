import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './shared/Layout/Layout'
import { HomePage } from './pages/Home/HomePage'
import { PortfolioPage } from './pages/Portfolio/PortfolioPage'
import { CmsDemoPage } from './pages/CmsDemo/CmsDemoPage'
import { PricingPage } from './pages/Pricing/PricingPage'
import { ContactPage } from './pages/Contact/ContactPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/cms-demo" element={<CmsDemoPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

