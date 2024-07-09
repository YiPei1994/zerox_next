import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getActiveSessions } from "@/lib/actions/session";
import SessionItemData from "./SessionItemData";
import SessionItemForm from "./SessionItemForm";
import SessionItemHeader from "./SessionItemHeader";

export default async function SessionList() {
  const sessions = await getActiveSessions();

  return (
    <>
      {sessions.length === 0 && (
        <p className="mx-auto my-4 text-2xl font-bold">
          No active session, please create one.
        </p>
      )}
      {sessions.map((session) => (
        <div className="p-4 bg-secondary rounded-md" key={session._id}>
          <h4 className="text-center font-bold my-4">Active session:</h4>

          <SessionItemHeader session={session} />

          {session.exercises.map((exe) => (
            <Accordion key={exe.exerciseId._id} type="single" collapsible>
              <AccordionItem value={exe.exerciseId._id}>
                <AccordionTrigger className="font-bold text-md">
                  {exe.exerciseId.name}
                </AccordionTrigger>
                <AccordionContent>
                  <SessionItemForm id={session._id} exerciseData={exe} />
                </AccordionContent>
                <SessionItemData exerciseData={exe} />
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      ))}
    </>
  );
}
