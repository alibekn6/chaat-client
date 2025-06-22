import { Hero } from './hero'
import { ChatMockup } from './chatmock'
import { PlatformOverview } from './PlatformOverview'
import { FeatureShowcase1 } from './featureshowcase1'
import { FeatureShowcase2 } from './featureshowcase2'
import { AIAgents } from './aiagents'
import { SocialProof } from './socialproof'
import { FinalCTA } from './finalcta'

export function LandingPage() {
  return (
    <>
      <div className="flex flex-1 justify-between items-start pt-8">
        <Hero />
        <ChatMockup />
      </div>
      <PlatformOverview />
      <FeatureShowcase1 />
      <FeatureShowcase2 />
      <AIAgents />
      <SocialProof />
      <FinalCTA />
    </>
  )
} 