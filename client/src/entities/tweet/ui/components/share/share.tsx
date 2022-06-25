import {FC} from 'react';

import { ShareTweetInfo } from '@entities/tweet/models/interfaces/TweetInfo.interface';
import { Icon } from '@shared/ui/icon/icon';

const Share: FC<ShareTweetInfo> = ({onClick}) => {
    const clickHandler = () => {
        if (onClick) onClick();
    }
    
    return (
        <div className="flex items-center tweet__action-item  tweet__action-item--share">
            <div className="inline-flex relative mr-2.5">
                <div className="tweet__circle"/>
                <Icon name="share-svg" classNames="tweet__svg"/>
            </div>
        </div>
    )
}

export {Share}