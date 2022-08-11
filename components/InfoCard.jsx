import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function InfoCard(props) {
  const [content, setContent] = useState(props.content);
  const [isEditing, setEditing] = useState(false);

  const { innerFunction } = props;

  return (
    <div className=" text-white flex flex-col border-2 border-zinc-600 rounded-md w-full gap-4 p-4">
      <div className="flex gap-3 items-center">
        <Image
          src={`/static/icons/${props.icon}`}
          alt="Vercel Logo"
          width={24}
          height={24}
        />
        <span className="md:text-sm text-yellow-500 font-bold">
          {props.title || "Card title"}
        </span>
      </div>
      {!isEditing && content ? (
        <span className="md:pl-1 h-8">{content || "Card content"}</span>
      ) : null}

      <input
        value={content || "zesralo sie"}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        type="text"
        name="name"
        className={`h-8 text-black border-2 border-zinc-200 rounded-full px-3 py-2 w-full md:w-96 ${
          !isEditing ? "hidden" : null
        }`}
      />

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={() => {
              setEditing(!isEditing);
            }}
            className="mt-auto text-sm text-zinc-500 border-2 border-zinc-500 w-max py-2 px-4 rounded-full"
          >
            Cancel edit
          </button>
        ) : null}

        <button
          onClick={() => {
            if (isEditing) {
              innerFunction({ email: content });
            }
            setEditing(!isEditing);
          }}
          className={`mt-auto text-sm text-zinc-500 border-2 border-zinc-500 w-max py-2 px-4 rounded-full ${props.buttonClass}`}
        >
          {`${isEditing ? "Confirm edit" : `Edit ${props.title}`}`}
        </button>
      </div>
    </div>
  );
}
