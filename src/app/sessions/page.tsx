import SesstionList from "./ActiveSession";
import SessionHistory from "./SessionHistory";

export default async function page() {
  return (
    <div>
      <SesstionList />
      <SessionHistory />
    </div>
  );
}
