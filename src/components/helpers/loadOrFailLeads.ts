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
    // console.log("entrei aqui")
    if (lead.error?.error) return "not found";
    if (lead.loading) return "loading";
    if (!lead.data.id) return "loading";
  }else{
    // console.log("nao entrei")
  }

  if (component.error) return "not found";
  if (component.loading) return "loading";
  if (!component.data.id) return "loading";

  //Checa se está no prazo de acesso:
  var leadSignUpStartDate = getValueFromExtras({ extras: component.data.extras!, key: "leadSignUpStartDate" });
  // console.log('leadSignUpStartDate', component.data.extras);
  // console.log('leadSignUpStartDate', leadSignUpStartDate);
  //inscricao_inicio = "26/07/2023";

  var leadSignUpEndDate = getValueFromExtras({ extras: component.data.extras!, key: "leadSignUpEndDate" });
  // console.log('inscricao_fim', leadSignUpEndDate);
  //inscricao_fim = "27/07/2023";

  if (checkDateRange({ initialDate: leadSignUpStartDate!, finalDate: leadSignUpEndDate! }) === "Invalid Date")
    return "loading"

  if (checkDateRange({ initialDate: leadSignUpStartDate!, finalDate: leadSignUpEndDate! }) === false)
    return "out of time";

  return "pass";
}

export default loadOrFailLeads
