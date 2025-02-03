"use client";

import { votePoll_Action } from "@/Actions/poll";
import { Choice, Poll } from "@prisma/client";
import Link from "next/link";
import { useActionState, useEffect, useState, useTransition } from "react";
import { deletePoll_Action } from "@/Actions/poll";

export default function VoteForm({
  poll,
  isAuthor,
}: {
  poll: Poll & { choices: Choice[] };
  isAuthor: boolean;
}) {
  const [choosenChoiceId, setChoosenChoiceId] = useState<null | string>(null);
  const [, startTransitionAction] = useTransition();
  const [isPendingDeleting, startTransitionDeletePoll] = useTransition();

  const [state, action, isPendingVoting] = useActionState(
    (state: unknown) =>
      votePoll_Action(state, {
        pollid: poll.id,
        choiceid: choosenChoiceId || "",
      }),
    { success: "" }
  );

  useEffect(() => {
    console.log("[RENDER] VoteForm");
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransitionAction(action);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <h1 className="text-3xl">{poll.title}</h1>

        {poll.choices.map((choice) => (
          <div key={choice.id} className="flex items-center gap-2">
            <input
              type="radio"
              name={"choice" + choice.id}
              id={"choice" + choice.id}
              value={choice.id}
              checked={choosenChoiceId === choice.id.toString()}
              onChange={(e) => setChoosenChoiceId(e.target.value)}
            />

            <label htmlFor={"choice" + choice.id}>{choice.optionText}</label>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <div className="flex gap-2 min-w-[13rem]">
            <button
              type="submit"
              disabled={isPendingVoting || choosenChoiceId === null}
              className="border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-md w-full cursor-pointer"
            >
              {isPendingVoting ? "Voting ..." : "Vote"}
            </button>
            <Link
              href={`/poll/${poll.id}/results`}
              className="text-nowrap px-3 p-2 rounded-md hover:bg-blue-100 border-slate-200 border"
            >
              View results
            </Link>
          </div>

          {isAuthor && (
            <button
              className="px-3 p-2 rounded-md hover:bg-red-100 border-slate-200 border"
              onClick={() =>
                startTransitionDeletePoll(async () => {
                  await deletePoll_Action(poll.id);
                })
              }
              disabled={isPendingDeleting}
            >
              {isPendingDeleting ? "Deleting ..." : "Delete Poll"}
            </button>
          )}
        </div>
      </form>

      <div className="mt-4">
        {state.success && <p>{state.success}</p>}
        {state.error && <p className="text-red-900">{state.error}</p>}
      </div>
    </div>
  );
}
