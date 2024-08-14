`use client`

import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ChatPanel } from './chat-panel'
import { ChatList } from './chat-list'
import { EmptyScreen } from './empty-screen'
import { cn } from '@/lib/utils'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ className, missingKeys }: ChatProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useUIState()

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const clearChat = () => {
    setMessages([]) // Clear the chat messages
  }

  return (
    <div className="group w-full overflow-auto pl-0" ref={scrollRef}>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)} ref={messagesRef}>
        {messages.length ? (
          <ChatList messages={messages} />
        ) : (
          <EmptyScreen />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <Button onClick={clearChat}>Clear Chat</Button>
    </div>
  )
}
