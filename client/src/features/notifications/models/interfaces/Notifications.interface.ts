export type NotificationTypes = 'success' | 'error' | 'warning';

export interface Notification {
    type: NotificationTypes;
    title: string;
    description: string;
}

export interface NotificationWithId extends Notification {
    id: string;
}

export interface Notifications {
    list: NotificationWithId[]
}