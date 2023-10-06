import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ComponentState } from '@/store/ducks/component/types';
import { createLeadRequest } from '@/store/ducks/lead/actions';
import { Emailmessage, Lead, LeadState } from '@/store/ducks/lead/types';
import { createMeRequest } from '@/store/ducks/me/actions';
import { MeState } from '@/store/ducks/me/types';
import { User } from '@/store/ducks/users/types';
import { zodResolver } from '@hookform/resolvers/zod';

interface SubscribeFormProps {
  component: ComponentState;
  me: MeState;
  list: string;
  ad: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SubscribeForm = ({
  component,
  me,
  list,
  ad,
  setOpen,
}: SubscribeFormProps) => {
  // const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Nome precisa ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
    whatsapp: z.string().min(2, {
      message: "Whatsapp precisa ter pelo menos 2 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // if (name && email && whatsapp && terms) {
    // if (typeof window !== 'undefined') {
    //   if (window.track != null) {
    //     window.track('InitiateCheckout')
    //   }
    // }

    //var data = new Date();
    const user: User = {
      email: values.email,
      // password_hash: "not_authorized",
      // auth_key: "not_authorized",
      // registration_ip: "0",
      name: values.name,
      whatsapp: values.whatsapp,
    };
    dispatch(createMeRequest(user));
    //}
    // setError("Preencha os dados corretamente.")

    setOpen(false);
  };

  return (
    <div className="text-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-start">Nome completo</FormLabel>
                <FormControl className="border-0">
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-start">E-mail</FormLabel>
                <FormControl className="border-0">
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-start">Whatsapp</FormLabel>
                <FormControl className="border-0">
                  <Input
                    placeholder="Digite seu número de Whatsapp"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button
            className="
            w-full
            dark:bg-secondary-950
            dark:text-primary-400 
            dark:hover:bg-primary-900
            dark:hover:text-white
            dark:active:bg-secondary-800 
            border-0
            font-bold uppercase 
            px-8 
            py-3 
            rounded 
            outline-none 
            focus:outline-none
            mr-1
            mb-1 
            ease-linear
            transition-all
            duration-100
            neon-primary
            "
            type="submit"
            id={"btn"}
          >
            Inscrever
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubscribeForm;
