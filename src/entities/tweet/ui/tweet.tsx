import {FC} from "react";
import {ITweet} from "../types/Tweet.interface";
import UserAvatar from "../../../shared/ui/user-avatar/user-avatar";
import {getTimeSince} from "../../../shared/utils/date-activity";

const Tweet: FC<ITweet> = (props) => {
    return (
        <div className="flex tweet p-4">
            <UserAvatar avatarUrl={props.userInfo.avatarUrl} classes="mr-3"  />
            <div className="w-full">
                <div className="flex items-end mb-2">
                    <h2 className="font-bold mr-1">{props.userInfo.name}</h2>
                    {/* Иконка если Verify*/}
                    <p className="tweet__header-data mr-1">@{props.userInfo.userName}</p>
                    {/* Время создания */}
                    <p className="tweet__header-data">
                        <time>{getTimeSince(props.createdAt)}</time>
                    </p>
                </div>
                <div className="mb-2">
                    <p>{props.content}</p>
                </div>

                <div className="flex justify-between tweet__action">
                    <p>{props.tweetInfo.comments}</p>
                    <p>{props.tweetInfo.likes}</p>
                    <p>{props.tweetInfo.retweets}</p>
                    {/*  Shared  */}
                </div>
            </div>
        </div>
    )
}

export {Tweet}