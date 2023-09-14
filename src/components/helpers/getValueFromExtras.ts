import { Extras } from "@/store/ducks/extras/types";

interface getValueFromExtrasProps {
  extras: Extras[];
  key: string;
}

const getValueFromExtras = ({ extras, key }: getValueFromExtrasProps) => {
  //console.log("extras",extras)
  let search = extras?.filter((extra) => extra.key_extra === key)[0]
  if (search)
    return search.value_extra
  else 
    return key+' not found'
};

export default getValueFromExtras;
