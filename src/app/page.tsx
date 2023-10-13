import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/lead/subscribe/captacao">Ir para leads</Link>
      <br />
      <Link href="/class/imersao-carlitos/aula01">Ir para classes</Link>
      <br />
      <Link href="/sale/subscribe/vendas-carlitos">Ir para sales</Link>
      <br/>
      <Link href="/viawhats/campanha-teste">Ir para Viawhats</Link>

      {/* <br />
      <Link href="/tailwind">Ir para Tailwind</Link> */}
    </div>
  );
};
export default Home;
