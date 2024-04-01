"use client";

import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { IssuerLogin } from "./IssuerLogin";
import { useGlobalContext } from "@/app/context/globalContext";
import { ConnectWallet } from "../web3/ConnectWallet";
import { useWallet } from "useink";



export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  // distructuring the main menu from menu object


  // const router = useRouter();
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  // get current path
  const pathname = usePathname();





  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  settings
  return (
    <header
      className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo />
        </div>



        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">


        
          <ThemeSwitcher className="mr-5" />
          <div className="lg:mr-5">
            <ConnectWallet />
          </div>
          <div>
            <IssuerLogin />
          </div>
       

        </div>
      </nav>
    </header>
  );
};

export default Header;
