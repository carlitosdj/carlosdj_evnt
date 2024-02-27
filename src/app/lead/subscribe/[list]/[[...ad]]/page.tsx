"use client";
import "aos/dist/aos.css";

import AOS from "aos";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "@/app/lead/loading";
import getValueFromExtras from "@/components/helpers/getValueFromExtras";
import ItemTitleSubtitle from "@/components/helpers/ItemTitleSubtitle";
import loadOrFailLeads from "@/components/helpers/loadOrFailLeads";
import Footer from "@/components/widgets/footer/Footer";
import Hero from "@/components/widgets/hero/Hero";
import FeatureSection from "@/components/widgets/leads/subscribe/FeatureSection/FeatureSection";
import SubscribeButton from "@/components/widgets/leads/subscribe/SubscribeButton/SubscribeButton";
import { Session } from "@/components/widgets/session";
import { ApplicationState } from "@/store";
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";

const Subscribe = () => {
  const lead = useSelector((state: ApplicationState) => state.lead);
  const component = useSelector((state: ApplicationState) => state.component);

  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();

  let { list, ad } = params;
  if (!ad) ad = "default";

  useEffect(() => {
    dispatch(loadComponentByDescriptionRequest(list.toString()));
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, [list]);

  useEffect(() => {
    if (lead.data.id) {
      router.push(`/lead/thankyou/${list}/${lead.data.email}`);
    }
  }, [lead]);

  let loadOrFailTest = loadOrFailLeads({ component });
  // console.log("component", component);
  // console.log("lead", lead);
  // console.log('loadOrFailTest', loadOrFailTest)

  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  return (
    <div className="h-full">
      <div className="bg-gradient-to-b from-secondary-800 to-secondary-950">
        <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_right_-132rem] md:bg-[center_right_-148rem] lg:bg-[center_right_-50rem] bg-cover bg-opacity-20">
          <Hero
            badge={
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventName",
              })!
            }
            title={
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventHeadline",
              })!
            }
            //title={"Como criar landing pages"}
            subtitle={
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventDescription",
              })!
            }
          >
            <SubscribeButton
              ad={ad.toString()}
              lead={lead}
              component={component}
              list={list.toString()}
            />
          </Hero>

          <FeatureSection
            title="O que você vai aprender?"
            subtitle="Uma aula gratuita para Empreendedores que querem utilizar a Internet para vender mais."
            className="bg-transparent"
          >
            <div className="pt-28 grid grid-cols-1 md:grid-cols-3 gap-4 text-primary dark:text-primary-50 ">
              <ItemTitleSubtitle
                title="Funil de vendas"
                description="Como utilizar as 7 etapas do Funil de Vendas para aumentar sua probabilidade de conversão."
                //delay="100"
              />
              <ItemTitleSubtitle
                title="Alavancagem de vendas"
                description="Como utilizar o Marketing Digital para atrair as pessoas que tem caracteristicas de compra."
                //delay="200"
              />
              <ItemTitleSubtitle
                title="O mapa da jornada"
                description="O passo a passo para você sair do Zero e alavancar suas vendas utilizando a Internet."
                //delay="300"
              />
            </div>
          </FeatureSection>

          <div className="container">
            <div className="flex justify-center items-center py-20">
              <SubscribeButton
                ad={ad.toString()}
                lead={lead}
                component={component}
                list={list.toString()}
              />
            </div>
          </div>
        </div>
      </div>
      {/*  */}

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
              Carlos Defelícibus Junior, um empreendedor e visionário
              brasileiro, é reconhecido por seu compromisso em utilizar a
              tecnologia para causar impacto positivo na sociedade.
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75 pt-5">
              Nasceu em uma família de mente aberta e empreendedora, o que
              moldou sua visão desde cedo.
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75 pt-5">
              Após concluir sua formação em Engenharia de Software pela
              Universidade Federal de Uberlândia (UFU), Carlos decidiu aprimorar
              suas habilidades de gestão, obtendo um MBA em Gestão de Projetos
              pela ESAMC, em Uberlândia, Minas Gerais.
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75 pt-5">
              Essa combinação de conhecimento técnico e habilidades de gestão o
              preparou para enfrentar desafios complexos no mundo dos negócios.
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75 pt-5">
              Carlos é mais conhecido como o criador da plataforma SalveMaisUm,
              uma iniciativa pioneira que revolucionou a forma como as doações
              de sangue são feitas no Brasil.
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75 pt-5">
              Essa plataforma, que funciona como uma rede social dedicada à
              doação de sangue, conecta doadores a bancos de sangue e hospitais
              de maneira eficiente e transparente, contribuindo para salvar
              vidas em todo o país.
            </div>
            <div className="font-bold text-2xl tracking-tight  pt-10">
              Experiência
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Sua paixão por empreendedorismo e seu desejo de fazer a diferença
              na vida das pessoas o levaram a dedicar-se ao ensino. Carlos
              acredita que empreender não é apenas uma atividade comercial, mas
              também uma oportunidade de causar impacto positivo na comunidade.
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75 pt-5">
              Ele está empenhado em compartilhar seu conhecimento e experiência
              para capacitar outros aspirantes a empreendedores, ajudando-os a
              superar desafios e alcançar seus objetivos.
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75 pt-5">
              Com uma mente inovadora e uma visão voltada para o bem comum,
              Carlos Defelícibus Junior continua a inspirar e motivar aqueles ao
              seu redor, deixando um legado duradouro de empreendedorismo e
              humanidade.
            </div>
          </div>
        </Session.Content>
      </Session.Root>

      {/* <div className="flex justify-center items-center py-20">
        <SubscribeButton
          ad={ad.toString()}
          lead={lead}
          component={component}
          list={list.toString()}
        />
      </div> */}

      <Footer
        copyright="Todos os direitos reservados."
        owner="Defelicibus Soluções | 2023 | CNPJ: 30.814.692/0001-72"
      />
    </div>
  );
};
export default Subscribe;
