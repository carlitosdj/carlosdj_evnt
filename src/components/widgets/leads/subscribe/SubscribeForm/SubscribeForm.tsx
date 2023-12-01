import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

import ModelField from "@/components/helpers/ModelField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createLeadRequest } from "@/store/ducks/lead/actions";
import { Lead } from "@/store/ducks/lead/types";
import { zodResolver } from "@hookform/resolvers/zod";

interface SubscribeFormProps {
  list: string;
  ad: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SubscribeForm = ({ list, ad, setOpen }: SubscribeFormProps) => {
  const dispatch = useDispatch();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Nome precisa ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const lead: Lead = {
      name: values.name,
      email: values.email,
      list: list,
      whatsapp: "",
      confirm: 0,
      origin: ad,
      naoperturbe: 0,
    };
    dispatch(createLeadRequest(lead));
    setOpen(false);
  };

  return (
    <div className="text-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <ModelField
            name="name"
            label="Nome"
            formControl={form.control}
            placeholder="Digite seu nome"
            className="col-span-4"
          />
          <ModelField
            name="email"
            label="E-mail"
            formControl={form.control}
            placeholder="Digite seu e-mail"
            className="col-span-4"
          />
          <br />
          <Button variant={"neon"} type="submit" id={"btn"}>
            Inscrever
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubscribeForm;
