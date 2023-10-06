"use client";

import { useState } from 'react';

import getValueFromExtras from '@/components/helpers/getValueFromExtras';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { ComponentState } from '@/store/ducks/component/types';
import { LeadState } from '@/store/ducks/lead/types';
import { MeState } from '@/store/ducks/me/types';
import { DialogClose } from '@radix-ui/react-dialog';

import SubscribeForm from '../SubscribeForm/SubscribeForm';

interface SubscribeButtonProps {
  component: ComponentState;
  me: MeState;
  ad: string;
  list: string;
}

const SubscribeButton = ({ component, me, ad, list }: SubscribeButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
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
          duration-100"
          id={"btn"}
        >
          Quero entrar
          <span className="group-hover:pl-1 text-primary-300 group-hover:text-white transition-all font-thin">
            {" ->"}
          </span>
        </DialogTrigger>
        <DialogContent className="dark:bg-secondary-900 ">
          <DialogHeader>
            <DialogTitle className="text-start dark:text-primary-600 text-2xl">
              Entre com seus dados (SALES)
            </DialogTitle>
            <DialogDescription className="text-start dark:text-white pb-4">
              Realize sua inscrição gratuita
            </DialogDescription>
            <SubscribeForm
              component={component}
              me={me}
              list={list}
              ad={ad}
              setOpen={setOpen}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {me.loading && "Carregando..."}
      {me.error && !me.loading && (
        <div className="flex items-center justify-center">
          <div className="neon-rose p-4 rounded-lg my-6 w-full">
            Error:
            {JSON.stringify(me.error)}
            {/* {lead.error.error} */}
          </div>
        </div>
      )}
    </div>
  );
};
export default SubscribeButton;
