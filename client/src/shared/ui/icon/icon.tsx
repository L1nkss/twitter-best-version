import { FC } from 'react'

import { ReactSVG } from 'react-svg'

import { IconProps } from '@shared/ui/icon/models/interfaces/Icon.interface'

const Icon: FC<IconProps> = ({classNames = '', name}) => {
  const iconPath = 'icons/'

  return <ReactSVG className={ classNames } src={ `${iconPath}${name}.svg` }/>
}

export { Icon }
