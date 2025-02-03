"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResultsBox({
  pollResults,
}: {
  pollResults: Awaited<
    ReturnType<typeof import("@/Actions/poll").getPollResults_Action>
  >;
}) {
  const [results, setResults] = useState(pollResults);

  useEffect(() => {
    const eventSource = new EventSource(`/api/poll/${pollResults.id}`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setResults(data);
    };
    return () => eventSource.close();
  }, [pollResults]);

  const totalVotes = results.choices.reduce(
    (acc, c) => acc + (c.votes?.length | 0),
    0
  );

  return (
    <div>
      <h1 className="text-3xl">{results.title}</h1>

      <div className="mt-5">
        {results.choices.map((c) => (
          <div key={c.id} className="flex justify-between">
            <p className="text-xl">{c.optionText}</p>
            <p>
              {c.votes?.length | 0} (
              {(((c.votes?.length | 0) * 100) / totalVotes).toFixed(1)}%)
            </p>
          </div>
        ))}

        <p className="mt-5 mb-2 text-slate-500">Total votes: {totalVotes}</p>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center justify-center gap-2 button border border-green-500 bg-green-50 text-default text-sm cursor-default px-3 rounded-md">
          <svg
            className="h-5 w-5 animate-pulse text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="">Live results</span>
        </div>

        <Link
          href={`/poll/${pollResults.id}`}
          className="text-nowrap px-3 p-2 rounded-md hover:bg-slate-50 border-slate-200 border"
        >
          Back to poll
        </Link>
      </div>
    </div>
  );
}
