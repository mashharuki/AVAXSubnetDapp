import { ReactNode } from "react";
import AdminButton from "../Button/AdminButton";
import ConnectWalletButton from "../Button/ConnectWalletButton";
import NavButton from "../Button/NavButton";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <header className="p-4 ">
        <nav className="xl:flex lg:flex md:flex justify-between mx-auto container items-center">
          <div className="xl:flex lg:flex md:flex items-center ">
            <div className="text-4xl"> AVAX Subnet </div>
            <div className="xl:flex lg:flex md:flex space-x-12 ml-8">
              <NavButton to="/" name="Home" />
              <NavButton to="/IssueBill" name="Issue Bill" />
              <NavButton to="/ViewBills" name="View Bills" />
              <AdminButton />
            </div>
          </div>
          <ConnectWalletButton />
        </nav>
      </header>
      <div>{children}</div>
    </div>
  );
}
