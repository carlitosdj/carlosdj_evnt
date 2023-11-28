"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import getValueFromExtras from "@/components/helpers/getValueFromExtras";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ComponentState } from "@/store/ducks/component/types";
import { LeadState } from "@/store/ducks/lead/types";

interface ThankyouProps {
  lead: LeadState;
  component: ComponentState;
}

const Confirm = ({ lead, component }: ThankyouProps) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(100);
  }, [progress]);

  return (
    <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_top] bg-cover">
      <div className="container grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="max-w-5xl mx-auto sm:py-24 lg:py-32 py-20">
          <Progress value={progress} className="neon-primary transition-all" />
          <h1
            className="font-extrabold text-4xl sm:text-5xl lg:text-5xl tracking-tight pt-5 dark:text-white"
            data-aos="zoom-out"
          >
            Inscrição confirmada
          </h1>
          <div className="py-2">
            {
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventName",
              })!
            }
          </div>
          <h2
            className="font-extrabold text-2xl sm:text-2xl lg:text-2xl tracking-tight pt-5 dark:text-white"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            Informações adicionais
          </h2>
          <p
            className="mt-2 text-1xl max-w-3xl mx-auto text-slate-400"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            Olá, {lead.data.name}. Sua inscrição está realizada com sucesso.
            Aguardo você no evento:
            {" " +
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventName",
              })!}{" "}
            {
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventStartDate",
              })!
            }
            {" a "}
            {
              getValueFromExtras({
                extras: component.data.extras!,
                key: "eventEndDate",
              })!
            }
          </p>

          <Button variant={"neon"} id={"btn"} className="group py-8 lg:py-6 mb-4">
            <Link
              href={
                getValueFromExtras({
                  extras: component.data.extras!,
                  key: "eventGroupLink",
                })!
              }
            >
              Clique aqui para entrar no Grupo do WhatsApp
              <span className="group-hover:pl-1 text-primary-300 group-hover:text-white transition-all font-thin">
                {" ->"}
              </span>
            </Link>
          </Button>
              
          <p
            className="mt-2 text-1xl max-w-3xl mx-auto text-slate-400"
            data-aos="zoom-out"
            data-aos-delay="500"
          >
            O nosso objetivo é fazer com que você aproveite ao máximo esse
            evento! Queremos ouvir de você quais são as suas principais
            dificuldades e necessidades para garantir que esse evento vai
            superar suas expectativas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
