"use client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
// import * as z from 'zod';

import Loading from "@/app/sale/loading";
import loadOrFailSales from "@/components/helpers/loadOrFailSales";
import Stepper from "@/components/widgets/stepper/Stepper";
import { ApplicationState } from "@/store";
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";
import { loadUserByEmailRequest } from "@/store/ducks/me/actions";
import { loadStateRequest } from "@/store/ducks/state/actions";
// import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  //children: ReactNode;
}

const Thankyou = ({}: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  let { list, email } = params;

  const component = useSelector((state: ApplicationState) => state.component);
  const me = useSelector((state: ApplicationState) => state.me);

  useEffect(() => {
    dispatch(loadStateRequest());
    if (!component.data.id)
      dispatch(loadComponentByDescriptionRequest(list.toString()));
    if (!me.me.id) {
      dispatch(loadUserByEmailRequest(decodeURIComponent(email.toString())));
    } else {
      console.log("Tem user...", me.me);
      // form.setValue("name", me.me.profile?.name!);
      // form.setValue("email", me.me.email!);
      // form.setValue("whatsapp", me.me.profile?.whatsapp!);
    }
  }, [me.me]);

  let loadOrFailTest = loadOrFailSales({ component, me });
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  if (me.error || component.error) router.push(`/sales/subscribe/${list}`);

  return (
    <div className="bg-secondary-600">
      <div className="bg-gradient-to-b from-secondary-800 to-secondary-950">
        <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_top] bg-cover">
          <div className="container">
            <div className="flex justify-center items-center p-2">Logo</div>
            <div className="flex justify-center items-center p-2">
              Entre com os seus dados para ingressar no treinamento.
            </div>
            <div className="flex justify-center items-center p-2 mb-8">
              <Stepper step={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-2 pb-10">
                <div className="font-extrabold text-4xl col-span-12">
                  Bem vindo(a), {me.me.name}. Vamos começar?
                </div>
              </div>
              <div className="col-span-2">
                <div>
                  <p>
                    É com imensa alegria que estendemos as boas-vindas a você.
                    Desejamos que este treinamento represente um marco
                    significativo em sua jornada.
                  </p>
                  <br />
                  <p>Agora, vamos seguir com algumas instruções iniciais:</p>
                  <br />
                  <p>
                    1. Em breve, você receberá uma cópia deste documento em seu
                    e-mail.
                  </p>
                  <br />
                  <p>
                    2. Lembre-se de que é possível alterar sua senha na página
                    inicial, quando estiver conectado ou contatando o suporte.
                  </p>
                  <br />
                  <p>
                    3. Por favor, zele pela confidencialidade de sua senha e
                    evite compartilhá-la com terceiros, uma vez que logins
                    simultâneos serão automaticamente bloqueados.
                  </p>
                  <br />
                  <p>
                    4. Mantenha as discussões na comunidade estritamente
                    relacionadas ao tema do treinamento. Qualquer post que fuja
                    do assunto será sujeito a censura. Este é um espaço
                    destinado à reflexão sobre o conteúdo do treinamento.
                  </p>
                  <br />
                  <p>
                    5. Não promova a si mesmo ou seus interesses pessoais na
                    comunidade, pois essas postagens também estarão sujeitas a
                    censura.
                  </p>
                  <br />
                  <p>
                    6. Encorajamos você a fazer perguntas sempre que necessário.
                    Lembre-se de que não existem perguntas sem valor. O
                    verdadeiro erro está em não questionar.{" "}
                  </p>
                  <br />
                  <p>
                    7. Por fim, empenhe-se ao máximo durante o treinamento e
                    tenha em mente que o sucesso depende igualmente de seu
                    esforço e do auxílio do instrutor. Não existe uma fórmula
                    mágica ou atalhos fáceis, mas é crucial contar com um time
                    de apoio para seguir adiante.
                  </p>
                  <br />
                  Atenciosamente, A Equipe Defelicibus Soluções.
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
