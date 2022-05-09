import { FC } from "react";

interface PageHeaderProps {
  classNames?: string;
  pageName: string;
}

const PageHeader: FC<PageHeaderProps> = ({
  classNames = "",
  pageName,
}: PageHeaderProps) => {
  return (
    <header className={`p-4 ${classNames}`}>
      <h2 className="text-xl font-bold">{pageName}</h2>
    </header>
  );
};

export default PageHeader;
