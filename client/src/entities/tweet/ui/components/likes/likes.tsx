import { FC } from 'react';

import { LikesTweetInfo } from '@entities/tweet/models/interfaces/TweetInfo.interface';
import { Icon } from '@shared/ui/icon/icon';

const Likes: FC<LikesTweetInfo> = ({counter, onClick, isLiked}) => {
  const clickHandler = () => {
    if (onClick) onClick();
  }

  return (
    <div
      className="flex items-center tweet__action-item tweet__action-item--likes"
      onClick={ clickHandler }
    >
      <div className="inline-flex relative mr-2.5">
        <div className="tweet__circle"/>
        {isLiked ? <Icon name="liked-svg"/> : <Icon name="like-svg" classNames="tweet__svg"/>}
      </div>
      {counter !== 0 && <span className="text-xs">{counter}</span>}
    </div>
  )
}

export { Likes }