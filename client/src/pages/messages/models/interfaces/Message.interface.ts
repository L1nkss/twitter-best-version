export interface MessageProps {
    message: string,
    name: string,
    avatarUrl: string,
    isOnline: boolean,
    onClick: () => void
}