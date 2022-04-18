import MakeTweet from "../../../entities/make-tweet/ui/make-tweet";
import UserAvatar from "../../../shared/ui/user-avatar/user-avatar";

const MakeTwitterContainer = () => {
    return (
        <div className="flex">
            <UserAvatar />
            <MakeTweet />
        </div>
    )
}

export default MakeTwitterContainer