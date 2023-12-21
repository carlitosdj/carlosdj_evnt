"use client";

import "aos/dist/aos.css";

import AOS from "aos";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "@/app/sale/loading";
import loadOrFailSales from "@/components/helpers/loadOrFailSales";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/widgets/footer/Footer";
import Hero from "@/components/widgets/hero/Hero";
import SubscribeButton from "@/components/widgets/sales/subscribe/SubscribeButton/SubscribeButton";
import { Session } from "@/components/widgets/session";
import { ApplicationState } from "@/store";
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";
import getValueFromExtras from "@/components/helpers/getValueFromExtras";

const Subscribe = () => {
  const me = useSelector((state: ApplicationState) => state.me);
  const component = useSelector((state: ApplicationState) => state.component);

  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();

  let { list, ad } = params;
  if (!ad) ad = "default";

  console.log("me", me);
  console.log("component", component);

  useEffect(() => {
    dispatch(loadComponentByDescriptionRequest(list.toString()));
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, [list, dispatch]);

  useEffect(() => {
    if (me.me.id && me.me.email && me.me.whatsapp) {
      router.push(`/sale/checkout/data/${list}/${me.me.email}`);
    }
  }, [me]);

  //console.log("loadOrFail", loadOrFailSales({ component }))
  let loadOrFailTest = loadOrFailSales({ component });
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  return (
    <div className="">
      <div className="bg-gradient-to-b from-secondary-800 to-secondary-950">
        <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_top] bg-cover">
          <Hero
            //title={"Da primeira venda aos 10 mil por mês no digital."}
            title={
              getValueFromExtras({
                extras: component.data.extras!,
                key: "productHeadline",
              })!
            }
            subtitle={
              getValueFromExtras({
                extras: component.data.extras!,
                key: "productDescription",
              })!
            }
            badge={
              getValueFromExtras({
                extras: component.data.extras!,
                key: "productName",
              })!
            }
            video={
              getValueFromExtras({
                extras: component.data.extras!,
                key: "productVideo",
              })!
            }
          >
            <SubscribeButton
              ad={ad.toString()}
              me={me}
              component={component}
              list={list.toString()}
            />
          </Hero>

          <Session.Root
            id="features"
            title="Como funciona"
            subtitle="Agenda Full: A forma mais rápida de colocar o pé no digital, começar a fazer as primeiras vendas e montar um negócio sólido."
            className="bg-transparent text-center"
            columns="md:grid-cols-3"
          >
            <Session.Content
              title="24 aulas ao vivo"
              description="Em 6 meses você terá acesso a todo treinamento. Ele será entregue ao vivo, em aulas de 2h semanais."
              //description="Plataforma exclusiva com aulas em sequência, divididas em fases para você acessar de qualquer lugar com internet."
              image="https://institutodefelicibus.com.br/files/aulas-ao-vivo.jpg"
              //delay="100"
            />
            <Session.Content
              title="Mentorias em grupo"
              //description="Mentorias ao vivo duas vezes por semana: Terça Musical e Quinta Teórica. Você será 100% acompanhado."
              description="Além das aulas, em 12 sábados acontecerão as mentorias de Tira Dúvidas. Você será 100% acompanhado."
              image="https://institutodefelicibus.com.br/files/mentoria.jpg"
              //delay="200"
            />
            <Session.Content
              title="Acesso à comunidade"
              description="A melhor maneira para evoluir é dentro de uma comunidade onde todos falam a mesma língua e ajudam uns aos outros."
              image="https://institutodefelicibus.com.br/files/comunidade.jpg"
              //delay="300"
            />
          </Session.Root>
        </div>
      </div>
      <div className="flex justify-center items-center pb-10 container">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div>
      <Session.Root
        title="Pra quem é o treinamento?"
        subtitle="Pra quem é?"
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="md:grid-cols-3"
      >
        <Session.Content
          title="Aspirantes ao empreendedorismo"
          description="Se você tem vontade de empreender, entende o potencial da Internet, mas ainda está só no mundo das ideias."
          image="https://institutodefelicibus.com.br/files/aspirante.jpg"
          delay="100"
        />
        <Session.Content
          title="Vendedores de serviço iniciantes"
          description="Se você já começou a empreender mas tem dificuldades em utilizar o mundo digital para alavancar sua empresa."
          image="https://institutodefelicibus.com.br/files/iniciante.jpg"
          delay="200"
        />
        <Session.Content
          title="Quem vai montar equipe de Marketing interna"
          description="Se você já tem um negócio e quer montar uma equipe interna para evoluir seus números utilizando a Internet."
          image="https://institutodefelicibus.com.br/files/equipe.jpg"
          delay="300"
        />
      </Session.Root>
      {/* <div className="flex justify-center items-center pb-10 container">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div> */}

      <Session.Root
        title="Conteúdo programático"
        subtitle="O que você vai aprender, no detalhe."
        className="bg-secondary-100 dark:bg-secondary-950"
        columns="md:grid-cols-3"
      >
        <Session.Content title="Landing Pages" delay="100">
          <Session.Item
            title="Módulo 1 - Fundamentos"
            description="Todas as regras e conceitos iniciais."
          />
          <Session.Item
            title="Módulo 2 - Gatilhos mentais"
            description="Como captar atenção e promover ação de pessoas."
          />
          <Session.Item
            title="Módulo 3 - Sandbox"
            description="A estrutura local para gerar Landing Pages."
          />
          <Session.Item
            title="Módulo 4 - Infraestrutura online"
            description="Como expor Landing Pages na web."
          />
          <Session.Item
            title="Módulo 5 - Criando a primeira Landing Page"
            description="Mão na massa, vamos criar a primeira Landing Page."
          />
          <Session.Item
            title="Módulo 6 - Múltiplas Landing Pages"
            description="Como replicar landing pages."
          />
          <Session.Item
            title="Módulo 7 - Integração com Google Ads e Facebook Ads"
            description="Criando a estrutura de conexão Página-Anúncios."
          />
        </Session.Content>
        <Session.Content title="Anúncios online" delay="200">
          <Session.Item
            title="Módulo 1 - Configuração da conta"
            description="Como criar e fazer as configurações iniciais (Facebook e Google Ads)."
          />
          <Session.Item
            title="Módulo 2 - Públicos"
            description="Como definir corretamente seus públicos e palavras chave."
          />
          <Session.Item
            title="Módulo 3 - Criativos"
            description="Como criar peças publicitárias simples que comunicam com o público."
          />
          <Session.Item
            title="Módulo 4 - Campanhas"
            description="Como criar as campanhas e quanto gastar no Google Ads e Facebook Ads."
          />
          <Session.Item
            title="Módulo 5 - Conexão com a Landing Page"
            description="Como usar a Landing Page para gerar as métricas."
          />
          <Session.Item
            title="Módulo 6 - Otimização de Campanhas"
            description="Estratégias para otimização e análise de campanhas."
          />
          <Session.Item
            title="Módulo 7 - Geração de relatórios"
            description="Como analisar visualmente seu avanço."
          />
        </Session.Content>
        <Session.Content title="Conversão" delay="300">
          <Session.Item
            title="Módulo 1 - Fundamentos e Funil de vendas"
            description="Os princípios de vendas e métricas."
          />
          <Session.Item
            title="Módulo 2 - Objeções"
            description="Quais são as grandes objeções e como contorná-las."
          />
          <Session.Item
            title="Módulo 3 - Problema/Oportunidade/Solução"
            description="Em qual momento.."
          />
          <Session.Item
            title="Módulo 4 - Vendas Simples x Complexas"
            description="Quais são as grandes objeções e como contorná-las."
          />
          <Session.Item
            title="Módulo 5 - Como vender pelo WhatsApp"
            description="Como criar uma sequencia de vendas para Leads com SPIN Selling."
          />
          <Session.Item
            title="Módulo 6 - Funil de vendas na prática"
            description="Resumo geral na prática."
          />
        </Session.Content>
      </Session.Root>
      <div className="flex justify-center items-center pb-10 container">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div>
      <Session.Root
        title="Além do treinamento"
        subtitle="Ao entrar no Agenda Full, você terá acesso:"
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="md:grid-cols-2"
      >
        <Session.Content
          title="Criação de Vídeo de Vendas de Valor"
          description="Copywriting para o Vídeo de Vendas de Valor, Iluminação, Microfone, Cenário, Câmeras, Edição e como incluir na Landing Page."
          image="https://institutodefelicibus.com.br/files/gravacao.jpg"
          delay="100"
        />
        <Session.Content
          title="Crescimento Empresarial"
          description="Como organizar sua empresa, divisão de times e equipes, contabilidade, faturamento e reinvestimento."
          image="https://institutodefelicibus.com.br/files/empresarial.jpg"
          delay="200"
        />
      </Session.Root>

      <Session.Root
        title="Mentoria"
        subtitle="O grande diferencial do treinamento. 1 aula ao vivo por semana."
        className="bg-secondary-100 dark:bg-secondary-950"
        columns="grid-cols-1"
      >
        <Session.Content
          title="Mentoria"
          description="Todas os sábados você vai ter acesso à mentoria em grupo, com Tira-Dúvidas."
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="100"
        />
      </Session.Root>
      <div className="flex justify-center items-center pb-10 container">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div>
      {/* <Session.Root
        title="Ouça da boca dos meus alunos"
        subtitle="Todos os módulos"
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="grid-cols-1"
      >
        <Session.Content>Item 1</Session.Content>
      </Session.Root> */}

      <Session.Root
        title="Investimento"
        subtitle="É a primeira e última vez que você verá esse preço."
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="grid-cols-1"
      >
        <Session.Content><div className="text-6xl">De R$ 5099,00 <br/>por 12x R$ 49,90.</div></Session.Content>
      </Session.Root>

      <Session.Root
        title="Garantia"
        subtitle="Sua satisfação ou seu dinheiro de volta"
        className="bg-secondary-100 dark:bg-secondary-950"
        columns="grid-cols-1"
      >
        <Session.Content>
          Garantia Incondicional: Em 15 dias, por qualquer motivo, você pode
          pedir seu dinheiro de volta. Sem letras míúdas.
        </Session.Content>
      </Session.Root>
      <div className="flex justify-center items-center pb-10 container">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div>
      <Session.Root
        title="Perguntas frequentes"
        subtitle="FAQ"
        className="bg-secondary-100 dark:bg-secondary-950"
        //bg-secondary-50 dark:bg-secondary-900
        columns="grid-cols-1"
      >
        <Session.Content>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>O treinamento é vitalício?</AccordionTrigger>
              <AccordionContent className="text-start">Não. O treinamento tem duração de 6 meses mas você terá o acesso por 1 ano, você poderá ver e rever todo o conteúdo durante esse tempo. Aqui a lógica é a seguinte, você vai aprender na prática e não precisará mais voltar nessas aulas. Ou seja, se você quer construir seu negócio decolar em 6 meses você é bem vindo, se você é dessas pessoas que vão ficar procrastinando para colocar em prática o treinamento, então agora não é sua hora.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>O treinamento é 100% online?</AccordionTrigger>
              <AccordionContent className="text-start">Sim. 100% online, o que significa que você não vai precisar deslocar para assistir as aulas e ter custo com isso. É importante que você tenha uma boa conexão com a Internet e tenha uma Computador (ou Notebook) disponíveis para fazer o treinamento.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Consigo fazer o treinamento só usando o celular?</AccordionTrigger>
              <AccordionContent className="text-start">
                Infelizmente não. Você vai precisar de um computador. Eu não quero ser hipócrita dizendo que você pode fazer o treinamento pelo celular, porque assistir as aulas pelo celular é sim possível. Mas eu quero que você pratique, e a prática só é possível pelo computador ou notebook.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Como funciona o reembolso?</AccordionTrigger>
              <AccordionContent className="text-start">
                Você tem X dias para testar o produto. Ou seja, quando você entra para o treinamento temos registrado sua data e hora de entrada na Plataforma. Durante esses X dias você pode, por qualquer motivo, inclusive você não vai precisar revelar o motivo para minha equipe, de pedir seu dinheiro de volta e está tudo bem. Depois desse período você vai entrar na garantia condicional, que signfica que se você fizer tudo que eu estou te propondo durante 6 meses e não conseguir recuperar o dinheiro investido nesse treinamento de volta, eu vou abrir uma recuperação por mais 90 dias, exclusivo com a turma que não gerou seus primeiros resultados, e ao passar dessa data e você não tiver recuperado seu dinheiro de volta, eu vou te devolver todo seu dinheiro e mais 500 reais do meu bolso.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Será que é pra mim?</AccordionTrigger>
              <AccordionContent className="text-start">
                Se você se acha merecedor dessa oportunidade, de construir suas próprias landing pages, de gerenciar seus próprios anúncios e conseguir acompanhar todas as vendas da sua empresa, então sim, esse treinamento é para você. Se você acha que tudo isso aqui é mágica, e que os resultados vem sem esforço, então não, não é para você.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Não sei nada de tecnologia, é pra mim?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Sim, você não vai precisar digitar quase nenhum código, quando isso acontecer, você vai usar o CTRL C + CTRL V (copia e cola). Você vai acompanhar todos os cliques durante todas as aulas, além de participar das mentorias para tirar dúvidas. A tecnologia não será um problema para você, mas um potencializador de resultados.
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="item-6">
              <AccordionTrigger>blablabla</AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </Session.Content>
      </Session.Root>
      <div className="flex justify-center items-center pb-10 container">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div>
      <Session.Root
        title="Quem é Carlos Defelícibus Junior?"
        subtitle="Conheça mais sobre o professor"
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="md:grid-cols-2"
      >
        <Session.Content>
          <picture>
            <img src="/imgs/carlos.jpg" alt="" className="w-full rounded-sm" />
          </picture>
        </Session.Content>
        <Session.Content>
          <div className="flex flex-col justify-center text-start text-primary-900 dark:text-primary-50 md:pr-8 pb-8 md:pb-0">
            <div className="font-bold text-2xl tracking-tight">Formação</div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Carlos é formado em Engenharia de Software pela Universidade
              Federal de Uberlândia (UFU). MBA em Gestão de Projetos pela ESAMC - Uberlândia/MG.
            </div>
            <div className="font-bold text-2xl tracking-tight  pt-10">
              Experiência
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Criador da plataforma SalveMaisUm, a primeira rede social de
              doação de sangue. Criador da Plataforma Esportiva, aplicativo
              esportivo. Criador da Plataforma EAD..
            </div>
            <div className="font-bold text-2xl tracking-tight  pt-10">
              Por que decidiu ensinar?
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              O objetivo sempre foi ajudar pessoas a empreender. Empreender não é fácil mas é libertador.
            </div>
          </div>
        </Session.Content>
      </Session.Root>
      {/* <div className="flex justify-center items-center pb-10 container">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div> */}
      <Footer
        copyright="Todos os direitos reservados."
        owner="Defelicibus Soluções | 2023 | CNPJ: xxxxx"
      />
    </div>
  );
};
export default Subscribe;
