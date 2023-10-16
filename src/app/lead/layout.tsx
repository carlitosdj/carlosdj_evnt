import { Metadata } from "next";

interface LeadsLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Faça sua inscrição",
  description: "Criado por Carlos Defelícibus Junior",
};

const LeadsLayout = ({ children }: LeadsLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};
export default LeadsLayout;
