import { getPollWithChoices } from "@/db/poll";
import { notFound } from "next/navigation";
import VoteForm from "./VoteForm";
import { getSessionData } from "@/utils";
import { Suspense } from "react";
import { Skeleton, SkeletonButton, SkeletonList } from "@/components/Skeleton";

type PollProps = {
  params: Promise<{ id: string }>;
};

export default function PollWrapper(props: PollProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className="bg-white mt-8 px-4 py-5 sm:p-6 box border rounded-md w-full md:max-w-[40rem]"
        style={{ borderTopWidth: "4px", borderTopColor: "#2563EB" }}
      >
        <Suspense fallback={<PollSuspense />}>
          <Poll {...props} />
        </Suspense>
      </div>
    </div>
  );
}

async function Poll({ params: paramsPromise }: PollProps) {
  const { id } = await paramsPromise;

  const poll = await getPollWithChoices(id);
  if (poll === null) return notFound();

  const isAuthor =
    ((await getSessionData()) as { userid: number })?.userid === poll.userId ||
    false;

  return <VoteForm poll={poll} isAuthor={isAuthor} />;
}

function PollSuspense() {
  return (
    <div>
      <div className="text-3xl">
        <Skeleton short />
      </div>

      <div className="mt-5">
        <SkeletonList amount={4}>
          <Skeleton short />
        </SkeletonList>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3">
          <div>
            <SkeletonButton />
          </div>
          <div>
            <SkeletonButton />
          </div>
        </div>

        <div>
          <SkeletonButton />
        </div>
      </div>
    </div>
  );
}
