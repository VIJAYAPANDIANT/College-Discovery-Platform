import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedState {
  savedIds: string[];
  saveCollege: (id: string) => void;
  unsaveCollege: (id: string) => void;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearSaved: () => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      saveCollege: (id) => {
        const { savedIds } = get();
        if (!savedIds.includes(id)) {
          set({ savedIds: [...savedIds, id] });
        }
      },
      unsaveCollege: (id) => {
        const { savedIds } = get();
        set({ savedIds: savedIds.filter((item) => item !== id) });
      },
      toggleSaved: (id) => {
        const { savedIds, saveCollege, unsaveCollege } = get();
        if (savedIds.includes(id)) {
          unsaveCollege(id);
        } else {
          saveCollege(id);
        }
      },
      isSaved: (id) => {
        return get().savedIds.includes(id);
      },
      clearSaved: () => set({ savedIds: [] }),
    }),
    {
      name: "college-discovery-saved",
    }
  )
);
