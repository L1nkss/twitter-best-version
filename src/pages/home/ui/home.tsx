import MakeTwitterContainer from "../../../widgets/make-tweet-container/ui/make-twitter-container";
import PageHeader from "../../../shared/ui/page-header/page-header";
import {TweetList} from "../../../widgets/tweet-list/ui/tweet-list";

const Home = () => {
    return (
        <div className="home-page">
            <PageHeader pageName={'Home'} classNames={'home-page__header'} />
            <MakeTwitterContainer classes={'home-page__twit-form'} />
            <TweetList />
        </div>
    )
}

export default Home;