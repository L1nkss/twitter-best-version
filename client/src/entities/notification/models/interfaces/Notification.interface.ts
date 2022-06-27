import { NotificationWithId } from '@features/notifications/models/interfaces/Notifications.interface';

export interface NotificationProps {
  autoDeleteTime?: number;
  notification: NotificationWithId
}