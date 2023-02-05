import { useContext } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { BillStatus, BillType, useContract } from "../../hooks/useContract";
import ViewBillCard from "./ViewBillCard";

export default function AllBillCards() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { bank, bills } = useContract({ currentAccount });

  const onClickComplete = async (id: number) => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!bank) return;
    try {
      const txn = await bank.completeBill(id);
      await txn.wait();

      alert("Success");
    } catch (error) {
      alert(error);
    }
  };

  const callBackFn = (bill: BillType, index: number) => {
    if (currentAccount === undefined) return <div></div>;
    return (
      <div key={index}>
        <ViewBillCard
          title="Bill"
          buttonTitle="complete"
          disable={BillStatus.Completed <= bill.status}
          onClick={() => {
            onClickComplete(index);
          }}
          bill={bill}
        />
      </div>
    );
  };

  return <div>{bills.map(callBackFn)}</div>;
}
