export interface IUser {
  createdAt: Date;
  id: string;
  likedTweets: Array<string>;
  name: string;
  userName: string;
}
