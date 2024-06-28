import SesstionList from "./ActiveSession";
import SessionHistory from "./SessionHistory";

export default async function page() {
  return (
    <div className="flex flex-col gap-8">
      <SesstionList />
      <SessionHistory />
    </div>
  );
}
