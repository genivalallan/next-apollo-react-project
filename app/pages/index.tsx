import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";

const Now = () => {
  const { data, loading } = useQuery(gql`
    query Now {
      now
    }
  `);
  return loading ? "Carregando..." : data.now;
};

const MinhaCarteira: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Minha Carteira</title>
      </Head>

      <main>
        <Now />
      </main>
    </div>
  );
};

export default MinhaCarteira;
