import { getPollResults_Action } from "@/Actions/poll";
import ResultsBox from "./ResultsBox";
import { Suspense } from "react";
import { Skeleton, SkeletonButton, SkeletonList } from "@/components/Skeleton";

type props = {
  params: Promise<{ id: string }>;
};
export default function PollResultsWrapper(props: props) {
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
        <Suspense fallback={<ResultBoxSuspense />}>
          <PollResults {...props} />
        </Suspense>
      </div>
    </div>
  );
}

async function PollResults({ params: paramsPromise }: props) {
  const { id } = await paramsPromise;

  const pollResults = await getPollResults_Action(id);

  return <ResultsBox pollResults={pollResults} />;
}

function ResultBoxSuspense() {
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

      <div className="flex gap-3 mt-4">
        <div>
          <SkeletonButton />
        </div>
        <div>
          <SkeletonButton />
        </div>
      </div>
    </div>
  );
}
