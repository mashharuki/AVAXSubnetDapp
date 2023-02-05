import IssueBillForm from "../components/Form/IssueBillForm";
import Layout from "../components/Layout/Layout";

export default function IssueBill() {
  return (
    <Layout>
      <div className="flex bg-gradient-to-r from-sky-500 to-indigo-500 h-screen">
        <IssueBillForm />
      </div>
    </Layout>
  );
}
