import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import Image from "next/image";
import InfoCard from "../components/InfoCard";

const Account = () => {
  const router = useRouter();
  const { auth, user, isAuthLoading, logout, isAuthenticated, setAuthLoading } =
    useAuth();

  // redirect to login page when cookie check finishes
  if (!isAuthLoading && !isAuthenticated) {
    router.push("login");
  }

  async function changeDetails(params) {
    console.log("params: ", params);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change-details`,
      {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(params),
      }
    ).catch((err) => console.error(err));

    const resJson = await res.json();
    setAuthLoading(true);

    if (resJson.statusCode !== 200) {
      return console.log("Request failed, json: ", resJson);
    }
  }

  const name = isAuthenticated && auth.user?.name.split(" ")[0];

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center  h-full py-20">
        <h1 className="font-cooper text-4xl text-[#EFAF23] glow mb-4">
          Hello {name}
        </h1>
        <span className="text-zinc-200 mb-16 font-sans">
          {`Not ${name}? `}
          <button className="underline text-yellow-100" onClick={logout}>
            Click here to sign out
          </button>
        </span>

        <div className="md:grid flex flex-col gap-4 md:gap-20 w-full md:grid-cols-5">
          <div className="text-white ">
            <ul className="flex flex-col gap-2">
              <li className="flex gap-6 md:text-xl border-b border-zinc-500 py-4">
                <Image
                  className="glow"
                  src="/static/icons/User_01.svg"
                  width={24}
                  height={24}
                ></Image>
                <Link href={router.pathname}>
                  <a className="text-[#EFAF23] glow font-bold">
                    Account details
                  </a>
                </Link>
              </li>
              <li className="flex gap-6 md:text-xl border-b border-zinc-500 py-4 hover:text-[#EFAF23]">
                <Image
                  src="/static/icons/Shopping_Cart_02.svg"
                  fill="#ff0000"
                  width={24}
                  height={24}
                ></Image>
                <Link href="orders">
                  <a>My orders</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-4 flex flex-col gap-4">
            <InfoCard
              icon="User_Card_ID.svg"
              title="Name"
              content={auth.user.name}
            ></InfoCard>
            <InfoCard
              innerFunction={changeDetails}
              icon="User_Card_ID.svg"
              title="Email"
              content={auth.user.email}
            ></InfoCard>
            <InfoCard
              icon="User_Card_ID.svg"
              title="Password"
              content="**************"
            ></InfoCard>
            <InfoCard
              icon="Shield_Check.svg"
              title="Account actions"
              content=""
              buttonClass="text-red-200 border-2 bg-red-900 border-red-600"
            ></InfoCard>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center  h-full py-20">
        <h1 className="font-cooper text-4xl text-[#EFAF23] glow mb-4">
          Loading...
        </h1>
      </div>
    );
  }
};

export default Account;
