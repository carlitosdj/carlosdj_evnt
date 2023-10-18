interface Props {
  url: string;
}

const Comments = ({ url }: Props) => {
  console.log("RENDER COMMENTS");
  return (
    <div className="text-center">
      <h1 className="pt-8 md:pt-0 text-2xl font-bold">Gostou dessa aula?</h1>
      <h4 className="font-extralight text-sm">
        Deixe um comentário ou pergunta abaixo, vou fazer o máximo para
        responder você.
      </h4>
      <br />
      <div className="bg-white p-2 rounded-sm">
        <div
          className="fb-comments w-full"
          data-href={url}
          data-width=""
          data-numposts="5"
          data-width="100%"
          data-order-by="reverse_time"
        ></div>
      </div>
    </div>
  );
};

export default Comments;
