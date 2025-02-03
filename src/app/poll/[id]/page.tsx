import { getPollWithChoices } from "@/db/poll";
import { notFound } from "next/navigation";
import VoteForm from "./VoteForm";
import { getSessionData } from "@/utils";

export default async function Poll({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;

  const poll = await getPollWithChoices(id);
  if (poll === null) return notFound();

  const isAuthor =
    ((await getSessionData()) as { userid: number })?.userid === poll.userId ||
    false;

  return (
    <div className="flex justify-center items-center">
      <div
        className="bg-white mt-8 px-4 py-5 sm:p-6 box border rounded-md w-full md:max-w-[40rem]"
        style={{ borderTopWidth: "4px", borderTopColor: "#2563EB" }}
      >
        <VoteForm poll={poll} isAuthor={isAuthor} />
      </div>
    </div>
  );
}
