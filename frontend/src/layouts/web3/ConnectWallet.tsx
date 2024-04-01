import React, { useEffect } from "react";
import Link from "next/link";
import { useInstalledWallets, useUninstalledWallets, useWallet } from 'useink';
import { useGlobalContext } from "@/app/context/globalContext";


export interface WalletList {
  name: string;
  extensionName: string;
  url: string;
  installed?: boolean;
}

export interface AccountList {
  name: string | undefined;
  address: string;
  source: string;
  active: boolean;
}

export const ConnectWallet = () => {
  const { account, accounts, setAccount, connect, disconnect} = useWallet();
  const installedWallets = useInstalledWallets();
  const uninstalledWallets = useUninstalledWallets();
  const {connectLoading, setConnectLoading, setIssuerData, setWalletAddress} = useGlobalContext();

  const installedWalletsData: WalletList[] = installedWallets.map(({title, extensionName, installUrl}) => ({
    name: title,
    url: installUrl,
    extensionName: extensionName,
    installed: true,
  }))

  const uninstalledWalletsData: WalletList[] = uninstalledWallets.map(({title, extensionName, installUrl}) => ({
    name: title,
    url: installUrl,
    extensionName: extensionName,
    installed: false
  }))

  const allWallets: WalletList[] = installedWalletsData.concat(uninstalledWalletsData)

  useEffect(()=>
    setWalletAddress(account?account.address:'') 
  ,[account?.address])




  if (!account) {
  return (
        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
            <React.Fragment key={'wallet-map'}>
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`btn btn-outline-primary btn-sm hidden lg:inline-flex items-center cursor-pointer w-40 justify-center`}
                  >
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">{connectLoading ? "Loading..." : "Connect Wallet"}</p>
                    {!connectLoading && <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>}
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {allWallets.map((child: WalletList, i: number) => (
                      <li className="w-32 nav-dropdown-item" key={`children-${i}`}>
                        {child.installed ? (
                          <span
                            className="nav-dropdown-link block cursor-pointer"
                            onClick={() => connect(child.extensionName)}
                          >
                            {child.name}
                          </span>
                        ) : (
                          <Link
                            href={child.url}
                            className={`nav-dropdown-link block opacity-50 active cursor-pointer`}
                          >
                            {child.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
            </React.Fragment>
          </ul>
    )
  } else {
  
    const disconnectWallet=()=>{
      disconnect();
      setWalletAddress('');
    }

  return (
      <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
            <React.Fragment key={'wallet-map'}>
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`btn btn-outline-primary btn-sm hidden lg:inline-flex items-center cursor-pointer w-40 justify-center`}
                  >
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">{connectLoading ? "Loading..." : `${account.name}`}</p>
                    {!connectLoading && <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>}
                  </span>
                  {!connectLoading &&
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {accounts && accounts.map((child) => (
                      (account !== child) &&
                      <li className="w-32 nav-dropdown-item" key={`children-${Math.random()}`}>
                          <span
                            className="nav-dropdown-link block cursor-pointer"
                            onClick={() => (setAccount(child))}
                          >
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis">{child.name}</p>
                          </span>
                      </li>
                    ))}
                    <li className="w-32 nav-dropdown-item" key={`children-${Math.random()}`}>
                          <span
                            className="nav-dropdown-link block cursor-pointer"
                            onClick={disconnectWallet}
                          >
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis">Disconnect</p>
                          </span>
                    </li>
                  </ul>}
                </li>
            </React.Fragment>
          </ul>
  )
  }

}
