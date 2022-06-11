import { useContext } from "react";
import { ThemeContext } from "../pages/_app";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full pt-8 py-3 mx-auto">
      <h1 className={`text-5xl font-bold text-center ${theme.header}`}>
        {title}
      </h1>
    </div>
  );
};

export default Header;
