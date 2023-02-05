import { useContext, useState } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { useContract } from "../../hooks/useContract";
import SubmitButton from "../Button/SubmitButton";
import InputField from "../Field/InputField";

export default function AdminForm() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { txAllowList } = useContract({ currentAccount });
  const [address, setAddress] = useState("");

  const onEnable = async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!txAllowList) return;
    try {
      const txn = await txAllowList.setEnabled(address);
      await txn.wait();
      alert("Success");
    } catch (error) {
      // https://www.freecodecamp.org/news/object-object-in-javascript-meaning-in-js/
      alert(JSON.stringify(error));
    }
  };

  const onNone = async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!txAllowList) return;
    try {
      const txn = await txAllowList.setNone(address);
      await txn.wait();
      alert("Success");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm h-fit mx-auto">
      <form>
        <InputField
          label="Address to change access"
          placeholder="address"
          onChange={(value) => setAddress(value)}
        />
        <div className="flex justify-between">
          <SubmitButton title="enable" disable={false} onClick={onEnable} />
          <SubmitButton title="none" disable={false} onClick={onNone} />
        </div>
      </form>
    </div>
  );
}
