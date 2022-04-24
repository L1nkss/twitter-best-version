import avatar from './mock-avatar/avatar.jpg';
import {FC} from "react";
import cn from "classnames"

interface UserAvatarProps {
    classes?: string;
    avatarUrl?: string;
}

// todo временный компонент -> переделать
const UserAvatar: FC<UserAvatarProps> = ({classes = ''}: UserAvatarProps) => {
    return (
        <div className={cn('user-avatar', classes)}>
            <img src={avatar} alt=""/>
        </div>
    )
}

export default UserAvatar;