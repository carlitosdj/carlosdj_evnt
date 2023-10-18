import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex items-center flex-col">
        <div>Carregando...</div>
        <Loader2 className="m-1 h-4 w-4 animate-spin" />
      </div>
    </div>
  );
};
export default Loading;
