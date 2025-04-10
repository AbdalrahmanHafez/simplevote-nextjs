import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className="relative mt-8 ">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="relative shadow-xl rounded-2xl overflow-hidden bg-indigo-50">
            <div className="absolute inset-0">
              <Image
                className="h-full w-full object-cover"
                src="/hero-background.png"
                alt="Hero background"
                layout="fill"
                objectFit="cover"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"></div> */}
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:pt-28 lg:pb-32 lg:px-8">
              <h1 className="text-center sm:text-left text-5xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl sm:ml-12">
                <span className="block text-white">Create a poll</span>
                <span className="block text-indigo-300">in seconds</span>
              </h1>

              <div className="hidden sm:block ml-12 text-lg mt-4 text-indigo-200">
                No signup required
              </div>

              <p className="mt-6 max-w-sm mx-auto sm:ml-12 text-center sm:text-left text-lg sm:text-xl text-indigo-200 sm:max-w-2xl">
                Want to ask your friends where to go friday night or arrange a
                meeting with co-workers? Create a poll - and get answers in no
                time.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-begin">
                <div className="sm:ml-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link
                    href="/poll/create"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                  >
                    Create a poll
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
