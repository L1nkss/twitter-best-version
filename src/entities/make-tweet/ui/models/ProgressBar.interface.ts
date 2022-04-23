import {TweetLengthColors} from "./TweetLength.enum";
import {TweetLengthTypes} from "./TweetLength.interface";

export interface ProgressBarState {
    hideCircles: boolean,
    lengthStatus: TweetLengthTypes
}