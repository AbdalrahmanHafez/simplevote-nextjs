import { getPollWithChoices } from "@/db/poll";
import { notFound } from "next/navigation";
import VoteForm from "./VoteForm";
import Link from "next/link";
import { deletePoll_Action } from "@/Actions/poll";

export default async function Poll({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;

  const poll = await getPollWithChoices(id);
  if (poll === null) return notFound();

  return (
    <div className="">
      <h1>Poll Page</h1>

      {/* form to subimt the vote choice */}
      <VoteForm poll={poll} />

      <div>
        <form action={deletePoll_Action.bind(null, poll.id)}>
          <button type="submit">Delete Form</button>
        </form>

        <Link href={`/poll/${poll.id}/results`}>View results</Link>
      </div>
    </div>
  );
}
