import {FC} from "react";
import {ITweet} from "../types/Tweet.interface";
import UserAvatar from "../../../shared/ui/user-avatar/user-avatar";

const Tweet: FC<ITweet> = (props) => {
    return (
        <div>
            <UserAvatar avatarUrl={props.userInfo.avatarUrl}  />
            <div>
                <div>
                    <p>{props.userInfo.name}</p>
                    {/* Иконка если Verify*/}
                    <p>{props.userInfo.userName}</p>
                    {/* Время создания */}
                    {/*<p>{props.createdAt}</p> */}
                </div>
                <div>
                    <p>{props.content}</p>
                </div>

                <div>
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