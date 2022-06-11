import { useContext } from "react";
import { ThemeContext } from "../pages/_app";

const Loading: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="w-1/2 mx-auto my-5">
      <p className={`w-full py-2 text-center rounded-lg text-sm font-source-code-pro font-bold drop-shadow-md ${theme.loading}`}>
        &#10227; Carregando...
      </p>
    </div>
  );
};

export default Loading;
