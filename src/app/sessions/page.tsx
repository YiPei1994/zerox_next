import { getSessionsForPage } from "@/lib/actions/session";
import SesstionList from "./SesstionList";

export default async function page() {
  const sessions = await getSessionsForPage();

  return (
    <div>
      <SesstionList sessions={sessions} />
    </div>
  );
}
