interface LeadsLayoutProps {
  children: React.ReactNode;
}
const LeadsLayout = ({ children }: LeadsLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};
export default LeadsLayout;
