import Link from "next/link";

const Leads = () => {
  return (
    <div >
      <Link href="/">Voltar</Link>
      <br />
      <Link href="/sales/subscribe/associacao">Ir para página de vendas</Link>
      <br />
      {/* <Link href="/leads/confirm"></Link>
      <br />
      <Link href="/leads/thankyou/preconexao">Ir para Thankyou</Link>
      <br />
      <Link href="/leads/unsubscribe">Ir para Unsubscribe</Link> */}
    </div>
  );
};
export default Leads;
