import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { useContext } from "react";

export default function ConnectWalletButton() {
  const [currentAccount, connectWallet] = useContext(CurrentAccountContext);

  return (
    <div>
      {currentAccount == undefined ? (
        <div
          className="px-2 py-2 rounded-md w-max self-center
        bg-slate-400 text-white hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg duration-300"
          onClick={connectWallet}
        >
          Connect to wallet
        </div>
      ) : (
        <div
          className="rounded px-2 py-1
        bg-slate-400 text-white"
        >
          {" "}
          {"Connected to " + currentAccount}{" "}
        </div>
      )}
    </div>
  );
}
