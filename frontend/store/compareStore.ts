import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
  compareIds: string[];
  addCollege: (id: string) => boolean; // returns true if added, false if limit reached
  removeCollege: (id: string) => void;
  toggleCompare: (id: string) => { success: boolean; action: "added" | "removed" | "none" };
  isComparing: (id: string) => boolean;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareIds: [],
      addCollege: (id) => {
        const { compareIds } = get();
        if (compareIds.includes(id)) return true;
        if (compareIds.length >= 3) return false; // Limit to 3 colleges
        set({ compareIds: [...compareIds, id] });
        return true;
      },
      removeCollege: (id) => {
        const { compareIds } = get();
        set({ compareIds: compareIds.filter((item) => item !== id) });
      },
      toggleCompare: (id) => {
        const { compareIds, addCollege, removeCollege } = get();
        if (compareIds.includes(id)) {
          removeCollege(id);
          return { success: true, action: "removed" };
        } else {
          const success = addCollege(id);
          return { success, action: success ? "added" : "none" };
        }
      },
      isComparing: (id) => {
        return get().compareIds.includes(id);
      },
      clearCompare: () => set({ compareIds: [] }),
    }),
    {
      name: "college-discovery-compare",
    }
  )
);
