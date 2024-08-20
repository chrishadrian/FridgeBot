'use server'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { SpinnerMessage, UserMessage, BotMessage, SystemMessage } from '@/components/recipes/message'
import { getSession } from '@auth0/nextjs-auth0'
import { nanoid, runAsyncFnWithoutBlocking, sleep } from '@/lib/utils'
import { Chat, Message } from '@/lib/types'
import { saveChat } from '@/app/actions'

// Example function that could be used in FridgeBot
async function suggestRecipeBasedOnIngredients(ingredients: string[]) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const processingUI = createStreamableUI(
    <div className="inline-flex items-start gap-1">
      <p className="mb-2">
        Looking for recipes with {ingredients.join(', ')}...
      </p>
    </div>
  )

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000) // Simulating processing time

    processingUI.update(
      <div className="inline-flex items-start gap-1">
        <p className="mb-2">
          Found a great recipe using {ingredients.join(', ')}...
        </p>
      </div>
    )

    processingUI.done(
      <div>
        <p className="mb-2">
          How about trying this recipe? [Link to Recipe]
        </p>
      </div>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'system',
          content: `[Suggested recipe using ${ingredients.join(', ')}]`
        }
      ]
    })
  })

  return {
    processingUI: processingUI.value,
    newMessage: {
      id: nanoid(),
      display: processingUI.value
    }
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-4o-mini'),
    initial: <SpinnerMessage />,
    system: `\
    You are a helpful kitchen assistant bot, assisting users with ingredient tracking, recipe suggestions, and kitchen management. Respond to user queries based on the ingredients they have or other kitchen-related inquiries.

    Messages inside [] indicate UI elements or user events. For example:
    - "[Suggested recipe]" indicates that a recipe suggestion UI is shown to the user.
    - "[User added ingredients]" indicates that the user has added ingredients to their list.

		If the user requests any recipe suggestion, call \`suggest_recipe\` to show the recipe suggestion UI.
    
    Besides that, you can also chat with users and provide useful kitchen tips or respond to specific ingredient-related queries.`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      suggestRecipe: {
        description: 'Suggest a recipe based on the available ingredients.',
        parameters: z.object({
          ingredients: z.array(z.string().describe('The list of ingredients available.'))
        }),
        generate: async function* ({ ingredients }) {
          yield <BotMessage content="Searching for a recipe..." />

          await sleep(1000)

          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'suggestRecipe',
                    toolCallId,
                    args: { ingredients }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'suggestRecipe',
                    toolCallId,
                    result: { ingredients }
                  }
                ]
              }
            ]
          })

          return (
            <BotMessage content={`How about this recipe with ${ingredients.join(', ')}?`} />
          )
        }
      },
      // Add more tools as needed for other FridgeBot functionalities
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    suggestRecipeBasedOnIngredients
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await getSession()

    if (session && session.user) {
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await getSession()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.sid as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            // Here, you can add cases for specific tools you create for FridgeBot
            return tool.toolName === 'suggestRecipe' ? (
              <BotMessage content={`Recipe suggestion: ${tool.result}`} />
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
