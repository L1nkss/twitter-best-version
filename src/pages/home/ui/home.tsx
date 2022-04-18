import MakeTwitterContainer from "../../../widgets/make-tweet-container/ui/make-twitter-container";

const Home = () => {
    return (
        <div style={{height: '1000px'}}>
            <header className="home-header">
                <h2>Home</h2>
            </header>
            <MakeTwitterContainer />
        </div>
    )
}

export default Home;