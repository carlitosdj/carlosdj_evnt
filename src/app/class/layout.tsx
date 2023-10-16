import { Metadata } from "next";

interface ClassLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Aulas",
  description: "Criado por Carlos Defelícibus Junior",
};

const ClassLayout = ({ children }: ClassLayoutProps) => {
  return (
    <div>
      {children}
    </div>
    
  );
};
export default ClassLayout;
