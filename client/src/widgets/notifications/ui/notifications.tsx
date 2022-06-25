import { FC } from 'react';

import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { Notification } from '@entities/notification/ui/notification';
import { notificationsSelector } from '@features/notifications/notificationsSelector';

const NotificationContainer: FC = () => {
    const notifications = useSelector(notificationsSelector);
    return createPortal(
        <div className="notification-container">
            {notifications.map((notification, index) => {
                return <Notification key={ index } notification={ notification } />
            })}
        </div>,
        document.body
    )
}

export {NotificationContainer}