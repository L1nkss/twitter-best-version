import React, { FC } from 'react'

import { useSelector } from 'react-redux';

import { likedTweetsSelector } from '@features/tweets/tweetsSelectors';
import { PageHeader } from '@shared/ui/page-header/page-header'
import { TweetList } from '@widgets/tweet-list/ui/tweet-list'

const Bookmarks: FC = () => {
    const list = useSelector(likedTweetsSelector)

    return (
        <div>
            <PageHeader pageName={ 'Bookmarks Page' }/>
            <TweetList tweets={ list } />
        </div>
    )
}

export { Bookmarks }
