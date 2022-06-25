export interface BaseTweetInfo {
    counter: number;
    onClick: () => void
}

export interface LikesTweetInfo extends BaseTweetInfo {
    isLiked: boolean
}

export type ShareTweetInfo = Omit<BaseTweetInfo, 'counter'>;