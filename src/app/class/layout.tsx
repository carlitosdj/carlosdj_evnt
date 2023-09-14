interface ClassLayoutProps {
  children: React.ReactNode;
}
const ClassLayout = ({ children }: ClassLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};
export default ClassLayout;
