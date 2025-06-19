import './App.css'
import { Hero } from './pages/landing/hero'
import { ChatMockup } from './pages/landing/chatmock'
import { Header } from './pages/landing/header'
import { PlatformOverview }  from './pages/landing/PlatformOverview'
import { FeatureShowcase1 }  from './pages/landing/featureshowcase1'
import { FeatureShowcase2 }  from './pages/landing/featureshowcase2'
import { AIAgents }          from './pages/landing/aiagents'
import { SocialProof }       from './pages/landing/socialproof'
import { FinalCTA }          from './pages/landing/finalcta'
import { Footer }            from './pages/landing/footer'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 justify-between items-center pt-16">
        <Hero />
        <ChatMockup />
      </main>
      <PlatformOverview />
      <FeatureShowcase1 />
      <FeatureShowcase2 />
      <AIAgents />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  )
}

export default App
