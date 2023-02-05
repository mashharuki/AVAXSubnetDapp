import { useCallback, useContext, useEffect, useState } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { TxAllowListRole, useContract } from "../../hooks/useContract";
import NavButton from "./NavButton";

export default function AdminButton() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { txAllowList } = useContract({ currentAccount });
  const [role, setRole] = useState(TxAllowListRole.None);

  const getAdminAddress = useCallback(async () => {
    if (!currentAccount) return;
    if (!txAllowList) return;
    try {
      const role = await txAllowList.readAllowList(currentAccount);
      setRole(role.toNumber());
    } catch (error) {
      alert(error);
    }
  }, [currentAccount, txAllowList]);

  useEffect(() => {
    getAdminAddress();
  }, [txAllowList, getAdminAddress]);

  return (
    <div className="xl:flex lg:flex md:flex space-x-12 ml-8 items-center">
      {role === TxAllowListRole.Admin ? (
        <NavButton to="/Admin" name="Admin" />
      ) : (
        <div></div>
      )}
      <div>
        role:
        {role === TxAllowListRole.None ? "None" : ""}
        {role === TxAllowListRole.Enabled ? "Enabled" : ""}
        {role === TxAllowListRole.Admin ? "Admin" : ""}
      </div>
    </div>
  );
}
