import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import Image from "next/image";
import InfoCard from "../components/InfoCard";

const Account = () => {
  const router = useRouter();
  const { auth, user, isAuthLoading, logout, isAuthenticated, getEmail } =
    useAuth();
  const [email, setEmail] = useState('dummy email');

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
    )
      .then((res) => res.json())
      .then((json) => {
          if(json.statusCode !== 200){
              return console.log("Request failed, json: ", json)
            }
        console.log(json)
        router.reload(router.pathname)
        
      })
      .catch((err) => console.error(err));
  }

  const name = !isAuthLoading && isAuthenticated && user?.name.split(" ")[0];

  if (!isAuthLoading && isAuthenticated) {
    return (
        
      <div className="flex flex-col items-center  h-full py-20">
        <h1 className="font-cooper text-4xl text-[#EFAF23] glow mb-4">
          Hello {name}
        </h1>
       
        <span className="text-zinc-200 mb-16 font-sans">
          Not {name}?{" "}
          <button className="underline text-yellow-100" onClick={logout}>
            Click here to sign out
          </button>
        </span>

        <div className="grid flex-col gap-20 w-full grid-cols-5">
          <div className="text-white ">
            <ul className="flex flex-col gap-2">
              <li className="flex gap-6 text-xl border-b-2 border-zinc-500 py-4">
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
              <li className="flex gap-6 border-b-2 border-zinc-500 text-xl py-4">
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
          <InfoCard  icon="User_Card_ID.svg" title="Name" content={auth.user.name}></InfoCard>
          <InfoCard  innerFunction={changeDetails} icon="User_Card_ID.svg" title="Email" content={auth.user.email}></InfoCard>
          <InfoCard  icon="User_Card_ID.svg" title="Password" content="**************"></InfoCard>
          <InfoCard  icon="Shield_Check.svg" title="Account actions" content="" buttonClass='text-red-200 border-2 bg-red-900 border-red-600'></InfoCard>


            <div className="text-white flex flex-col border-2 border-zinc-600 rounded-md w-full gap-4 p-4">
              <div className="flex gap-3 items-center">
                <Image
                  src="/static/icons/Circle_Warning.svg"
                  alt="Vercel Logo"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-yellow-500 font-bold">
                  Account actions
                </span>
              </div>
              <button className="mt-auto text-sm  w-max py-2 px-4 rounded-full">
                Delete account
              </button>
            </div>
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
