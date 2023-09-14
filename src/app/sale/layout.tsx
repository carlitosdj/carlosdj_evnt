interface SalesLayoutProps {
  children: React.ReactNode;
}
const SalesLayout = ({ children }: SalesLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};
export default SalesLayout;
