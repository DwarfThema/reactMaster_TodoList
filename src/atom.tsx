import { atom } from "recoil";

export interface ITodos {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<ITodos[]>({
  key: "todo",
  default: [],
});
