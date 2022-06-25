import { ChangesEnum } from '@features/tweets/models/enums/ChangesEnums.enum';
import { Tweet } from '@features/tweets/models/interfaces/Tweets.interface';

export interface LikeStatusResponse {
    tweet: Tweet;
    status: ChangesEnum;
}

export interface LikeStatusResponseWithId extends LikeStatusResponse{
    currentUserId: string
}