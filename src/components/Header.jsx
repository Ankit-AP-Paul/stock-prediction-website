import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { MoonIcon, SunIcon } from "./Icons";

export default function Header({
  mode,
  setMode,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  // const [mode, setMode] = useThemeSwitcher();

  const handleClick = () => {
    isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  };
  const getCurrentDate = () => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  // Call the function to get the current date
  const currentDate = getCurrentDate();

  return (
    <div className="border-solid border-b-2 border-secLight h-24 mx-5 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        {isSidebarOpen ? (
          <KeyboardDoubleArrowLeftIcon
            onClick={handleClick}
            className="text-4xl mr-5 cursor-pointer text-secDark dark:text-light hover:bg-secDark hover:text-light dark:hover:bg-light dark:hover:text-dark rounded-full"
          />
        ) : (
          <KeyboardDoubleArrowRightIcon
            onClick={handleClick}
            className="text-4xl mr-5 cursor-pointer text-secDark dark:text-light hover:bg-secDark dark:hover:bg-light dark:hover:text-dark hover:text-light rounded-full"
          />
        )}
        <h1 className="text-3xl text-dark dark:text-light">{currentDate}</h1>
      </div>
      <div className="mr-5 flex items-center">
        <AccountCircleIcon className="text-4xl mr-5 text-secDark dark:text-light " />
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={` rounded-full p-1 text-3xl mr-5 ${
            mode === "light" ? "bg-secDark text-light" : "bg-light text-secDark"
          }`}
        >
          {mode === "light" ? (
            <SunIcon className="fill-secDark" />
          ) : (
            <MoonIcon className="fill-secDark" />
          )}
        </button>
      </div>
    </div>
  );
}
