"use client";
import { AlertCircle } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

import Loading from "@/app/sale/loading";
import loadOrFailSales from "@/components/helpers/loadOrFailSales";
import ModelField from "@/components/helpers/ModelField";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CartItems from "@/components/widgets/sales/subscribe/CartItems/CartItems";
import Stepper from "@/components/widgets/stepper/Stepper";
import { ApplicationState } from "@/store";
// import { createCartRequest } from '@/store/ducks/carts/actions';
// import { Cart } from '@/store/ducks/carts/types';
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";
import { loadUserByEmailRequest } from "@/store/ducks/me/actions";
import { createPagarMeOrderRequest } from "@/store/ducks/payment/actions";
import { loadStateRequest } from "@/store/ducks/state/actions";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  //children: ReactNode;
}

const Pending = ({}: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  let { list, email } = params;

  const component = useSelector((state: ApplicationState) => state.component);
  const me = useSelector((state: ApplicationState) => state.me);
  //const cart = useSelector((state: ApplicationState) => state.carts);
  const payment = useSelector((state: ApplicationState) => state.payment);
  // const state = useSelector((state: ApplicationState) => state.state);
  // const city = useSelector((state: ApplicationState) => state.city);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [ssePayment, setSsePayment] = useState({ data: { status: '0' } })
  //const [paymentWay, setPaymentWay] = useState("credit_card");

  useEffect(() => {
    dispatch(loadStateRequest());
    if (!component.data.id)
      dispatch(loadComponentByDescriptionRequest(list.toString()));
    if (!me.me.id) {
      dispatch(loadUserByEmailRequest(decodeURIComponent(email.toString())));
    } else {
      console.log("Tem user...", me.me);
      form.setValue("name", me.me.name!);
      form.setValue("email", me.me.email!);
      form.setValue("whatsapp", me.me.whatsapp!);
    }
  }, [me.me]);

  useEffect(() => {
    const eventSource = new EventSource(
      `https://institutodefelicibus.com.br/apimodelo/payment/sse`,
      {
        withCredentials: true,
      }
    );
    eventSource.onopen = () => {
      console.log('open');
    };
    eventSource.onmessage = (e) => {
      console.log('---MESSAGE SSE---');
      console.log(JSON.parse(e.data));
      setSsePayment(JSON.parse(e.data));
    };
    eventSource.onerror = (e) => {
      console.log(e);
    };
    return () => {
      console.log("close")
      eventSource.close();
    };
    // console.log("event...");
    // eventSource.onmessage = (e) => {
    //   console.log("OIII");
    //   console.log("CHEGOU", e);
    // };
    // return () => {
    //   console.log("Closing...");
    //   eventSource.close();
    // };
  }, []);

  //console.log("cartRedux", cart);
  console.log("paymentRedux", payment);

  //////////
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Nome precisa ter pelo menos 1 caracter.",
    }),
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
    whatsapp: z.string().min(2, {
      message: "Whatsapp precisa ter pelo menos 2 caracteres.",
    }),
    paymentWay: z.string().min(1, {
      message: "Installments precisa ter pelo menos 1 caracteres.",
    }),
    installments: z.string().min(1, {
      message: "Installments precisa ter pelo menos 1 caracteres.",
    }),
    cardname: z.string().min(2, {
      message: "Card name precisa ter pelo menos 2 caracteres.",
    }),
    cardnumber: z.string().min(2, {
      message: "Card number precisa ter pelo menos 2 caracteres.",
    }),
    cardmonth: z.string().min(2, {
      message: "Card month precisa ter pelo menos 2 caracteres.",
    }),
    cardyear: z.string().min(2, {
      message: "Card year precisa ter pelo menos 2 caracteres.",
    }),
    cardcvv: z.string().min(2, {
      message: "Card cvv precisa ter pelo menos 2 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    //resolver: zodResolver(formSchema),
    resolver: async (data, context, options) => {
      // THIS IS NOT GETTING CALLED EVER => error is NOT getting populated
      console.log("formData", data);
      console.log(
        "validation result",
        await zodResolver(formSchema)(data, context, options)
      );
      return zodResolver(formSchema)(data, context, options);
    },
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      paymentWay: "",
      installments: "",
      cardname: "",
      cardnumber: "",
      cardmonth: "",
      cardyear: "",
      cardcvv: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Values", values);

    var data = new Date();
    //Post cart:
    // const cart: Cart = {
    //   parentComponent: 106,
    //   parentUser: me.me.id,
    //   unityprice: 89272, // AQUI (price)
    //   quantity: 1,
    //   discount: 0,
    //   total: 89272, //unityprice * quantity AQUI (price)
    //   tax: 0,
    //   created_at: data.getTime() / 1000,
    //   status: 1,
    //   description: "NameProduct",
    //   numcartao: values.cardnumber.replace(/\D/g, ""),
    //   nomecartao: values.cardname,
    //   expiryMonth: values.cardmonth,
    //   expiryYear: values.cardyear,
    //   codcartao: values.cardcvv,
    //   parcelas: +values.installments,
    // };
    // console.log("save cart", cart);
    // dispatch(createCartRequest(cart));

    // let payment = {
    //   name: me.me.profile!.name,
    //   email: me.me.email,
    //   // "phone": me.me.profile?.whatsapp,
    //   mobilePhone: me.me.profile?.whatsapp!.replace(/\D/g, ""),
    //   cpfCnpj: me.me.profile?.cpf!.replace(/\D/g, ""),
    //   postalCode: me.me.profile?.postalCode!.replace(/\D/g, ""),
    //   address: me.me.profile?.address,
    //   //addressNumber: number,
    //   //"complement": request.body.complement,
    //   // province: city,
    //   city: me.me.profile?.cityParent?.name,
    //   state: me.me.profile?.stateParent?.state,
    //   country: "BR",
    //   payment_method: values.paymentWay,
    // };
    // console.log("paymentXXX", payment);
    // dispatch(createPagarMeOrderRequest(payment, cart));

    setNextStep(true);
  };

  //if (component.loading || me.loading) return <div>Loading...</div>;
  //if (component.loading || me.loading) return <div>Loading...</div>;
  let loadOrFailTest = loadOrFailSales({ component, me });
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  if (me.error || component.error) router.push(`/sales/subscribe/${list}`);
  if (payment.data.status === "paid" || ssePayment.data.status === "paid" ) {
    //Vai para o upsell
    // navigate('/aproveite/' + me.me.profile?.name)
    console.log("REDIRECIONA")
    router.push(`/sale/thankyou/${list}/${me.me.email}`);
  }
  //   if (cart.data.id && payment.data.status === "paid") {
  //     //Vai para o upsell
  //     // navigate('/aproveite/' + me.me.profile?.name)
  //     //De baixo:
  //     router.push(`/sales/checkout/thankyou/${list}/${me.me.email}`);
  //   }

  //   if (cart.data.id && payment.data.status === "pending") {
  //     router.push(`/sales/checkout/pending/${list}/${me.me.email}`);
  //   }
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
              <Stepper step={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 order-2 md:order-1 pb-20">
                <div className="pb-4">Seus dados</div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full grid grid-cols-12 gap-4"
                  >
                    <ModelField
                      name="name"
                      formControl={form.control}
                      placeholder="Digite seu nome"
                      disabled={true}
                      className="col-span-12"
                    />
                    <ModelField
                      name="email"
                      formControl={form.control}
                      placeholder="Digite seu email"
                      disabled={true}
                      className="col-span-12"
                    />
                    <ModelField
                      name="whatsapp"
                      formControl={form.control}
                      placeholder="Digite seu Whatsapp"
                      disabled={true}
                      className="col-span-12"
                    />

                    <div className="col-span-12">
                      ID: {payment.data.charges[0].id}
                      <br />
                      <br />
                      Dados do {payment.data.charges[0].payment_method}: <br />
                      {/* boleto */}
                      {payment.data.charges[0].payment_method === "boleto" && (
                        <div>
                          <div>
                            <iframe
                              title="qr_code"
                              src={
                                payment.data.charges[0].last_transaction.qr_code
                              }
                              height={250}
                              width={"100%"}
                            />
                          </div>
                          <div>
                            <iframe
                              title="qr_code"
                              src={
                                payment.data.charges[0].last_transaction.barcode
                              }
                              height={70}
                              width={"100%"}
                            />
                          </div>
                          <div>
                            {payment.data.charges[0].last_transaction.line}
                          </div>

                          <Alert>
                            Instruções do{" "}
                            {payment.data.charges[0].payment_method}:{" "}
                            {
                              payment.data.charges[0].last_transaction
                                .instructions
                            }
                            .
                            <br />
                            Após pagar o boleto, o prazo para a sua compensação
                            é de até 3 dias úteis. Isso acontece porque os
                            bancos precisam repassar o valor pago para a
                            instituição que deve receber. Ou seja, se você pagar
                            numa segunda-feira, o pagamento deve ser reconhecido
                            apenas na quinta-feira. Lembrando que são 3 dias
                            úteis.
                          </Alert>
                        </div>
                      )}
                      {/* pix */}
                      {payment.data.charges[0].payment_method === "pix" && (
                        <div>
                          <div>
                            <iframe
                              title="qr_code"
                              src={
                                payment.data.charges[0].last_transaction
                                  .qr_code_url
                              }
                              height={250}
                            />
                          </div>
                          <div>
                            {payment.data.charges[0].last_transaction.qr_code}
                          </div>
                        </div>
                      )}
                    </div>
                    {payment.data.errors && (
                      <Alert
                        variant="destructive"
                        className="col-span-12 neon-red bg-primary-100"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          {JSON.stringify(
                            Object.keys(payment.data.errors).map(
                              (key) => payment.data.errors[key]
                            )[0]
                          )}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      className="w-full col-span-12 mt-4"
                      onClick={() =>
                        router.push(
                          `/sale/checkout/payment/${list}/${me.me.email}`
                        )
                      }
                    >
                      Voltar
                    </Button>
                    {/* <Button type="submit" className="w-full col-span-6 mt-4">
                      Próximo
                    </Button> */}
                  </form>
                </Form>
              </div>
              <div className="col-span-1 order-1 md:order-2">
                <CartItems />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;
