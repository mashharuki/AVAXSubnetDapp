import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import BankAbi from "../artifacts/Bank.json";
import TxAllowListAbi from "../artifacts/IAllowList.json";
import { Bank as BankType } from "../types";
import { IAllowList as TxAllowListType } from "../types";
import { getEthereum } from "../utils/ethereum";
import { blockTimeStampToDate, weiToAvax } from "../utils/formatter";

export const BankAddress = "0x8C6dFbFC0b3e83cBBB82E4b5A187Bc9C0EcE0630";
export const TxAllowListAddress = "0x0200000000000000000000000000000000000002";

export type BillType = {
  amount: string;
  dueDate: Date;
  issuer: string;
  recipient: string;
  status: number;
};

export enum BillStatus {
  Issued,
  Paid,
  Cashed,
  Completed,
  Dishonored,
}

export enum TxAllowListRole {
  None,
  Enabled,
  Admin,
}

type PropsUseContract = {
  currentAccount: string | undefined;
};

type ReturnUseContract = {
  bank: BankType | undefined;
  txAllowList: TxAllowListType | undefined;
  bills: BillType[];
};

/**
 * useContract function
 * @param param0 
 * @returns 
 */
export const useContract = ({
  currentAccount,
}: PropsUseContract): ReturnUseContract => {
  const [bank, setBank] = useState<BankType>();
  const [txAllowList, setTxAllowList] = useState<TxAllowListType>();
  const [bills, setBills] = useState<BillType[]>([]);

  const ethereum = getEthereum();

  /**
   * getContract function
   */
  const getContract = useCallback(
    (
      contractAddress: string,
      abi: ethers.ContractInterface,
      storeContract: (_: ethers.Contract) => void
    ) => {
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }
      if (!currentAccount) {
        console.log("currentAccount doesn't exist!");
        return;
      }
      try {
        // @ts-ignore: ethereum as ethers.providers.ExternalProvider
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner(); 
        const Contract = new ethers.Contract(contractAddress, abi, signer);
        storeContract(Contract);
      } catch (error) {
        console.log(error);
      }
    },
    [ethereum, currentAccount]
  );

  /**
   * getBills function
   */
  const getBills = useCallback(async () => {
    if (!currentAccount) return;
    if (!bank) return;
    try {
      console.log("bank:", bank);
      const numOfBills = await bank.callStatic.getNumberOfBills();
      const term = await bank.term();

      for (let index = 0; index < numOfBills.toNumber(); index++) {
        const billOrigin = await bank.allBills(index);
        const bill: BillType = {
          amount: weiToAvax(billOrigin.amount),
          dueDate: blockTimeStampToDate(billOrigin.timestamp.add(term)),
          issuer: billOrigin.issuer,
          recipient: billOrigin.recipient,
          status: billOrigin.status,
        };

        setBills((prevState) => [...prevState, bill]);
      }
    } catch (error) {
      alert(error);
    }
  }, [currentAccount, bank]);

  useEffect(() => {
    getContract(BankAddress, BankAbi.abi, (Contract: ethers.Contract) => {
      setBank(Contract as BankType);
    });

    getContract(
      TxAllowListAddress,
      TxAllowListAbi.abi,
      (Contract: ethers.Contract) => {
        setTxAllowList(Contract as TxAllowListType);
      }
    );
  }, [ethereum, currentAccount, getContract]);

  useEffect(() => {
    getBills();
  }, [bank, getBills]);

  return {
    bank: bank,
    txAllowList: txAllowList,
    bills: bills,
  };
};
