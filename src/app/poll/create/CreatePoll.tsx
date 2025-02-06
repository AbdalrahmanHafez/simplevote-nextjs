"use client";

import { createPoll_Action } from "@/Actions/poll";
import { useActionState, useState } from "react";

export default function PollCreate() {
  const [options, setOptions] = useState(["", ""]);
  const [title, setTitle] = useState("");
  const [, formAction, isPending] = useActionState(
    (state: unknown) => createPoll_Action(state, { title, options }),
    {}
  );

  const handleOptionChange = (index: number, newValue: string) => {
    const newOptions = [...options];
    newOptions[index] = newValue;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index: number) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate text-gray-900">
            Create a Poll
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Complete the below fields to create your poll.
          </p>
        </div>

        <div
          className="bg-white mt-8 px-4 py-5 sm:p-6 box border divide-y divide-gray-200 rounded-md md:min-w-[30rem]"
          style={{ borderTopWidth: "4px", borderTopColor: "#2563EB" }}
        >
          <form action={formAction} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-2xl">
                Question
              </label>
              <input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your question here"
                className="bg-slate-100 rounded px-3 p-2"
              />
            </div>

            {options.map((option, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <label htmlFor={"option" + index}>Option {index + 1}</label>
                  <input
                    type="text"
                    name={`option${index}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    placeholder="Option text"
                    className="bg-slate-100 rounded px-3 p-2"
                  />
                </div>

                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-1 self-end"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="inline-flex justify-center items-center border border-transparent rounded-md shadow-sm font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 px-4 py-2 text-sm w-full"
            >
              ➕ Add Option
            </button>
            <button
              type="submit"
              className="inline-flex justify-center items-center border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-4 py-2 text-sm w-full"
              disabled={isPending}
            >
              {isPending ? "Creating Poll..." : "Create Poll"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
