import avatar from './mock-avatar/avatar.jpg';

// todo временный компонент -> переделать
const UserAvatar = () => {
    return (
        <div className="user-avatar">
            <img src={avatar} alt=""/>
        </div>
    )
}

export default UserAvatar;