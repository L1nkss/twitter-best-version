import React, { FC } from 'react'

import { Spinner } from '@shared/ui/spinner/spinner'

export const Loader: FC = () => {
  return (
    <div className="flex justify-center pt-5">
      <Spinner size={ 40 } strokeWidth={ 4 } className="rotating"/>
    </div>
  )
}
