import { SessionData } from "@/types/types";
import SessionItem from "./SessionItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SessionListProps = {
  sessions: SessionData[];
};

export default function SessionList({ sessions }: SessionListProps) {
  return (
    <>
      {sessions.map((session) => (
        <div className="mb-12" key={session._id}>
          <h4 className="text-2xl font-bold">{session.note}</h4>
          {session.exercises.map((exe) => (
            <Accordion key={exe.exerciseId._id} type="single" collapsible>
              <AccordionItem value={exe.exerciseId._id}>
                <AccordionTrigger>{exe.exerciseId.name}</AccordionTrigger>
                <AccordionContent>
                  <SessionItem id={session._id} sessionExercise={exe} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      ))}
    </>
  );
}
