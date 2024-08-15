'use client'

import dynamic from 'next/dynamic'
import { StockSkeleton } from './stock-skeleton'
import { StocksSkeleton } from './stocks-skeleton'
import { EventsSkeleton } from './events-skeleton'

export { spinner } from './spinner'
export { BotCard, BotMessage, SystemMessage } from './message'

const Recipe = dynamic(() => import('./recipe').then(mod => mod.Recipe), {
  ssr: false,
  loading: () => <StockSkeleton />
})

const RecipeSuggestion = dynamic(
  () => import('./recipe-suggestion').then(mod => mod.RecipeSuggestion),
  {
    ssr: false,
    loading: () => (
      <div className="h-[375px] rounded-xl border bg-zinc-950 p-4 text-green-400 sm:h-[314px]" />
    )
  }
)

const Recipes = dynamic(() => import('./recipes').then(mod => mod.Recipe), {
  ssr: false,
  loading: () => <StocksSkeleton />
})

const Events = dynamic(() => import('./events').then(mod => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />
})

export { Recipe as Stock, RecipeSuggestion as Purchase, Recipes as Stocks, Events }
