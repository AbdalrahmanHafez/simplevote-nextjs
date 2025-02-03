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
    <div className=" flex flex-col justify-center items-center">
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate text-gray-900">
          Poll Results
        </h1>
      </div>

      <div
        className="bg-white mt-8 px-4 py-5 sm:p-6 box border divide-y divide-gray-200 rounded-md md:min-w-[30rem]"
        style={{ borderTopWidth: "4px", borderTopColor: "#2563EB" }}
      >
        <ResultsBox pollResults={pollResults} />
      </div>
    </div>
  );
}
