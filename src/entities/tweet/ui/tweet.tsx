import {FC} from "react";
import {ITweet} from "../types/Tweet.interface";
import UserAvatar from "../../../shared/ui/user-avatar/user-avatar";
import {getTimeSince} from "../../../shared/utils/date-activity";
import axios from "axios";

// Выглядит херово
const Tweet: FC<ITweet & {deleteTweet?: (id: string) => void}> = (props) => {
    const hasAccessToDelete = (): boolean => {
        return props.userInfo.userName === 'L1nksss';
    }

    // todo Переделать на Popup с удалением и передачей туда id
    const deleteTweet = async (id: string): Promise<any> => {
        try {
            const response = await axios.delete<ITweet>(`https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet/${id}`, {withCredentials: false})

            if (response.status === 200) {
                props.deleteTweet && props.deleteTweet(id);
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    return (
        <div className="flex tweet p-4">
            <UserAvatar avatarUrl={props.userInfo.avatarUrl} classes="mr-3"/>
            <div className="w-full">
                <div className="flex items-end mb-2">
                    <h2 className="font-bold mr-1">{props.userInfo.name}</h2>
                    {/* Иконка если Verify*/}
                    <p className="tweet__header-data mr-1">@{props.userInfo.userName}</p>
                    <p className="tweet__header-data">
                        <time>{getTimeSince(props.createdAt)}</time>
                    </p>
                    {hasAccessToDelete() && <div className="ml-auto tweet__button">
                        <button onClick={() => deleteTweet(props.id)}>Удалить</button>
                    </div>}
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