import { FC } from 'react'

import { PageHeaderProps } from '@shared/ui/page-header/models/interfaces/PageHeader.interface'

const PageHeader: FC<PageHeaderProps> = ({
  classNames = '',
  pageName,
}: PageHeaderProps) => {
  return (
    <header className={`p-4 ${classNames}`}>
      <h2 className="text-xl font-bold">{pageName}</h2>
    </header>
  )
}

export { PageHeader }
