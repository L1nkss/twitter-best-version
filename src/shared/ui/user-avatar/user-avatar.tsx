import avatar from "./mock-avatar/avatar.jpg";
import { FC } from "react";
import cn from "classnames";

interface UserAvatarProps {
  classes?: string;
  avatarUrl?: string;
}

// todo временный компонент -> переделать
const UserAvatar: FC<UserAvatarProps> = ({
  classes = "",
  avatarUrl,
}: UserAvatarProps) => {
  return (
    <div className={cn("user-avatar", classes)}>
      <img src={avatarUrl} alt="" />
    </div>
  );
};

export { UserAvatar };
