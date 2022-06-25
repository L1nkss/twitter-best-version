import React from 'react'

interface IContext {
  likeTweet: (id: string, isLiked: boolean) => void
}

export const Context: React.Context<IContext> = React.createContext<IContext>({
  likeTweet: () => {},
})
