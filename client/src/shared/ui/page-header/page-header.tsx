import { FC, memo } from 'react'

import { PageHeaderProps } from '@shared/ui/page-header/models/interfaces/PageHeader.interface'

const PageHeader: FC<PageHeaderProps> = memo(({
  classNames = '',
  pageName,
  children,
}) => {
  return (
    <header className={ `flex items-center p-4 ${classNames}` }>
      {children}
      <h2 className="text-xl font-bold">{pageName}</h2>
    </header>
  )
})


export { PageHeader }
