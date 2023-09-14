interface Props {
  copyright: string;
  owner: string
}

const Footer = ({ copyright, owner }: Props) => {
  return (
    <div className="bg-secondary-950 py-10">
      <div className="container text-primary-100 flex flex-col justify-center items-center text-sm">
        <div>{copyright}</div>
        <div>{owner}</div>
        <div>Privacidade | Termos de uso</div>
      </div>
    </div>
  );
};

export default Footer;
