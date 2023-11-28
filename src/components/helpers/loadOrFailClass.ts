import { ComponentState } from "@/store/ducks/component/types";
import getValueFromExtras from "./getValueFromExtras";
import checkDateRange from "./checkDateRange";
import { LeadState } from "@/store/ducks/lead/types";

interface loadOrFailClassProps {
    component: ComponentState;
    //lead?: LeadState
}

const loadOrFailClass = ({ component }: loadOrFailClassProps) => {

  // if (lead) {
  //   if (lead.error?.error) return "not found";
  //   if (lead.loading) return "loading";
  //   if (!lead.data.Id) return "loading";
  // }

  if (component.error) return "not found";
  if (component.loading) return "loading";
  if (!component.data.id) return "loading";

  //Checa se está no prazo de acesso:
  var eventStartDate = getValueFromExtras({ extras: component.data.extras!, key: "eventStartDate" });
  //inscricao_inicio = "26/07/2023";

  var eventEndDate = getValueFromExtras({ extras: component.data.extras!, key: "eventEndDate" });
  //inscricao_fim = "27/07/2023";

  if (checkDateRange({ initialDate: eventStartDate!, finalDate: eventEndDate! }) === "Invalid Date")
    return "loading"

  if (checkDateRange({ initialDate: eventStartDate!, finalDate: eventEndDate! }) === false)
    return "out of time";

  return "pass";
}

export default loadOrFailClass
