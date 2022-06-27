import { FC } from 'react'

import { ReactSVG } from 'react-svg'

import { IconProps } from '@shared/ui/icon/models/interfaces/Icon.interface'

const Icon: FC<IconProps> = ({classNames = '', name}) => {
  return <ReactSVG className={ classNames } src={ `icons/${name}.svg` }/>
}

export { Icon }
