"use client";
import getValueFromExtras from "@/components/helpers/getValueFromExtras";
import { ApplicationState } from "@/store";
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./item";
import Loading from "../../loading";
import loadOrFailClass from "@/components/helpers/loadOrFailClass";
import Image from "next/image";


interface Props {
  //children: ReactNode;
}

declare global {
  interface Window {
    FB: any;
    track: any;
  }
}

const Class = ({}: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  let { list, id } = params;
  if (!id) id = "aula01";

  const [progress, setProgress] = useState<number>(0);
  const component = useSelector((state: ApplicationState) => state.component);

  useEffect(() => {
    //document.title = 'Evento'
    dispatch(loadComponentByDescriptionRequest(list.toString()));

    // try {
    //   window.FB.XFBML.parse();
    // } catch (error) {
    //   console.log("XFBML error", error);
    // }

    // if (typeof window !== 'undefined') {
    //   if (window.track != null) {
    //     window.track('Blog')
    //   }
    // }
  }, [list]);

  let loadOrFailTest = loadOrFailClass({ component });
  //if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  //console.log("component", component);

  let datainicio = getValueFromExtras({
    extras: component.data.extras!,
    key: "data_inicio",
  });
  let datafim = getValueFromExtras({
    extras: component.data.extras!,
    key: "data_fim",
  });

  let cpl1 = getValueFromExtras({
    extras: component.data.extras!,
    key: "cpl1",
  });
  let data_cpl1 = getValueFromExtras({
    extras: component.data.extras!,
    key: "data_cpl1",
  });
  let activecpl1 = true;

  let cpl2 = getValueFromExtras({
    extras: component.data.extras!,
    key: "cpl2",
  });
  let data_cpl2 = getValueFromExtras({
    extras: component.data.extras!,
    key: "data_cpl2",
  });
  let activecpl2 = true;

  let cpl3 = getValueFromExtras({
    extras: component.data.extras!,
    key: "cpl3",
  });
  let data_cpl3 = getValueFromExtras({
    extras: component.data.extras!,
    key: "data_cpl3",
  });
  let activecpl3 = true;

  let cpl4 = getValueFromExtras({
    extras: component.data.extras!,
    key: "cpl4",
  });
  let data_cpl4 = getValueFromExtras({
    extras: component.data.extras!,
    key: "data_cpl4",
  });
  let activecpl4 = true;

  const renderSwitch = (id: string) => {
    switch (id) {
      case "aula01":
        if (activecpl1) {
          return (
            <iframe
              title="aula1"
              className="absolute inset-0 w-full h-full"
              src={cpl1}
              //width={800}
              //height={564}
              frameBorder={0}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          );
        } else {
          return (
            <div className="text-danger fs-2 text-center pt-3">
              {" "}
              Aula disponível em: {data_cpl1}
            </div>
          );
        }

      case "aula02":
        if (activecpl2) {
          return (
            <iframe
              title="aula2"
              className="absolute inset-0 w-full h-full"
              src={cpl2}
              //width={800}
              //height={564}
              frameBorder={0}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          );
        } else {
          return (
            <div className="text-danger fs-2 text-center pt-3">
              {" "}
              Aula disponível em: {data_cpl2}
            </div>
          );
        }

      case "aula03":
        if (activecpl3) {
          return (
            <iframe
              title="aula3"
              className="absolute inset-0 w-full h-full"
              src={cpl3}
              //width={800}
              //height={564}
              frameBorder={0}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          );
        } else {
          return (
            <div className="text-danger fs-2 text-center pt-3">
              {" "}
              Aula disponível em: {data_cpl3}
            </div>
          );
        }

      case "aula04":
        if (activecpl4) {
          return (
            <iframe
              title="aula3"
              className="absolute inset-0 w-full h-full"
              src={cpl4}
              //width={800}
              //height={564}
              frameBorder={0}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          );
        } else {
          return (
            <div className="text-danger fs-2 text-center pt-3">
              {" "}
              Aula disponível em: {data_cpl4}
            </div>
          );
        }

      default:
        return <div>Aula não encontrada</div>;
    }
  };

  return (
    <div className="bg-[url('/imgs/hero-illustration.svg')] bg-no-repeat bg-[center_top] bg-cover min-h-screen">
      <div className="grid gap-4">
        <div className="max-w-6xl mx-auto sm:py-14">
          <div className="h-full">
            <div className="">
              <div className="pt-10 md:pt-0 flex justify-center items-center flex-col">
                <picture>
                  <img
                    src={`https://violaofeeling.com.br/files/${getValueFromExtras(
                      {
                        extras: component.data.extras!,
                        key: "img",
                      }
                    )!}`}
                    alt="img"
                    className="w-96"
                    //style={{ height: 150 }}
                    //className="mx-auto rounded-sm neon-primary"
                  />
                </picture>

                <span className="font-extralight text-sm mt-1">
                  {datainicio} a {datafim}
                </span>
              </div>

              <div className="px-2">
                <div className="flex justify-around gap-2 py-6">
                  <Link
                    href={`/class/${list}/aula01`}
                    //onClick={() => setProgress(25)}
                  >
                    <Item
                      name="Aula 1"
                      data={data_cpl1!}
                      selected={id.toString() === "aula01"}
                    />
                  </Link>
                  <Link
                    href={`/class/${list}/aula02`}
                    //onClick={() => setProgress(50)}
                  >
                    <Item
                      name="Aula 2"
                      data={data_cpl2!}
                      selected={id.toString() === "aula02"}
                    />
                  </Link>
                  <Link
                    href={`/class/${list}/aula03`}
                    //onClick={() => setProgress(75)}
                  >
                    <Item
                      name="Aula 3"
                      data={data_cpl3!}
                      selected={id.toString() === "aula03"}
                    />
                  </Link>
                  <Link
                    href={`/class/${list}/aula04`}
                    //onClick={() => setProgress(100)}
                  >
                    <Item
                      name="Aula 4"
                      data={data_cpl4!}
                      selected={id.toString() === "aula04"}
                    />
                  </Link>
                </div>

                {loadOrFailTest === "loading" ? (
                  <Loading />
                ) : (
                  <div className="">
                    {/* <h3 className='text-center pt-4'>Clique no botão play para assistir a aula:</h3> */}

                    <div
                      className="relative rounded-sm overflow-hidden"
                      style={{ paddingTop: "56.25%" }}
                    >
                      {renderSwitch(id.toString()!)}
                    </div>
                  </div>
                )}
              </div>
              {loadOrFailTest === "loading" ? (
                <Loading />
              ) : (
                <div className="px-2 text-center">
                  <h1 className="pt-8 text-2xl font-bold">
                    Gostou dessa aula?
                  </h1>
                  <h4 className="font-extralight text-sm">
                    Deixe um comentário ou pergunta abaixo, vou fazer o máximo
                    para responder você.
                  </h4>
                  <br />
                  <div className="bg-white p-2 rounded-sm">
                    <div
                      className="fb-comments"
                      data-href="https://labiopalatina.com.br/blog/imersao-abr22/aula01"
                      data-width="100%"
                      data-numposts="25"
                      data-order-by="reverse_time"
                    ></div>
                  </div>
                  <br />
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;
