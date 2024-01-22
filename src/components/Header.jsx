import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header() {
  const getCurrentDate = () => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  // Call the function to get the current date
  const currentDate = getCurrentDate();

  return (
    <div className="border-solid border-b-2 border-secLight h-24 mx-5 flex flex-row items-center justify-between">
      <h1 className="text-3xl">{currentDate}</h1>
      <div className="mr-5">
        <AccountCircleIcon className="text-3xl mr-5" />
        <DarkModeIcon className="text-3xl mr-5" />
      </div>
    </div>
  );
}
