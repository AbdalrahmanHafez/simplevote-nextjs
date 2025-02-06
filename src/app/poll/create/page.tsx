import { Metadata } from "next";
import CreatePoll from "./CreatePoll";

export const metadata: Metadata = {
  title: "Create Vote/Poll",
  description: "create vote without signup",
};

export default function Page() {
  return <CreatePoll />;
}
