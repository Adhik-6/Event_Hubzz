import { create } from 'zustand';

export const useDataStore = create(set => ({
  count: 5,
  increase: () => set(state => state + 1)
})
);

