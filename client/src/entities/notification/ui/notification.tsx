import { FC, useEffect } from 'react';

import cn from 'classnames';

import { useAppDispatch } from '@app/store';
import { NotificationProps } from '@entities/notification/models/interfaces/Notification.interface';
import { deleteNotification } from '@features/notifications/notificationsSlice';
import { Icon } from '@shared/ui/icon/icon';

const Notification: FC<NotificationProps> = ({autoDeleteTime = 4000, notification}) => {
  const dispatch = useAppDispatch();
  let timerID: ReturnType<typeof setTimeout>;

  useEffect(() => {
    timerID = setTimeout(() => {
      dispatch(deleteNotification(notification.id))
    }, autoDeleteTime)

    return () => {
      clearTimeout(timerID);
    }
  }, [])

  const NotificationIcon = () => {
    if (notification.type === 'error') return <Icon name="info-circle-svg" classNames="mr-3"/>

    return null;
  }
  return (
    <div className={ cn('notification', {'notification--error': notification.type === 'error'}) }>
      <NotificationIcon/>
      <div>
        <h2>{notification.title}</h2>
        <p>{notification.description}</p>
      </div>
    </div>
  )
}

export { Notification }