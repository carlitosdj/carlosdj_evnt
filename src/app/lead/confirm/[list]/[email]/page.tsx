"use client";
import "aos/dist/aos.css";

import AOS from "aos";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "@/app/lead/loading";
import loadOrFailLeads from "@/components/helpers/loadOrFailLeads";
import Confirm from "@/components/widgets/leads/confirm/Confirm";
import { ApplicationState } from "@/store";
import { loadComponentByDescriptionRequest } from "@/store/ducks/component/actions";
import {
  confirmLeadRequest,
  loadLeadRequest,
} from "@/store/ducks/lead/actions";

const ConfirmPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  let { list, email } = params;

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    if (!component.data.id)
      dispatch(loadComponentByDescriptionRequest(list.toString()));

    if (!lead.data.id)
      dispatch(
        loadLeadRequest(decodeURIComponent(email.toString()), list.toString())
      );

    dispatch(
      confirmLeadRequest(decodeURIComponent(email.toString()), list.toString()!)
    ); //Carrega lead e confirma
  }, []);

  const lead = useSelector((state: ApplicationState) => state.lead);
  const component = useSelector((state: ApplicationState) => state.component);
  console.log("lead", lead);
  console.log("component", component);

  let loadOrFailTest = loadOrFailLeads({ component, lead });

  console.log("loadOrFailTest", loadOrFailTest);
  if (loadOrFailTest === "loading") return <Loading />;
  if (loadOrFailTest === "not found") return notFound();
  if (loadOrFailTest === "out of time") return <div>Prazo fora</div>;

  return (
    <div className="h-full bg-secondary-950">
      <Confirm lead={lead} component={component} />
    </div>
  );
};
export default ConfirmPage;
