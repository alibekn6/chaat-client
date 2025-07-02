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
      {/* Mobile Layout - ChatMockup first, then Hero */}
      <div className="block lg:hidden">
        <div className="pt-8 space-y-8">
          <ChatMockup />
          <Hero />
        </div>
      </div>

      {/* Desktop/Laptop Layout - Keep original design */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-between lg:items-start lg:pt-8">
        <div className="flex-1 pr-8">
          <Hero />
        </div>
        <div className="flex-shrink-0">
          <ChatMockup />
        </div>
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