import { FC} from 'react';

import { BaseTweetInfo } from '@entities/tweet/models/interfaces/TweetInfo.interface';
import { Icon } from '@shared/ui/icon/icon';

const Retweets: FC<BaseTweetInfo> = ({counter, onClick}) => {
    const clickHandler = () => {
        if (onClick) onClick();
    }
    
    return (
        <div className="flex items-center tweet__action-item tweet__action-item--retweet" onClick={ clickHandler }>
            <div className="inline-flex relative mr-2.5">
                <div className="tweet__circle"/>
                <Icon name="retweet-svg" classNames="tweet__svg"/>
            </div>
            {counter !== 0 && <span className="text-xs">{counter}</span>}
        </div>
    )
}

export {Retweets}