"use client";

import { createPoll_Action } from "@/Actions/poll";
import { useActionState, useState } from "react";

export default function PollCreate() {
  const [options, setOptions] = useState(["", ""]);
  const [title, setTitle] = useState("");
  const [errors, formAction, isPending] = useActionState(
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
    <div className="bg-red-100">
      <h1>Create a Poll</h1>

      <p className="text-red-500">Errors: {JSON.stringify(errors)}</p>

      <form action={formAction} className="flex flex-col gap-3">
        <label>
          Question
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {options.map((option, index) => (
          <div key={index} className="flex gap-2 items-center">
            <label>
              Option {index + 1}
              <input
                type="text"
                name={`option${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </label>

            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-1 border-2"
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addOption} className="p-1 border-4">
          ➕ Add Option
        </button>

        <button type="submit" className="p-1 border-4" disabled={isPending}>
          {isPending ? "Creating Poll..." : "Create Poll"}
        </button>
      </form>

      {isPending && <p className="text-blue-500">Processing your poll...</p>}
    </div>
  );
}
