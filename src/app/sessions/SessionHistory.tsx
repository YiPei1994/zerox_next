"use client";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { getSessionsForPage } from "@/lib/actions/session";
import { PAGE_LIMIT } from "@/lib/constants";
import { formatDate } from "@/lib/helpers";
import { useSessionStore } from "@/store/SessionStore";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default function SessionHistory() {
  const { page, nextPage, prevPage } = useSessionStore();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions", page],
    queryFn: () => getSessionsForPage(page),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!sessions) return;

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-center font-bold">Recent Sessions:</h4>
      <ul className="py-4">
        {sessions?.map((session) => (
          <li
            key={session._id}
            className="bg-secondary py-2 px-4 rounded-md border-b mb-3 "
          >
            <Link
              href={`/sessions/${session._id}`}
              className="flex items-center justify-between"
            >
              <span className="flex-auto truncate">{session.note}</span>{" "}
              <span className="w-min">
                {format(parseISO(session.createdAt), "dd.MM.yyyy")}
              </span>{" "}
            </Link>
          </li>
        ))}
      </ul>

      <Pagination>
        <PaginationContent className="w-full mx-auto items-center justify-between">
          <PaginationItem>
            <Button disabled={page <= 1} onClick={() => prevPage()}>
              Prev
            </Button>
          </PaginationItem>

          <PaginationItem className="flex gap-4">
            <span className="p-1 px-2.5">{page > 1 ? page - 1 : ""}</span>
            <span className="bg-secondary p-1 px-2.5 border-primary/50 border">
              {page}
            </span>
            <span className="p-1 px-2.5">
              {sessions.length >= PAGE_LIMIT ? page + 1 : ""}
            </span>
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={sessions.length < PAGE_LIMIT}
              onClick={() => nextPage()}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
