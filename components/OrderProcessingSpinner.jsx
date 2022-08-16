import { MoonLoader } from "react-spinners";

const OrderProcessingSpinner = () => {
  return (
    <div className="mx-auto gap-8 w-full sm:w-max border border-primary rounded-lg flex flex-col items-center p-4 ">
      <div className="flex flex-col items-center text-center gap-2 w-full animate-pulse">
        <MoonLoader color="#EFAF23" size={48} />

        <h1 className="font-cooper text-primary glow text-2xl">
          Processing your order...
        </h1>
        <span className="text-sm text-zinc-400">
          Please don't leave this page until we have confirmed your order.
        </span>
      </div>
    </div>
  );
};

export default OrderProcessingSpinner;
