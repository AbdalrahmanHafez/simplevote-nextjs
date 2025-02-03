"use client";
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

  return (
    <div>
      <h1>{results.title}</h1>
      {results.choices.map((c) => (
        <div key={c.id}>
          <p>{c.optionText}</p>
          <p>Votes: {c.votes?.length | 0}</p>
        </div>
      ))}
    </div>
  );
}
