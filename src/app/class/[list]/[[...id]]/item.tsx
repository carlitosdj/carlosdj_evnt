interface Props {
  //children: ReactNode;
  name: string;
  data: string;
  selected: boolean;
}

const Item = ({ name, data, selected }: Props) => {
  return (
    <div
      className={
        selected
          ? "flex justify-center items-center rounded-sm flex-col mb-4 bg-primary-800 overflow-hidden"
          : "flex justify-center items-center rounded-sm flex-col mb-4 bg-secondary-800 overflow-hidden"
      }
    >
      <picture>
        <img
          src={"https://labiopalatina.com.br/files/puzzle.jpg"}
          alt="img"
          className=""
          //style={{ height: 150 }}
          //className="mx-auto rounded-sm neon-primary"
        />
      </picture>
      <span className="text-md pt-2">{name}</span>
      <span className="text-sm pb-4">{data}</span>
    </div>
  );
};

export default Item;
