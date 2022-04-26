import PageHeader from "../../../shared/ui/page-header/page-header";
import {TweetList} from "../../../widgets/tweet-list/ui/tweet-list";
import React from "react";

const Bookmarks = () => {
    const userData = JSON.parse(localStorage.getItem('userTwitterData') || '');
    return (
        <div>
            <PageHeader pageName={'Bookmarks Page'} />
            <TweetList tweets={userData.likedTweets} />
        </div>
    )
}

export default Bookmarks;