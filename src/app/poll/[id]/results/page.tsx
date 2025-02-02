import { getPollWithChoices } from "@/db/poll";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPollResults_Action } from "@/Actions/poll";

export default async function PollResults({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;

  const poll = await getPollResults_Action(id);

  return (
    <div className="">
      <h1>Poll Results</h1>

      {JSON.stringify(poll)}

      <div>
        <Link href={`/poll/${id}`}>Back to poll</Link>
      </div>
    </div>
  );
}
