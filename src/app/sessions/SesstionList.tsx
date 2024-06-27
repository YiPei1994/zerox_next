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
export default function SesstionList({ sessions }: SessionListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sessions.map((session) => (
        <AccordionItem key={session._id} value={session._id}>
          <AccordionTrigger>{session.note}</AccordionTrigger>
          <AccordionContent>
            {session.exercises.map((exe) => (
              <SessionItem key={exe.exerciseId._id} sessionExercise={exe} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
