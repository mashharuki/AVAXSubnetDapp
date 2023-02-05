import { useContext } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { BillType, useContract } from "../../hooks/useContract";
import { sameAddresses } from "../../utils/compare";
import ViewBillCard from "./ViewBillCard";

export default function IssuerBillCards() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { bank, bills } = useContract({ currentAccount });

  const onClickPay = async (id: number) => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!bank) return;
    try {
      const amount = await bank.getAmountToPayBill(id);

      const txn = await bank.lockToken(id, { value: amount });
      await txn.wait();

      alert("Success");
    } catch (error) {
      alert(error);
    }
  };

  const callBackFn = (bill: BillType, index: number) => {
    if (currentAccount === undefined) return <div></div>;
    if (!sameAddresses(bill.issuer, currentAccount)) return <div></div>;
    return (
      <div key={index}>
        <ViewBillCard
          title="Bill to pay"
          buttonTitle="pay"
          disable={false}
          onClick={() => {
            onClickPay(index);
          }}
          bill={bill}
        />
      </div>
    );
  };

  return <div>{bills.map(callBackFn)}</div>;
}
