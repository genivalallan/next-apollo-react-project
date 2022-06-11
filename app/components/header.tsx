interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="w-full pt-8 mx-auto py-3">
      <h1 className="text-5xl text-center text-sky-600 font-bold drop-shadow-md">
        {title}
      </h1>
    </div>
  );
};

export default Header;
