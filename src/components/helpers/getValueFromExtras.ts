import { Extras } from "@/store/ducks/extras/types";

interface getValueFromExtrasProps {
  extras: Extras[];
  key: string;
}

const getValueFromExtras = ({ extras, key }: getValueFromExtrasProps) => {
  console.log("extras----",extras)
  let search = extras?.filter((extra) => extra.keyExtra === key)[0]
  console.log("search", search)
  if (search)
    return search.valueExtra
  else 
    return key+' not found'
};

export default getValueFromExtras;
