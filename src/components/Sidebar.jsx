import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const SidebarItem = ({ name, Icon, classes, activate = false }) => {
  return (
    <div className={`${classes} text-sm flex items-center w-full my-2 h-12`}>
      <div
        className={`  h-full w-[2%] bg-acc2 mr-5 ${
          activate ? "opacity-1" : "opacity-0"
        }`}
      />
      <Icon className="mr-3 text-sm" />
      <div className="w-[80%]">{name}</div>
      <ArrowRightIcon className="w-[15%]" />
    </div>
  );
};

const Sidebar = ({ classes }) => {
  return (
    <div className={`${classes} bg-alt text-light dark:bg-secDark`}>
      <h1 className="h-24 flex items-center justify-center text-5xl tracking-widest w-full border-b-2 border-solid border-secLight">
        Stoki
      </h1>
      <div />
      <SidebarItem
        name="Dashboard"
        Icon={DashboardIcon}
        classes="mt-8"
        activate={true}
      />
      <div>
        <h2 className="text-md font-bold ml-7 mt-8">MARKET DATA</h2>
        <SidebarItem name="Company Performance" Icon={TimelineIcon} />
        <SidebarItem name="News" Icon={NewspaperIcon} />
      </div>
      <div className="border-b-2 border-solid border-secLight pb-7">
        <h2 className="text-md font-bold ml-7 mt-8">OTHERS</h2>
        <SidebarItem name="About" Icon={InfoIcon} />
        <SidebarItem name="Contact" Icon={ContactPageIcon} />
      </div>
      <div className="w-full mt-10 flex flex-row items-center text-xl justify-center">
        <AccountCircleIcon className="text-4xl" />
        <div className="mx-3">John Doe</div>
      </div>
    </div>
  );
};

export default Sidebar;
