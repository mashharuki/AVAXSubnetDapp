import AllBillCards from "../components/Card/AllBillCards";
import DishonoredCards from "../components/Card/DishonoredCards";
import AdminForm from "../components/Form/AdminForm";
import Layout from "../components/Layout/Layout";

export default function Admin() {
  return (
    <Layout>
      <div className="flex justify-around bg-gradient-to-r from-sky-500 to-indigo-500">
        <div>
          <AllBillCards />
        </div>
        <div>
          <div className="my-20">
            <AdminForm />
          </div>
          <div className="my-20">
            <DishonoredCards />
          </div>
        </div>
      </div>
    </Layout>
  );
}
