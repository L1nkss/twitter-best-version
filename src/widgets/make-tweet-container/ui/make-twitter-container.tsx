import MakeTweet from "../../../entities/make-tweet/ui/make-tweet";
import UserAvatar from "../../../shared/ui/user-avatar/user-avatar";
import cn from "classnames";
import { FC } from "react";

interface MakeTwitterContainerProps {
  classes?: string;
}

const MakeTwitterContainer: FC<MakeTwitterContainerProps> = ({
  classes = "",
}: MakeTwitterContainerProps) => {
  return (
    <div className={cn("flex p-4", classes)}>
      <UserAvatar classes={"mr-3"} />
      <MakeTweet />
    </div>
  );
};

export default MakeTwitterContainer;
