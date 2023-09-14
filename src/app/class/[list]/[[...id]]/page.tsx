"use client";
import getValueFromExtras from "@/components/helpers/getValueFromExtras";
import { ApplicationState } from "@/store";
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./item";
import Loading from "../../loading";
import loadOrFailClass from "@/components/helpers/loadOrFailClass";

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
  if (loadOrFailTest === "loading") return <Loading />;
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

      // case 'aula04':
      //   if (activecpl4) {
      //     return (
      //       <div className='w-100 pt-4'>
      //         <div className='embed-responsive embed-responsive-16by9'>
      //           <div>
      //             <iframe
      //               title='aula4'
      //               className='embed-responsive-item'
      //               src={cpl4}
      //               width={640}
      //               height={564}
      //               frameBorder={0}
      //               allow='autoplay; fullscreen'
      //               allowFullScreen
      //             />
      //           </div>
      //         </div>
      //       </div>
      //     )
      //   } else {
      //     return (
      //       <div className='text-danger fs-2 text-center pt-3'>Aula disponível em: {datecpl4}</div>
      //     )
      //   }

      default:
        return <div>Aula não encontrada</div>;
    }
  };

  return (
    <div className="bg-gradient-to-b from-secondary-800 to-secondary-950 ">
      <div className="md:container ">
        {/* Class {list} {id}
      {getValueFromExtras({
        extras: component.data.extras!,
        key: "cpl1",
      })} */}

        <div className="h-20 flex justify-center items-center text-center text-white">
          Logo
          <br />
          {datainicio} a {datafim}
        </div>

        <div className="grid grid-cols-6 gap-6 ">
          <div className="justify-around gap-4 col-span-1 ">
            <Link href={`/class/${list}/aula01`}>
              <Item
                name="Aula 1"
                data={data_cpl1!}
                selected={id.toString() === "aula01"}
              />
            </Link>
            <Link href={`/class/${list}/aula02`}>
              <Item
                name="Aula 2"
                data={data_cpl2!}
                selected={id.toString() === "aula02"}
              />
            </Link>
            <Link href={`/class/${list}/aula03`}>
              <Item
                name="Aula 3"
                data={data_cpl3!}
                selected={id.toString() === "aula03"}
              />
            </Link>
          </div>

          {loadOrFailTest === "loading" ? (
            <Loading />
          ) : (
            <div className="align-items-center col-span-5">
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
          <div className="text-center">
            <h4>Gostou dessa aula?</h4>
            <h4>
              Deixe um comentário ou pergunta abaixo, vou fazer o máximo para
              responder você.
            </h4>
            <br />
            <div className="bg-white p-2">
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
  );
};

export default Class;
