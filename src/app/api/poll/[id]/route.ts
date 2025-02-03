import { getPollResults_Action } from "@/Actions/poll";
// import { getPollResults } from "@/db/poll";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  console.log("[API] GET /poll/[id] ", id)
  // return new Response("ok", { status: 200 })

  const stream = new ReadableStream({
    async start(controller) {
      // Set up polling interval
      const interval = setInterval(async () => {
        try {
          // const results = await getPollResults(id)
          const results = await getPollResults_Action(id)
          // const results = { "results": "poll results" };
          controller.enqueue(`data: ${JSON.stringify(results)}\n\n`);
        } catch (error) {
          console.error('Error fetching poll results:', error);
        }
      }, 5000);

      // Cleanup on client disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });

}
