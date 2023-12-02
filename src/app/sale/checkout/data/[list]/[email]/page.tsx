"use client";
import axios from "axios";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

import Loading from "@/app/sale/loading";
import loadOrFailSales from "@/components/helpers/loadOrFailSales";
import ModelField from "@/components/helpers/ModelField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CartItems from "@/components/widgets/sales/subscribe/CartItems/CartItems";
import Stepper from "@/components/widgets/stepper/Stepper";
import { ApplicationState } from "@/store";
import { loadCityRequest } from "@/store/ducks/city/actions";
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";
import {
  loadUserByEmailRequest,
  updateMeRequest,
} from "@/store/ducks/me/actions";
import { loadStateRequest } from "@/store/ducks/state/actions";
import { User } from "@/store/ducks/users/types";
import { zodResolver } from "@hookform/resolvers/zod";

import formSchemaData from "./formSchemaData";

interface Props {
  //children: ReactNode;
}

const Data = ({}: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  let { list, email } = params;

  const component = useSelector((state: ApplicationState) => state.component);
  const me = useSelector((state: ApplicationState) => state.me);
  const state = useSelector((state: ApplicationState) => state.state);
  const city = useSelector((state: ApplicationState) => state.city);
  const [nextStep, setNextStep] = useState<boolean>(false);

  console.log("component", component);
  console.log("me", me);
  console.log("state", state);
  console.log("city", city);

  useEffect(() => {
    dispatch(loadStateRequest());
    if (!component.data.id)
      dispatch(loadComponentByDescriptionRequest(list.toString()));
    if (!me.me.id) {
      dispatch(loadUserByEmailRequest(decodeURIComponent(email.toString())));
    } else {
      form.setValue("name", me.me.name!);
      form.setValue("email", me.me.email!);
      form.setValue("whatsapp", me.me.whatsapp!);
      form.setValue("cpf", me.me.cpf!);
      form.setValue("cep", me.me.postalCode!);
      form.setValue("address", me.me.address!);
      form.setValue("number", me.me.addressNumber!);
      form.setValue("bairro", me.me.addressDistrict!);
      form.setValue("estado", me.me.stateParent?.id?.toString()!);
      form.setValue("cidade", me.me.cityParent?.name?.toString()!);
    }

    if (me.me.stateParent?.id) {
      dispatch(loadCityRequest(me.me.stateParent?.id.toString()!));
    }
  }, [me.me]);

  useEffect(() => {
    if (me.error || component.error) router.push(`/sale/subscribe/${list}`);
  }, [me, component]);

  useEffect(() => {
    if (nextStep) router.push(`/sale/checkout/payment/${list}/${me.me.email}`);
  }, [nextStep]);

  const carregaCEP = (cep: string) => {
    if (cep.replace(/\D/g, "").length === 8) {
      const api =
        "https://viacep.com.br/ws/" + cep.replace(/\D/g, "") + "/json/";
      axios.get(api).then((res) => {
        form.setValue("address", res.data.logradouro);
        form.setValue("bairro", res.data.bairro);

        let selectedState = state.data?.filter(
          (item) => item.state === res.data.uf
        )[0];

        form.setValue("estado", selectedState.id?.toString()!);
        form.setValue("cidade", res.data.localidade);

        dispatch(loadCityRequest(selectedState.id?.toString()!));
      });
    }
  };

  const form = useForm<z.infer<typeof formSchemaData>>({
    //resolver: zodResolver(formSchema),
    resolver: async (data, context, options) => {
      // THIS IS NOT GETTING CALLED EVER => error is NOT getting populated
      console.log("formData", data);
      console.log(
        "validation result",
        await zodResolver(formSchemaData)(data, context, options)
      );
      return zodResolver(formSchemaData)(data, context, options);
    },
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      password: "",
      cpf: "",
      cep: "",
      address: "",
      number: "",
      bairro: "",
      estado: "",
      cidade: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchemaData>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    let selectedCity = city.data?.filter(
      (item) => item.name === values.cidade
    )[0];

    let selectedState = state.data?.filter(
      (item) => item.id === parseInt(values.estado)
    )[0];

    //var data = new Date();
    //var data = new Date()
    const userupdate: User = {
      id: me.me.id,
      newPassword: values.password,
      numTurma: 1,
      flag: 10,
      cpf: values.cpf.replace(/\D/g, ""),
      address: values.address,
      addressNumber: values.number,
      addressDistrict: values.bairro,
      //addressCountry: "BR",
      postalCode: values.cep?.replace(/\D/g, ""),
      cityId: selectedCity.id!,
      stateId: selectedState.id!,
      roles: "consumer",
    };
    console.log("User to update", userupdate);

    //Segundo atualiza o usuário:
    dispatch(updateMeRequest(userupdate));
    setNextStep(true);
  };

  //if (component.loading || me.loading) return <div>Loading...</div>;
  let loadOrFailTest = loadOrFailSales({ component, me });
  console.log("loadOrFailTest", loadOrFailTest);
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;
  if (me.loading || component.loading) return <Loading />;
  
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
              <Stepper step={1} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 order-2 md:order-1 pb-20">
                <div className="pb-4">Seus dados</div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full grid grid-cols-4 gap-4"
                  >
                    <ModelField
                      name="name"
                      formControl={form.control}
                      placeholder="Digite seu nome"
                      disabled={true}
                      className="col-span-4"
                    />
                    <ModelField
                      name="email"
                      formControl={form.control}
                      placeholder="Digite seu email"
                      disabled={true}
                    />
                    <ModelField
                      name="whatsapp"
                      formControl={form.control}
                      placeholder="Digite seu Whatsapp"
                      disabled={true}
                    />
                    <ModelField
                      name="password"
                      formControl={form.control}
                      placeholder="Digite sua Senha"
                      label="Senha"
                    />
                    <ModelField
                      name="cpf"
                      formControl={form.control}
                      placeholder="Digite seu CPF"
                      label="CPF"
                      mask="111.111.111-11"
                      onChange={(e) => {
                        form.setValue("cpf", e.target.value.replace(/\D/g, ""));
                      }}
                    />
                    <ModelField
                      name="cep"
                      formControl={form.control}
                      placeholder="Digite seu CEP"
                      label="CEP"
                      onChange={(e) => {
                        carregaCEP(e.target.value);
                        form.setValue("cep", e.target.value.replace(/\D/g, ""));
                      }}
                      //onChange={console.log}
                      mask="11111-111"
                    />
                    <ModelField
                      name="address"
                      formControl={form.control}
                      placeholder="Digite seu Endereço"
                      label="Endereço"
                      className="col-span-2"
                    />
                    <ModelField
                      name="number"
                      formControl={form.control}
                      placeholder="Digite seu Número"
                      label="Número"
                      className="col-span-1"
                    />
                    <ModelField
                      name="bairro"
                      formControl={form.control}
                      placeholder="Digite seu bairro"
                      label="Bairro"
                      className="col-span-1"
                    />

                    {!state.loading && (
                      <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Estado</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                console.log("VALUE CHANGE", value);
                                field.onChange(value);
                                dispatch(loadCityRequest(value.toString()));
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="SelectContent">
                                {state.data.map((st: any, index) => {
                                  return (
                                    <SelectItem
                                      key={index}
                                      value={st.id.toString()}
                                    >
                                      {st.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {city.loading ? (
                      <div className="col-span-2">Carregando..</div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="cidade"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Cidade</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="SelectContent">
                                <ScrollArea className="h-[24em] rounded-md border-lg">
                                  {city.data.map((ct: any, index) => {
                                    return (
                                      <SelectItem
                                        key={index}
                                        value={ct.name.toString()}
                                      >
                                        {ct.name}
                                      </SelectItem>
                                    );
                                  })}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <Button type="submit" className="w-full col-span-4 mt-4">
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

export default Data;
