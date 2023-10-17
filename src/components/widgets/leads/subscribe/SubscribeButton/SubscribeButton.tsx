"use client";

import { useState } from "react";

import getValueFromExtras from "@/components/helpers/getValueFromExtras";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComponentState } from "@/store/ducks/component/types";
import { LeadState } from "@/store/ducks/lead/types";

import SubscribeForm from "../SubscribeForm/SubscribeForm";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Loading from "@/app/lead/loading";

interface SubscribeButtonProps {
  component: ComponentState;
  lead: LeadState;
  ad: string;
  list: string;
}

const SubscribeButton = ({
  component,
  lead,
  ad,
  list,
}: SubscribeButtonProps) => {
  const [open, setOpen] = useState(false);

  console.log("lead", lead);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="group text-primary-500 border border-primary-500 hover:bg-primary-800 hover:text-white active:bg-primary-600 neon-primary font-bold uppercase px-8 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100 text-sm"
          id={"btn"}
        >
          {getValueFromExtras({ extras: component.data.extras!, key: "btn" })!}
          <span className="group-hover:pl-1 text-primary-300 group-hover:text-white transition-all font-thin">
            {" ->"}
          </span>
          {/* <Loading/> */}
          {lead.loading && (
            <div className="flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
        </DialogTrigger>
        
        <DialogContent className="dark:bg-secondary-900 ">
          <DialogHeader>
            <DialogTitle className="text-start dark:text-primary-600 text-2xl">
              Entre com seus dados
            </DialogTitle>
            <DialogDescription className="text-start dark:text-white pb-4">
              Realize sua inscrição gratuita
            </DialogDescription>
            <SubscribeForm
              component={component}
              lead={lead}
              list={list}
              ad={ad}
              setOpen={setOpen}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {lead.error?.statusCode && !lead.loading && (
        <div className="flex items-center justify-center">
          <Alert
            variant={"destructive"}
            className="p-4 rounded-lg my-6 w-full bg-secondary-100"
          >
            {/* {JSON.stringify(lead.error.error)} */}
            {/* {JSON.stringify(lead.error.message)} */}
            OPS! Esse e-mail já está cadastrado em nossa base de dados. <br />
            Acesse o grupo:
            <Button variant={"neon"} id={"btn"} className="group py-8 lg:py-6">
              <Link
                href={
                  getValueFromExtras({
                    extras: component.data.extras!,
                    key: "group_link",
                  })!
                }
              >
                Clique aqui para entrar no Grupo do WhatsApp
                <span className="group-hover:pl-1 text-primary-300 group-hover:text-white transition-all font-thin">
                  {" ->"}
                </span>
              </Link>
            </Button>
            {/* {lead.error.error} */}
          </Alert>
        </div>
      )}
    </div>
  );
};
export default SubscribeButton;
