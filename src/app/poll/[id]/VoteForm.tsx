"use client";

import { votePoll_Action } from "@/Actions/poll";
import { Choice, Poll } from "@prisma/client";
import { useActionState, useEffect, useState, useTransition } from "react";

export default function VoteForm({
  poll,
}: {
  poll: Poll & { choices: Choice[] };
}) {
  const [choosenChoiceId, setChoosenChoiceId] = useState<null | string>(null);
  const [, startTransitionAction] = useTransition();

  const [state, action, isPending] = useActionState(
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
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2 bg-red-300"
      >
        <h1>{poll.title}</h1>
        {poll.choices.map((choice) => (
          <label key={choice.id}>
            <input
              type="radio"
              name="choice"
              value={choice.id}
              checked={choosenChoiceId === choice.id.toString()}
              onChange={(e) => setChoosenChoiceId(e.target.value)}
            />
            {choice.optionText}
          </label>
        ))}
        <button type="submit" disabled={isPending || choosenChoiceId === null}>
          Vote
        </button>
      </form>

      {isPending ? (
        <p>Submitting vote...</p>
      ) : (
        state.success && <p>{state.success}</p>
      )}
      {state.error && <p className="text-red-900">{state.error}</p>}
    </div>
  );
}
