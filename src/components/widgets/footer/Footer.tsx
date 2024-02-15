interface Props {
  copyright: string;
  owner: string
}

const Footer = ({ copyright, owner }: Props) => {
  return (
    <div className="bg-secondary-950 py-10">
      <div className="container text-primary-50 flex flex-col justify-center items-center text-sm">
        <div className="text-center">{copyright}</div>
        <div className="text-center">{owner}</div>
        {/* <div className="text-center">Privacidade | Termos de uso</div> */}
      </div>
    </div>
  );
};

export default Footer;
