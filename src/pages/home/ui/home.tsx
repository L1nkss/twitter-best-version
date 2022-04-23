import MakeTwitterContainer from "../../../widgets/make-tweet-container/ui/make-twitter-container";
import PageHeader from "../../../shared/ui/page-header/page-header";

const Home = () => {
    return (
        // временный стиль для прокрутки
        <div style={{height: '2000px'}} className="home-page">
            <PageHeader pageName={'Home'} classNames={'home-page__header'} />
            <MakeTwitterContainer classes={'home-page__twit-form'} />
        </div>
    )
}

export default Home;