import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";

/**
 * Home Component
 * @returns 
 */
const Home: NextPage = () => {
  return (
    <Layout>
      <div className="bg-home h-screen bg-cover bg-center flex justify-around">
        <h1 className="text-6xl font-bold my-auto">AVAX Subnet X Finance</h1>
      </div>
    </Layout>
  );
};

export default Home;
