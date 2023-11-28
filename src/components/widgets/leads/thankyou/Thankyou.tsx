"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import getValueFromExtras from "@/components/helpers/getValueFromExtras";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ComponentState } from "@/store/ducks/component/types";
import { Lead, LeadState } from "@/store/ducks/lead/types";

interface ThankyouProps {
  lead: LeadState;
  component: ComponentState;
}

const Thankyou = ({ lead, component }: ThankyouProps) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(75);
  }, [progress]);

  return (
    <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_top] bg-cover">
      <div className="container grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="max-w-5xl mx-auto sm:py-24 lg:py-32 py-20">
          <Progress value={progress} className="neon-primary transition-all" />
          <h1
            className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight pt-5 text-primary-50 "
            data-aos="zoom-out"
          >
            Faltam 2 passos
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
            Passo 1
          </h2>
          <p
            className="mt-2 text-1xl max-w-3xl mx-auto text-slate-400"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            Olá, {lead.data.name}. Clique no botão abaixo e participe do grupo
            de whatsapp para receber todas as informações de acesso e os
            materiais durante o evento.
          </p>

          <Button variant={"neon"} id={"btn"} className="group py-8 lg:py-6">
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

          <h2
            className="font-extrabold text-2xl sm:text-2xl lg:text-2xl tracking-tight pt-5 dark:text-white"
            data-aos="zoom-out"
            data-aos-delay="300"
          >
            Passo 2
          </h2>
          <p
            className="mt-2 text-1xl max-w-3xl mx-auto text-slate-400"
            data-aos="zoom-out"
            data-aos-delay="400"
          >
            Acabei de te enviar um e-mail na sua caixa de entrada, nela possui
            uma pesquisa..
          </p>
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

export default Thankyou;
