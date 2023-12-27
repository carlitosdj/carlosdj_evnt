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
      <div className="bg-gradient-to-b from-secondary-800 to-secondary-950 ">
        <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_right_-110rem] md:bg-[center_right_-70rem] lg:bg-[center_right_-50rem] bg-opacity-50 bg-cover">
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
                title="Como criar Landing Pages"
                description="Como utilizar as 7 seções principais para criar uma landing page."
                delay="100"
              />
              <ItemTitleSubtitle
                title="Como anunciar no Google"
                description="Como utilizar o Google para atrair o público certo para o seu negócio."
                delay="200"
              />
              <ItemTitleSubtitle
                title="Como fechar negócios"
                description="Como entender o Funil de Vendas para aumentar sua probabilidade de conversão."
                delay="300"
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
              Carlos é formado em Engenharia de Software pela Universidade
              Federal de Uberlândia (UFU). MBA em Gestão de Projetos pela ESAMC - Uberlândia/MG.
            </div>
            <div className="font-bold text-2xl tracking-tight  pt-10">
              Experiência
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Criador da plataforma SalveMaisUm, a primeira rede social de
              doação de sangue. <br/> Criador da Plataforma Esportiva, aplicativo
              esportivo. <br/>
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
