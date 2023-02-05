import { useContext, useState } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { useContract } from "../../hooks/useContract";
import { avaxToWei } from "../../utils/formatter";
import SubmitButton from "../Button/SubmitButton";
import InputField from "../Field/InputField";

export default function IssueBillForm() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { bank } = useContract({ currentAccount });

  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const onClickIssue = async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!bank) return;
    try {
      const amountInWei = avaxToWei(amount);

      const txn = await bank.issueBill(amountInWei, recipient);
      await txn.wait();

      alert("Success");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white h-fit mx-auto my-auto w-fit">
      <form>
        <InputField
          label="Amount of AVAX"
          placeholder="Enter the amount of AVAX"
          onChange={(value) => setAmount(value)}
        />
        <InputField
          label="Recipient"
          placeholder="Enter the address of recipient"
          onChange={(value) => setRecipient(value)}
        />
        <SubmitButton title="issue" disable={false} onClick={onClickIssue} />
      </form>
    </div>
  );
}
