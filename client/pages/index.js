import React from "react";
import Head from "next/head";
import SignIn from "../components/auth/SignIn";

const Home = () => (
  <>
    <div>
      <Head>
        <title>Sign In</title>
      </Head>
    </div>
    <SignIn/>
  </>
);

export default Home;
