import { ComponentState } from "@/store/ducks/component/types";
import getValueFromExtras from "./getValueFromExtras";
import checkDateRange from "./checkDateRange";
import { MeState } from "@/store/ducks/me/types";

interface loadOrFailSalesProps {
    component: ComponentState;
    me?: MeState
}

const loadOrFailSales = ({ component, me }: loadOrFailSalesProps) => {

  if (me) {
    if (me.error) return "loading";
    if (me.loading) return "loading";
    //if (!me.me.id) return "loading";
  }

  if (component.error) return "not found";
  if (component.loading) return "loading";
  if (!component.data.id) return "loading";

  //Checa se está no prazo de acesso:
  var inscricao_inicio = getValueFromExtras({ extras: component.data.extras!, key: "cartOpenDate" });
  //inscricao_inicio = "26/07/2023";

  var inscricao_fim = getValueFromExtras({ extras: component.data.extras!, key: "cartCloseDate" });
  //inscricao_fim = "27/07/2023";

  if (checkDateRange({ initialDate: inscricao_inicio!, finalDate: inscricao_fim! }) === "Invalid Date")
    return "loading"

  if (checkDateRange({ initialDate: inscricao_inicio!, finalDate: inscricao_fim! }) === false)
    return "out of time";

  return "pass";
}

export default loadOrFailSales
