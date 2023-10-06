import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

import ModelField from "@/components/helpers/ModelField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ComponentState } from "@/store/ducks/component/types";
import { createLeadRequest } from "@/store/ducks/lead/actions";
import { Emailmessage, Lead, LeadState } from "@/store/ducks/lead/types";
import { zodResolver } from "@hookform/resolvers/zod";

interface SubscribeFormProps {
  component: ComponentState;
  lead: LeadState;
  list: string;
  ad: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SubscribeForm = ({
  component,
  lead,
  list,
  ad,
  setOpen,
}: SubscribeFormProps) => {
  // const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
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
    console.log(values);
    let data = new Date();
    const lead: Lead = {
      name: values.name,
      email: values.email,
      list: list,
      whatsapp: "",
      confirm: 0,
      //created_at: (data.getTime() / 1000).toString(),
      origin: ad,
      naoperturbe: 0,
    };
    //console.log("COMPONENT", component);
    console.log("SALVAR LEAD", lead);

    // let message = component.data.extras?.filter(
    //   (extra) => extra.key_extra === "email"
    // )[0].value_extra;
    // //Replacing {name} and {email}
    // message = message?.replace("{name}", values.name);
    // message = message?.replace("{email}", values.email);
    // message = message?.replace("{list}", list.toString());

    // let emailmessage: Emailmessage = {
    //   title: component.data.extras?.filter(
    //     (extra) => extra.key_extra === "title_email"
    //   )[0].value_extra,
    //   message,
    // };

    // //Email 2 (D+1)
    // let messageTwo = component.data.extras?.filter(
    //   (extra) => extra.key_extra === "email_d2"
    // )[0].value_extra;
    // //Replacing {name} and {email}
    // messageTwo = messageTwo?.replace("{name}", values.name);
    // messageTwo = messageTwo?.replace("{email}", values.email);
    // messageTwo = messageTwo?.replace("{list}", list.toString());

    // let emailmessageTwo: Emailmessage = {
    //   title: component.data.extras?.filter(
    //     (extra) => extra.key_extra === "title_email_d2"
    //   )[0].value_extra,
    //   message: messageTwo,
    // };

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
