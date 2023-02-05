import { useCallback, useContext, useEffect, useState } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { useContract } from "../../hooks/useContract";

export default function DishonoredCards() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { bank } = useContract({ currentAccount });
  const [addresses, setAddresses] = useState<string[]>([]);

  const getDishonoredAddresses = useCallback(async () => {
    if (!currentAccount) return;
    if (!bank) return;
    try {
      const numOfAddresses = await bank.getNumberOfDishonoredAddresses();

      for (let index = 0; index < numOfAddresses.toNumber(); index++) {
        const address = await bank.dishonoredAddresses(index);
        setAddresses((prevState) => [...prevState, address]);
      }
    } catch (error) {
      alert(error);
    }
  }, [currentAccount, bank]);

  useEffect(() => {
    getDishonoredAddresses();
  }, [bank, getDishonoredAddresses]);

  return (
    <div>
      {addresses.length === 0 ? (
        <div></div>
      ) : (
        <div className="mx-auto w-fit">dishonored</div>
      )}
      {addresses.map((address, index) => {
        return (
          <div key={index} className="flex justify-center">
            <div className="block px-1 rounded-lg shadow-lg bg-white max-w-sm my-2">
              <p className="px-1 rounded-md w-max self-center">{address}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
