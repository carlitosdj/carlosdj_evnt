"use client";
import 'aos/dist/aos.css';

import AOS from 'aos';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/app/lead/loading';
import loadOrFailLeads from '@/components/helpers/loadOrFailLeads';
import Unsubscribe from '@/components/widgets/leads/unsubscribe/Unsubscribe';
import Unsubscribed from '@/components/widgets/leads/unsubscribe/Unsubscribed';
import { ApplicationState } from '@/store';
import { loadComponentByDescriptionRequest } from '@/store/ducks/component/actions';
import { loadLeadRequest } from '@/store/ducks/lead/actions';

const UnsubscribePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  
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
  }, [list]);

  const lead = useSelector((state: ApplicationState) => state.lead);
  const component = useSelector((state: ApplicationState) => state.component);

  let loadOrFailTest = loadOrFailLeads({ component, lead })

  if (loadOrFailTest === "loading") 
    return <Loading/>
  if (loadOrFailTest === "not found") 
    return notFound()
  if (loadOrFailTest === "out of time")
    return <div>Prazo fora</div>

  if (lead.data.naoperturbe === 1)
    return (
      <div className="h-full bg-secondary-950">
        <Unsubscribed lead={lead} component={component} />
      </div>
    );
  else
    return (
      <div className="h-full bg-secondary-950">
        <Unsubscribe lead={lead} component={component} />
      </div>
    );
};
export default UnsubscribePage;
