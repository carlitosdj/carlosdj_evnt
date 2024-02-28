import { SvgIconTest } from "./SvgIconTest";

interface Props {
  title: string;
  description: string;
  delay?: string;
}

const ItemTitleSubtitle = ({ title, description, delay }: Props) => {
  return (
    <div
      className="w-full"
      //data-aos="zoom-out"
      //data-aos-delay={delay ? delay : "0"}
    >
      <div className="flex justify-center">
        <SvgIconTest />
      </div>
      <div className="text-2xl flex justify-center align-middle py-4 font-bold tracking-tight">
        {title}
      </div>
      <div className="text-1xl max-w-3xl mx-auto text-slate-900 dark:text-primary-50/75">
        {description}
      </div>
    </div>
  );
};

export default ItemTitleSubtitle;
