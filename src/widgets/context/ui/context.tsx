import React from "react";

interface IContext {
    likeTweet: (id: string, isLiked: boolean) => void
}

export const Context = React.createContext<IContext>({likeTweet: () => {}});