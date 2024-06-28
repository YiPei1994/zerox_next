import { SessionData } from "@/types/types";
import { create } from "zustand";

type SessionStore = {
  page: number;
  sessions: SessionData[];
  nextPage: () => void;
  prevPage: () => void;
  setSessions: (sessions: SessionData[]) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  page: 1,
  sessions: [],
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  setSessions: (sessions) =>
    set((state) => ({ sessions: (state.sessions = sessions) })),
}));
