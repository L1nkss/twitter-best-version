import { FC, ReactElement } from 'react'

import { ProgressBarProps } from '@shared/ui/progress-bar/models/interfaces/ProgressBar.interface'

import { Spinner } from '../spinner/spinner'

const ProgressBar: FC<ProgressBarProps> = ({
  percentage = 25,
  textColor = '#1DA1F2',
  textValue,
  ...props
}) => {
  const getTextValue = (): ReactElement | undefined => {
    if (!textValue) return undefined

    return (
      <text
        fill={ textColor }
        fontSize="10px"
        x="50%"
        y="50%"
        dy="4px"
        textAnchor="middle"
      >
        {`${textValue}`}
      </text>
    )
  }

  return (
    <Spinner { ...props } percentage={ percentage }>
      {getTextValue()}
    </Spinner>
  )
}

export { ProgressBar }
