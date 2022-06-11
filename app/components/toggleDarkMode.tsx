import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";

const ToggleDarkMode: React.FC = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed w-fit h-12 top-8 left-8 z-10">
      <Image src="/dark_mode_sun_icon.svg" alt="" width={28} height={28} />
      <label className="relative inline-block w-14 h-7 mx-2">
        <input type="checkbox" className="hidden w-0 h-0 peer" />
        <span
          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-neutral-300 rounded-full before:absolute before:content-[''] before:w-5 before:h-5 before:bottom-1 before:left-1 before:bg-white before:ease-in before:duration-200 peer-checked:bg-neutral-600 peer-focus:shadow-md peer-checked:before:translate-x-7 before:rounded-full"
          onClick={toggleTheme}
        ></span>
      </label>
      <Image src="/dark_mode_moon_icon.svg" alt="" width={28} height={28} />
    </div>
  );
};

export default ToggleDarkMode;
