import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Props {}

const CartItems = ({}: Props) => {
  return (
    <>
      <div className="pb-4">Carrinho</div>
      <Card className="w-full bg-secondary-900/80 ">
        <CardHeader>Itens</CardHeader>
        <CardContent>
          <div className="flex justify-between py-2">
            <div>
              <div className="text-md text-zinc-300">
                Item 1
              </div>
              <div className="text-xs text-zinc-500">Descrição item 1</div>
            </div>
            <div className="text-sm line-through text-zinc-500">R$ 1997,90</div>
          </div>
          {/* <div className="flex justify-between py-2">
            <div>
              <div className="text-md text-zinc-300">
                Item 2
              </div>
              <div className="text-xs text-zinc-500">Descrição item 2</div>
            </div>
            <div className="text-sm line-through text-zinc-500">R$ 498,90</div>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-between">
        
              <div className="text-md text-zinc-300">
                Total
              </div>
              
           
            <div className="text-sm text-zinc-500 right-0">R$ 498,90</div>
          
        </CardFooter>
      </Card>
    </>
  );
};

export default CartItems;
