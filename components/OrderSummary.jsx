import Link from "next/link";
import {
  CheckoutProducts,
  CheckoutTotals,
} from "../components/CheckoutComponents";
import { TiTick } from "react-icons/ti";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";

const OrderSummary = ({data, cart}) => {
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
        <span className="">You&apos;re awesome, {data.billing.firstName}!</span>
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
      <div className="flex flex-col gap-4 w-full pb-4 ">
        <h2 className=" font-semibold text-primary glow border-b pb-1 border-zinc-700 border-dashed">
          Your payment details
        </h2>
        <div className="flex gap-4 items-center">
          <BsCreditCard2FrontFill size={24} color="white" />
          <span className="text-sm">
            <span className="font-semibold">15.00 GBP </span>paid with card
            ending {data.payment.cardLastFour}
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
        <Link href="http://localhost:3000/testing">
          <a className="button self-center flex items-center gap-2">
            <FaDownload />
            Download your files
          </a>
        </Link>
        <span className="text-center text-xs text-zinc-400">
          We also sent a download link to your email:{" "}
          <span className="font-semibold">{data.billing.email}</span>
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
