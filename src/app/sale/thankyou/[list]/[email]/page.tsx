"use client";
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// import * as z from 'zod';

import Loading from '@/app/sale/loading';
import loadOrFailSales from '@/components/helpers/loadOrFailSales';
import Stepper from '@/components/widgets/stepper/Stepper';
import { ApplicationState } from '@/store';
import { loadComponentByDescriptionRequest } from '@/store/ducks/component/actions';
import { loadUserByEmailRequest } from '@/store/ducks/me/actions';
import { loadStateRequest } from '@/store/ducks/state/actions';
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
  // const cart = useSelector((state: ApplicationState) => state.carts);
  // const payment = useSelector((state: ApplicationState) => state.payment);

  // const [nextStep, setNextStep] = useState<boolean>(false);
  // const [paymentWay, setPaymentWay] = useState("credit_card");

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

  // console.log("cartRedux", cart);
  // console.log("paymentRedux", payment);

  //////////
  // const formSchema = z.object({
  //   name: z.string().min(1, {
  //     message: "Nome precisa ter pelo menos 1 caracter.",
  //   }),
  //   email: z.string().email({ message: "Endereço de e-mail inválido" }),
  //   whatsapp: z.string().min(2, {
  //     message: "Whatsapp precisa ter pelo menos 2 caracteres.",
  //   }),
  // });

  // const form = useForm<z.infer<typeof formSchema>>({
  //   //resolver: zodResolver(formSchema),
  //   resolver: async (data, context, options) => {
  //     // THIS IS NOT GETTING CALLED EVER => error is NOT getting populated
  //     console.log("formData", data);
  //     console.log(
  //       "validation result",
  //       await zodResolver(formSchema)(data, context, options)
  //     );
  //     return zodResolver(formSchema)(data, context, options);
  //   },
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     whatsapp: "",
  //   },
  // });

  //if (component.loading || me.loading) return <div>Loading...</div>;
  //if (component.loading || me.loading) return <div>Loading...</div>;
  let loadOrFailTest = loadOrFailSales({ component, me });
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  if (me.error || component.error) router.push(`/sales/subscribe/${list}`);

  //if (nextStep) router.push(`/sales/checkout/payment/${list}/${me.me.email}`);
  
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
              <div className="col-span-2 pb-20">
                <div className="font-extrabold text-5xl col-span-12">
                  Bem vindo(a), {me.me.name}. Vamos começar?
                </div>
              </div>
              <div className="col-span-2">
                <div>
                  É com muita alegria que damos as boas vindas. Que esse
                  treinamento seja um divisor de águas na sua vida.
                  <br />
                  Vamos agora para as instruções iniciais.
                  <br />
                  1) Você receberá a cópia desse documento no seu e-mail.
                  <br />
                  2) Sua senha pode ser alterada na página inicial, ou qdo
                  estiver logado, ou através do suporte.
                  <br />
                  3) Não repasse sua senha para ninguém. Logins simultâneos
                  serão bloqueados.
                  <br />
                  4) Não poste nada além do tema na comunidade. Posts que saem
                  do assunto serão censurados. Aqui é local para discutir sobre
                  o assunto do treinamento.
                  <br />
                  5) Não faça auto-promoção na comunidade. Também serão
                  censurados.
                  <br />
                  6) Faça perguntas. Não existe perguntas bobas. Bobeira é não
                  perguntar.
                  <br />
                  7) Faça um treinamento maravilhoso, e lembre-se que 50% é com
                  o professor, 50% é com você. Não existe fórmula mágica, não
                  existe caminho fácil, mas é extremamente importante que você
                  tenha um time com quem seguir.
                  <br />
                  Atenciosamente,
                  <br />
                  Equipe Defelicibus Soluções.
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
