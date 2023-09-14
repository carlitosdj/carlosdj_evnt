interface SessionItemProps {
  title: string;
  description: string;
}
export const SessionItem = ({ title, description }: SessionItemProps) => {
  return (
    <div className="pt-2 pb-2">
      <h4 className="text-slate-100 text-2xl font-medium tracking-tight dark:text-white pt-2">{title}</h4>
      <p className="text-slate-100 text-1xl font-medium tracking-tight dark:text-white pt-2">{description}</p>
    </div>
  );
};
