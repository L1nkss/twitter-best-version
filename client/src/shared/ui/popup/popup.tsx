import React, { FC, useEffect, useState } from 'react'

import cn from 'classnames'

import { createPortal } from 'react-dom';

import { Icon } from '@shared/ui/icon/icon'
import { PopupProps } from '@shared/ui/popup/models/interfaces/popup.interface'

export const Popup: FC<PopupProps> = ({onClose, isVisible, title, children,}) => {
    const [ show, setShow ] = useState(false);

    const closeHandler = () => {
        setShow(false)
        onClose(false)
    }

    useEffect(() => {
        setShow(isVisible)
    }, [ isVisible ])

    if (!show) return null;

    return createPortal(
        (
            <div className={ cn('overlay', {'overlay--show': show}) }>
                <div className="popup">
                    {title && <h2 className="popup__title">{title}</h2>}
                    <span className="popup__close" onClick={ closeHandler }>
                        <Icon name="shared/cross-svg"/>
                    </span>
                    <div className="popup__content">{children}</div>
                </div>
            </div>
        ), document.body
    )
}