"use client";

import { AlertCircle } from 'lucide-react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as z from 'zod';

import Loading from '@/app/sale/loading';
import loadOrFailSales from '@/components/helpers/loadOrFailSales';
import ModelField from '@/components/helpers/ModelField';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import CartItems from '@/components/widgets/sales/subscribe/CartItems/CartItems';
import Stepper from '@/components/widgets/stepper/Stepper';
import { ApplicationState } from '@/store';
// import { createCartRequest } from '@/store/ducks/carts/actions';
// import { Cart } from '@/store/ducks/carts/types';
import { loadComponentByDescriptionRequest } from '@/store/ducks/component/actions';
import { loadUserByEmailRequest } from '@/store/ducks/me/actions';
import { createPagarMeOrderRequest } from '@/store/ducks/payment/actions';
import { loadStateRequest } from '@/store/ducks/state/actions';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  //children: ReactNode;
}

const Payment = ({}: Props) => {
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
  const [paymentWay, setPaymentWay] = useState("credit_card");

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
      form.setValue("paymentWay", "credit_card");
    }
  }, [me.me]);

  //console.log("cartRedux", cart);
  //console.log("paymentRedux", payment);

  //////////
  let formSchemaTotal = z.object({
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

  let formSchemaPartial = formSchemaTotal.omit({
    installments: true,
    cardcvv: true,
    cardmonth: true,
    cardname: true,
    cardnumber: true,
    cardyear: true,
  });
  let formSchema: any;
  if (paymentWay !== "credit_card") formSchema = formSchemaPartial;
  else formSchema = formSchemaTotal;

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
    console.log("Validated Values", values);

    var data = new Date();
    //Post cart:
    // const cart: Cart = {
    //   parentComponent: 106,
    //   parentUser: me.me.id,
    //   unityprice: 497, // AQUI (price)
    //   quantity: 1,
    //   discount: 0,
    //   total: 497, //unityprice * quantity AQUI (price)
    //   tax: 0,
    //   created_at: data.getTime() / 1000,
    //   status: 1,
    //   description: "NameProduct",
    //   numcartao: values.cardnumber?.replace(/\D/g, "") || "",
    //   nomecartao: values.cardname || "",
    //   expiryMonth: values.cardmonth || "",
    //   expiryYear: values.cardyear || "",
    //   codcartao: values.cardcvv || "",
    //   parcelas: +values.installments! || 1,
    // };
    // // console.log("save cart", cart);
    // // dispatch(createCartRequest(cart));

    let payment = {
      name: me.me.name,
      email: me.me.email,
      // "phone": me.me.profile?.whatsapp,
      mobilePhone: me.me.whatsapp!.replace(/\D/g, ""),
      cpfCnpj: me.me.cpf!.replace(/\D/g, ""),
      postalCode: me.me.postalCode!.replace(/\D/g, ""),
      address: me.me.address,
      //addressNumber: number,
      //"complement": request.body.complement,
      // province: city,
      city: me.me.cityParent?.name,
      state: me.me.stateParent?.state,
      country: "BR",
      payment_method: values.paymentWay,
    };
    console.log("paymentXXX", payment);
    //dispatch(createPagarMeOrderRequest(payment, cart));

    setNextStep(true);
  };

  //if (component.loading || me.loading) return <div>Loading...</div>;

  //if (component.loading || me.loading) return <div>Loading...</div>;
  let loadOrFailTest = loadOrFailSales({ component, me });
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  if (me.error || component.error) router.push(`/sale/subscribe/${list}`);

  // if (nextStep && cart.data.id && payment.data.status === "paid") {
  //   //Vai para o upsell
  //   // navigate('/aproveite/' + me.me.profile?.name)
  //   //De baixo:
  //   router.push(`/sale/thankyou/${list}/${me.me.email}`);
  // }
  // if (nextStep && cart.data.id && payment.data.status === "pending") {
  //   router.push(`/sale/checkout/pending/${list}/${me.me.email}`);
  // }
  if (nextStep) router.push(`/sale/thankyou/${list}/${me.me.email}`);

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
              <Stepper step={2} />
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

                    {/* {paymentWay}
                    x{form.getValues("paymentWay")}x */}
                    <FormField
                      control={form.control}
                      name="paymentWay"
                      render={({ field }) => (
                        <FormItem className="space-y-3 col-span-12">
                          <FormLabel>Forma de pagamento</FormLabel>
                          <FormControl>
                            <RadioGroup
                              //defaultValue="credit_card"
                              className="col-span-12"
                              onValueChange={(value) => {
                                field.onChange(value);
                                setPaymentWay(value);
                              }}
                              defaultValue={field.value}
                              //onValueChange={setPaymentWay}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={"credit_card"}
                                  id={"credit_card"}
                                  checked={paymentWay === "credit_card"}
                                />
                                <Label htmlFor="credit_card">
                                  Cartão de crédito
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={"pix"}
                                  id={"pix"}
                                  checked={paymentWay === "pix"}
                                />
                                <Label htmlFor="pix">Pix</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="boleto"
                                  id="boleto"
                                  checked={paymentWay === "boleto"}
                                />
                                <Label htmlFor="boleto">Boleto</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {paymentWay === "credit_card" && (
                      <div className="bg-primary-600 col-span-12 grid grid-cols-12 gap-4 p-4 rounded-md pb-8">
                        <FormField
                          control={form.control}
                          name="installments"
                          render={({ field }) => (
                            <FormItem className="col-span-12">
                              <FormLabel>Parcelas:</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="SelectContent">
                                  <SelectItem value="1">1x</SelectItem>
                                  <SelectItem value="2">2x</SelectItem>
                                  <SelectItem value="3">3x</SelectItem>
                                  <SelectItem value="4">4x</SelectItem>
                                  <SelectItem value="5">5x</SelectItem>
                                  <SelectItem value="6">6x</SelectItem>
                                  <SelectItem value="7">7x</SelectItem>
                                  <SelectItem value="8">8x</SelectItem>
                                  <SelectItem value="9">9x</SelectItem>
                                  <SelectItem value="10">10x</SelectItem>
                                  <SelectItem value="11">11x</SelectItem>
                                  <SelectItem value="12">12x</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <ModelField
                          name="cardname"
                          formControl={form.control}
                          placeholder="Card Name"
                          label="Card Name"
                          className="col-span-6"
                        />
                        <ModelField
                          name="cardnumber"
                          formControl={form.control}
                          placeholder="Card Number"
                          label="Card Number"
                          className="col-span-6"
                          // mask="1111 1111 1111 1111"
                          // onChange={(e) => {form.setValue("cpf",e.target.value.replace(/\D/g, ""))}}
                        />
                        <ModelField
                          name="cardmonth"
                          formControl={form.control}
                          placeholder="Card Month"
                          label="Card Month"
                          className="col-span-4"
                        />
                        <ModelField
                          name="cardyear"
                          formControl={form.control}
                          placeholder="Card Year"
                          label="Card Year"
                          className="col-span-4"
                        />
                        <ModelField
                          name="cardcvv"
                          formControl={form.control}
                          placeholder="Card Cvv"
                          label="Card Cvv"
                          className="col-span-4"
                        />
                      </div>
                    )}
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
                      className="w-full col-span-6 mt-4"
                      onClick={() =>
                        router.push(
                          `/sale/checkout/data/${list}/${me.me.email}`
                        )
                      }
                    >
                      Voltar
                    </Button>
                    <Button type="submit" className="w-full col-span-6 mt-4">
                      Próximo
                    </Button>
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

export default Payment;
