import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import counterSlice from "./countterSlice";
import continentsSlice from "./continetsSlice";

const useStore = create(
  devtools(
      persist(
          (set) => ({
              ...counterSlice(set),   
              ...continentsSlice(set),
          }),
          {
              name: "store",
          }
      )
  )
);
export default useStore;