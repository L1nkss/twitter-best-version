import MakeTwitterContainer from "../../../widgets/make-tweet-container/ui/make-twitter-container";

const Home = () => {
    return (
        <div style={{height: '2000px'}} className="home-page">
            <header className="home-header p-4">
                <h2>Home</h2>
            </header>
            <MakeTwitterContainer classes={'home-page__twit-form'} />
        </div>
    )
}

export default Home;