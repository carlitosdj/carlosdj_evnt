import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/lead/subscribe/preconexao">Ir para leads</Link>
      <br />
      <Link href="/class/imersao-preconexao/aula01">Ir para classes</Link>
      <br />
      <Link href="/sale/subscribe/associacao">Ir para sales</Link>
      {/* <br />
      <Link href="/tailwind">Ir para Tailwind</Link> */}
    </div>
  );
};
export default Home;
