import { ComponentState } from "@/store/ducks/component/types";
import getValueFromExtras from "./getValueFromExtras";
import checkDateRange from "./checkDateRange";
import { LeadState } from "@/store/ducks/lead/types";

interface loadOrFailLeadsProps {
    component: ComponentState;
    lead?: LeadState
}

const loadOrFailLeads = ({ component, lead }: loadOrFailLeadsProps) => {

  if (lead) {
    if (lead.error?.error) return "not found";
    if (lead.loading) return "loading";
    if (!lead.data.Id) return "loading";
  }

  if (component.error) return "not found";
  if (component.loading) return "loading";
  if (!component.data.id) return "loading";

  //Checa se está no prazo de acesso:
  var inscricao_inicio = getValueFromExtras({ extras: component.data.extras!, key: "inscricao_inicio" });
  //inscricao_inicio = "26/07/2023";

  var inscricao_fim = getValueFromExtras({ extras: component.data.extras!, key: "inscricao_fim" });
  //inscricao_fim = "27/07/2023";

  if (checkDateRange({ initialDate: inscricao_inicio!, finalDate: inscricao_fim! }) === "Invalid Date")
    return "loading"

  if (checkDateRange({ initialDate: inscricao_inicio!, finalDate: inscricao_fim! }) === false)
    return "out of time";

  return "pass";
}

export default loadOrFailLeads
