import {
  LucideSeparatorHorizontal,
  SeparatorHorizontal,
  SeparatorHorizontalIcon,
  SeparatorVertical,
} from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="p-4">
      <div className="font-medium text-xl">API</div>
      <Link href="http://localhost:3000/swagger" target="_blank">
        Link api
      </Link>
      <br />
      <Link href="http://localhost:3000/lead/crons" target="_blank">
        CronJOBS (Leads)
      </Link>
      <br />
      <br />

      <div className="font-medium text-xl">MARKETING</div>
      <Link href="/lead/subscribe/lead-out23/site" target="_blank">
        Cadastro de Leads
      </Link>
      <br />
      <Link href="/class/event-out23/aula01" target="_blank">
        Semana Imersão
      </Link>
      <br />
      <Link href="/sale/subscribe/sales-out23" target="_blank">
        Página de vendas
      </Link>
      <br />
      <Link href="/viawhats/campanha-teste" target="_blank">
        VIAWhats
      </Link>

      <br />
      <br />
      <div className="font-medium text-xl">PORTAL DO ALUNO</div>
      <Link href="http://localhost:3002" target="_blank">
        Produto
      </Link>

      <br />
      <br />
      <div className="font-medium text-xl">ADMINISTRAÇÃO</div>
      <Link href="http://localhost:3003" target="_blank">
        Painel administrativo
      </Link>

      {/* <br />
      <Link href="/tailwind">Ir para Tailwind</Link> */}
    </div>
  );
};
export default Home;
