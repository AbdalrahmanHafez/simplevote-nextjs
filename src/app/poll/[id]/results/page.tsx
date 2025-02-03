import Link from "next/link";
import { getPollResults_Action } from "@/Actions/poll";
import ResultsBox from "./ResultsBox";

export default async function PollResults({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;

  const pollResults = await getPollResults_Action(id);

  return (
    <div className="">
      <h1>Poll Results</h1>

      {JSON.stringify(pollResults)}

      <ResultsBox pollResults={pollResults} />

      <div>
        <Link href={`/poll/${id}`}>Back to poll</Link>
      </div>
    </div>
  );
}
