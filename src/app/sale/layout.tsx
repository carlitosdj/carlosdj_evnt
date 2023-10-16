import { Metadata } from "next";

interface SalesLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Página de vendas",
  description: "Criado por Carlos Defelícibus Junior",
};

const SalesLayout = ({ children }: SalesLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};
export default SalesLayout;
