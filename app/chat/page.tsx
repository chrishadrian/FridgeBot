`use client`

import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { getMissingKeys } from '@/app/actions'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: 'single-chat', messages: [] }}>
      <Chat missingKeys={missingKeys} />
    </AI>
  )
}
