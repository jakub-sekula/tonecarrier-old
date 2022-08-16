import Link from "next/link";
import {
  CheckoutProducts,
  CheckoutTotals,
} from "../components/CheckoutComponents";
import { TiTick } from "react-icons/ti";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FaDownload, FaWrench } from "react-icons/fa";
import { capitalizeFirstLetter, makeid } from "../utils/utils";

const OrderSummary = ({ data, cart }) => {
  return (
    <div className="mx-auto gap-8 w-full sm:w-96 border border-primary rounded-lg flex flex-col items-center p-4 ">
      <div className="flex flex-col items-center text-center gap-2 w-full ">
        <TiTick
          color="black"
          className="bg-primary border-2 border-primary rounded-full mb-4 glow "
          size={60}
        />
        <h1 className="font-cooper text-primary glow text-2xl">
          Order successful!
        </h1>
        <span className="">Thanks {data.billing.firstName}, you&apos;re awesome!</span>
        <span className="text-xs">
          Your order number {data.id} is confirmed.
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full ">
        <h2 className=" font-semibold text-primary glow border-b pb-1 border-zinc-700 border-dashed">
          Your purchased products
        </h2>
        <CheckoutProducts products={cart} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h2 className=" font-semibold text-primary glow border-b pb-1 border-zinc-700 border-dashed">
          Your payment details
        </h2>
        <div className="flex gap-4 items-center">
          <BsCreditCard2FrontFill size={24} color="white" />
          <span className="text-sm">
            <span className="font-semibold">
              {`${(data.payment.amount / 100).toLocaleString("en-GB", {
                style: "currency",
                currency: `${data.payment.currency}`,
              })}`}{" "}
            </span>
            paid with {capitalizeFirstLetter(data.payment.brand)} ending{" "}
            {data.payment.cardLastFour}
          </span>
        </div>
        <Link href={data.payment.receipt_url}>
          <a className="text-sm text-zinc-500">
            <span className="flex items-center gap-1 underline group hover:text-primary">
              View receipt.
              <FiExternalLink size={12} className="group-hover:text-primary" />
            </span>
          </a>
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full ">
        <h2 className=" font-semibold text-primary glow border-b pb-1 border-zinc-700 border-dashed">
          Your files:
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-zinc-300">
          {data.downloads.map((file) => {
            return (
              <li
                key={makeid(6)}
                className="flex justify-between items-center gap-2 border-b pb-2 border-zinc-800"
              >
                {file.name}{" "}
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/downloads/${file.hash}`}
                >
                  <a className="ml-auto">Download</a>
                </Link>
                <FaDownload />
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="http://localhost:3000/testing">
            <a className="button self-center flex items-center gap-2">
              <FaDownload />
              Download all
            </a>
          </Link>
          <Link href="http://localhost:3000/testing">
            <a className="button-secondary self-center flex items-center gap-2">
              <FaWrench />
              Support
            </a>
          </Link>
        </div>
        <span className="text-center text-xs text-zinc-400">
          We also sent a confirmation to your email:{" "}
          <span className="font-semibold">{data.billing.email}</span>
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
