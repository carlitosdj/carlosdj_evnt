"use client";

import React from "react";

import { ComponentState } from "@/store/ducks/component/types";
import { LeadState } from "@/store/ducks/lead/types";
import getValueFromExtras from "@/components/helpers/getValueFromExtras";

interface UnsubscribeProps {
  lead: LeadState;
  component: ComponentState;
}

const Unsubscribed = ({ lead, component }: UnsubscribeProps) => {
  return (
    <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_top] bg-cover">
      <div className="container grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="max-w-5xl mx-auto sm:py-24 lg:py-32 py-20">
          {/* <Progress value={progress} className="neon-primary transition-all" /> */}

          <h1
            className="font-extrabold text-5xl sm:text-5xl lg:text-5xl tracking-tight pt-5 dark:text-white"
            data-aos="zoom-out"
          >
            Você foi removido da nossa lista de comunicação
          </h1>
          <div className="py-2">
            {
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventName",
              })!
            }
          </div>
          <p
            className="mt-2 text-1xl max-w-3xl mx-auto text-slate-400"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            Olá, {lead.data.name}. Você não receberá mais comunicações de{" "}
            {
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventName",
              })!
            }.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribed;
