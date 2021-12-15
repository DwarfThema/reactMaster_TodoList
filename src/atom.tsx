import { atom, selector } from "recoil";

export enum enumCategories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE"
}

export interface ITodos {
  text: string;
  id: number;
  category: enumCategories;
}

export const toDoState = atom<ITodos[]>({
  key: "todo",
  default: [],
});

export const categoryState = atom<enumCategories>({
  key: "category",
  default: enumCategories.TO_DO,
})

export const toDoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const getToDoState = get(toDoState)
    const getCategory = get(categoryState)
    return getToDoState.filter((getToDoState) => getToDoState.category === getCategory)
  }
})