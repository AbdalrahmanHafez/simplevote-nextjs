import { getUserPolls_Action } from "@/Actions/poll";
import Link from "next/link";

export default async function PollsMine() {
  const userPolls = await getUserPolls_Action();

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
      </div>
    </div>
  );
}
