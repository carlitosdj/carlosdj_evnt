"use client";

import 'aos/dist/aos.css';

import AOS from 'aos';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/app/sale/loading';
import loadOrFailSales from '@/components/helpers/loadOrFailSales';
import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import Footer from '@/components/widgets/footer/Footer';
import Hero from '@/components/widgets/hero/Hero';
import SubscribeButton from '@/components/widgets/sales/subscribe/SubscribeButton/SubscribeButton';
import { Session } from '@/components/widgets/session';
import { ApplicationState } from '@/store';
import { loadComponentByDescriptionRequest } from '@/store/ducks/component/actions';
import getValueFromExtras from '@/components/helpers/getValueFromExtras';

const Subscribe = () => {
  const me = useSelector((state: ApplicationState) => state.me);
  const component = useSelector((state: ApplicationState) => state.component);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  let { list, ad } = params;
  if (!ad) ad = "default";

  console.log("me", me)

  useEffect(() => {
    //document.title = "Participe";
    dispatch(loadComponentByDescriptionRequest(list.toString()));
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, [list, dispatch]);

  // console.log("component", component);
  // console.log("me", me);

  //console.log("loadOrFail", loadOrFailSales({ component }))
  let loadOrFailTest = loadOrFailSales({ component });
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  if (me.me.id && me.me.email && me.me.whatsapp) {
    router.push(`/sale/checkout/data/${list}/${me.me.email}`);
    //window.location.href = page_checkout!
  }

  return (
    <div className="">
      <Hero
        title={"Da primeira venda aos 10 mil por mês no digital."}
        // title={
        //   getValueFromExtras({
        //     extras: component.data.extras!,
        //     key: "descricao",
        //   })!
        // }
        subtitle="Você vai entender o passo a passo para a proteção dos honorários de sucumbência e não deixar nenhum centava para trás."
        badge="Treinamento para Advogados"
        video="https://player.vimeo.com/video/786710754"
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
        subtitle="Proteção de Honorários de Sucumbência"
        className="bg-secondary-50 dark:bg-secondary-950 text-center"
        columns="md:grid-cols-3"
      >
        <Session.Content
          title="10 Aulas sequenciais"
          description="Plataforma exclusiva com aulas em sequência, divididas em fases para você acessar de qualquer lugar com internet."
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="100"
        />
        <Session.Content
          title="Mentorias ao vivo"
          description="Mentorias ao vivo duas vezes por semana: Terça Musical e Quinta Teórica. Você será 100% acompanhado."
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="200"
        />
        <Session.Content
          title="Acesso à comunidade"
          description="A melhor maneira para evoluir é dentro de uma comunidade onde todos falam a mesma língua e ajudam uns aos outros."
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="300"
        />
      </Session.Root>
      <div className="flex justify-center items-center p-10">
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
          title="Iniciantes"
          description="Se você já começou a estudar sozinho mas está com dificuldade em evoluir no estudo do violão."
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="100"
        />
        <Session.Content
          title="Intermediários"
          description="Se você nunca tocou violão e tem o sonho de aprender a tocar com metodologia simples."
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="200"
        />
        <Session.Content
          title="Avançados"
          description="O passo a passo desenhado para você aprender a tocar violão com 30 minutos por dia, sem stress."
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="300"
        />
      </Session.Root>

      <Session.Root
        title="Além do treinamento"
        subtitle="Bônus"
        className="bg-secondary-100 dark:bg-secondary-950"
        columns="md:grid-cols-2"
      >
        <Session.Content
          title="Bônus 1"
          description="xx"
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="100"
        />
        <Session.Content
          title="Bônus 2"
          description="xx"
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="200"
        />
      </Session.Root>
      <div className="flex justify-center items-center p-10">
        <SubscribeButton
          ad={ad.toString()}
          me={me}
          component={component}
          list={list.toString()}
        />
      </div>
      <Session.Root
        title="Mentoria"
        subtitle="1 aula ao vivo por semana"
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="grid-cols-1"
      >
        <Session.Content
          title="Mentoria"
          description="xx"
          image="https://labiopalatina.com.br/files/puzzle.jpg"
          delay="100"
        />
      </Session.Root>

      <Session.Root
        title="Conteúdo programático"
        subtitle="Todos os módulos"
        className="bg-secondary-100 dark:bg-secondary-950"
        columns="md:grid-cols-4"
      >
        <Session.Content title="Módulo 1" delay="100">
          <Session.Item title="Aula 1 - Políticas" description="Como fazer x" />
          <Session.Item title="oi" description="oi" />
          <Session.Item title="oi" description="oi" />
        </Session.Content>
        <Session.Content title="Módulo 2" delay="200">
          <Session.Item title="oi" description="oi" />
          <Session.Item title="oi" description="oi" />
          <Session.Item title="oi" description="oi" />
        </Session.Content>
        <Session.Content title="Módulo 3" delay="300">
          <Session.Item title="oi" description="oi" />
          <Session.Item title="oi" description="oi" />
          <Session.Item title="oi" description="oi" />
        </Session.Content>
        <Session.Content title="Módulo 4" delay="400">
          <Session.Item title="oi" description="oi" />
          <Session.Item title="oi" description="oi" />
          <Session.Item title="oi" description="oi" />
        </Session.Content>
      </Session.Root>

      <Session.Root
        title="Ouça da boca dos meus alunos"
        subtitle="Todos os módulos"
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="grid-cols-1"
      >
        <Session.Content>Item 1</Session.Content>
      </Session.Root>

      <Session.Root
        title="Investimento"
        subtitle="Preço"
        className="bg-secondary-100 dark:bg-secondary-950"
        columns="grid-cols-1"
      >
        <Session.Content>Item 1</Session.Content>
      </Session.Root>

      <Session.Root
        title="Garantia"
        subtitle="Sua satisfação ou seu dinheiro de volta"
        className="bg-secondary-50 dark:bg-secondary-900"
        columns="grid-cols-1"
      >
        <Session.Content>Item 1</Session.Content>
      </Session.Root>

      <Session.Root
        title="Perguntas frequentes"
        subtitle="FAQ"
        className="bg-secondary-100 dark:bg-secondary-950"
        columns="grid-cols-1"
      >
        <Session.Content>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>O treinamento é vitalício?</AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>O treinamento é 100% online?</AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Como funciona o reembolso?</AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Será que é pra mim?</AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Não sei nada de tecnologia, é pra mim?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>blablabla</AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Session.Content>
      </Session.Root>

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
            <div className="font-bold text-2xl tracking-tight">
              Onde estava todo esse tempo?
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Mais conhecido como Carlitos, formado em Engenharia de Software
              pela Universidade Federal de Uberlândia, apaixonado por viagens e
              desenvolvedor de Softwares.
            </div>
            <div className="font-bold text-2xl tracking-tight  pt-10">
              Experiência com Empreendedorismo e Softwares
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Abriu sua própria empresa logo após formar.
            </div>
            <div className="font-bold text-2xl tracking-tight  pt-10">
              No mercado
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Construiu soluções como Salve Mais Um, Oficioso.
            </div>
            <div className="font-bold text-2xl tracking-tight  pt-10">
              Por que decidiu ensinar?
            </div>
            <div className="text-1xl text-slate-900 dark:text-primary-50/75">
              Multiplicação de talentos.
            </div>
          </div>
        </Session.Content>
      </Session.Root>
      <Footer
        copyright="Todos os direitos reservados."
        owner="Defelicibus Soluções | 2023 | CNPJ: xxxxx"
      />
    </div>
  );
};
export default Subscribe;
