import { getUserPolls_Action } from "@/Actions/poll";
import { Skeleton } from "@/components/Skeleton";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My polls/votes",
  description: "list of polls created by you",
};

export default function PollsMine() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate text-gray-900">
          My polls
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          List of polls created by you
        </p>
      </div>

      <div
        className="flex flex-col bg-white mt-8 px-4 py-5 mx-[10rem] divide-y divide-gray-200 rounded-md w-full md:max-w-[30rem]"
        style={{ borderTopWidth: "4px", borderTopColor: "#2563EB" }}
      >
        <Suspense
          fallback={
            <div className="flex flex-col gap-9">
              <Skeleton short />
              <Skeleton short />
              <Skeleton short />
              <Skeleton short />
              <Skeleton short />
              <Skeleton short />
            </div>
          }
        >
          <PollsList />
        </Suspense>
      </div>
    </div>
  );
}

async function PollsList() {
  const userPolls = await getUserPolls_Action();

  return (
    <>
      {userPolls.map((poll) => (
        <Link
          key={poll.id}
          href={`/poll/${poll.id}`}
          className="hover:bg-slate-50 p-2 flex justify-between items-center group"
        >
          <div className="text-2xl">{poll.title}</div>
          <div className="group-hover:block hidden">➡️</div>
        </Link>
      ))}

      {userPolls.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          You haven&apos;t created any polls yet
        </div>
      )}
    </>
  );
}
