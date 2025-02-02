import { getUserPolls_Action } from "@/Actions/poll";
import Link from "next/link";

export default async function PollsMine() {
  const userPolls = await getUserPolls_Action();

  return (
    <>
      <h1>Created Polls</h1>
      <div className="bg-red-100 flex flex-col ">
        {userPolls.map((poll) => (
          <Link key={poll.id} href={`/poll/${poll.id}`}>
            {poll.title}
          </Link>
        ))}
      </div>
    </>
  );
}
