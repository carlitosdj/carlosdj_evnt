import { z } from "zod";

const formSchemaData = z.object({
  name: z.string().min(2, {
    message: "Nome precisa ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({ message: "Endereço de e-mail inválido" }),
  whatsapp: z.string().min(2, {
    message: "Whatsapp precisa ter pelo menos 2 caracteres.",
  }),
  password: z.string().min(2, {
    message: "Senha precisa ter pelo menos 2 caracteres.",
  }),
  cpf: z.string().min(2, {
    message: "CPF precisa ter pelo menos 2 caracteres.",
  }),
  cep: z.string().min(2, {
    message: "CEP precisa ter pelo menos 2 caracteres.",
  }),
  address: z.string().min(2, {
    message: "Endereço precisa ter pelo menos 2 caracteres.",
  }),
  number: z.string().min(2, {
    message: "Número precisa ter pelo menos 2 caracteres.",
  }),
  bairro: z.string().min(2, {
    message: "Bairro precisa ter pelo menos 2 caracteres.",
  }),
  estado: z.string().min(2, {
    message: "Estado precisa ter pelo menos 2 caracteres.",
  }),
  cidade: z.string().min(2, {
    message: "Cidade precisa ter pelo menos 2 caracteres.",
  }),
});

export default formSchemaData;
