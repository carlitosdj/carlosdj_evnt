import TitleSubtitle from "@/components/helpers/TitleSubtitle";
import { getRandomValues, randomBytes } from "crypto";
import { ReactNode } from "react";
import { twMerge } from 'tailwind-merge'
interface SessionRootProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  columns: string;
  id?: string;
}
export const SessionRoot = ({
  children,
  title,
  subtitle,
  className,
  columns,
  id
}: SessionRootProps) => {
  return (
    <div
      className={twMerge("bg-secondary-300 dark:bg-secondary-950 pb-20", className)}
      id={id || randomBytes(1).toString()}
    >
      <div className="container text-center">
        <TitleSubtitle title={title!} subtitle={subtitle} />
        <div className={twMerge("grid gap-12 grid-cols-1", columns)}>{children}</div>
      </div>
    </div>
  );
};
