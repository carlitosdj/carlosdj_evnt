"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComponentState } from "@/store/ducks/component/types";
import { notDisturbLeadRequest } from "@/store/ducks/lead/actions";
import { LeadState } from "@/store/ducks/lead/types";

interface UnsubscribeProps {
  lead: LeadState;
  component: ComponentState;
}

const Unsubscribe = ({ lead, component }: UnsubscribeProps) => {
  const [open, setOpen] = useState(false);
  //const [canceled, setCanceled] = useState<boolean>(false);
  const dispatch = useDispatch();
  const params = useParams();
  let { list, email } = params;

  const naoPerturbe = () => {
    console.log("NOT DISTURBING", decodeURIComponent(email.toString()));
    dispatch(
      notDisturbLeadRequest(
        decodeURIComponent(email.toString()),
        list.toString()
      )
    );
  };

  return (
    <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_top] bg-cover">
      <div className="container grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="max-w-5xl mx-auto sm:py-24 lg:py-32 py-20">
          {/* <Progress value={progress} className="neon-primary transition-all" /> */}

          <h1
            className="font-extrabold text-5xl sm:text-5xl lg:text-5xl tracking-tight pt-5 dark:text-white"
            data-aos="zoom-out"
          >
            Cancelar inscrição
          </h1>
          <div className="py-2">{component.data.parent?.name}</div>
          <p
            className="mt-2 text-1xl max-w-3xl mx-auto text-slate-400"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            Olá {lead.data.name}, você está prestes a ser removido desta lista. Lamentamos qualquer equívoco e estamos constantemente buscando melhorias. Se desejar ser excluído da nossa lista, clique no botão abaixo.
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className="
                group
                text-primary-500 border
                border-primary-500
                hover:bg-primary-800
                hover:text-white
                active:bg-primary-600 
                neon-primary
                font-bold uppercase 
                px-8 
                py-3 
                rounded-lg
                outline-none 
                focus:outline-none  
                mr-1
                mb-1 
                ease-linear
                transition-all
                duration-100
                w-full
                mt-6"
              id={"btn"}
            >
              Quero sair dessa lista de comunicação
              <span className="group-hover:pl-1 text-primary-300 group-hover:text-white transition-all font-thin">
                {" ->"}
              </span>
            </DialogTrigger>
            <DialogContent className="dark:bg-secondary-900 ">
              <DialogHeader>
                <DialogTitle className="text-start dark:text-primary-600 text-2xl">
                  Atenção
                </DialogTitle>
                <DialogDescription className="text-start dark:text-white pb-4">
                  Essa ação é irreversível e não há como desfazer essa
                  alteração.
                </DialogDescription>
                <DialogFooter>
                  <Button
                    asChild
                    variant={"neon"}
                    onClick={() => {
                      naoPerturbe();
                    }}
                    id={"btn"}
                  >
                    <div>Confirmar</div>
                  </Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
