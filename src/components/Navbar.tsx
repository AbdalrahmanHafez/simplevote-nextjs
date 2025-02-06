import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-end gap-4 p-4 bg-white shadow-sm">
      <Link href={"/"}>
        <div className="relative">
          <Image alt="logo" src="/logo.png" width={60} height={75} />
        </div>
      </Link>

      <div className="ml-5 leading-[1] flex gap-4 text-[1.2rem]">
        <Link href="/">Home</Link>
        <Link href="/poll/create">Create poll</Link>
        <Link href="/poll/mine" prefetch={true}>
          My Polls
        </Link>
      </div>
    </div>
  );
}
