import { create } from 'zustand';

type UserStore = {
    userName?: string | null,
    setName: (newUserName: string) => void,
    removeName: () => void,
}

export const useUserStore = create<UserStore>((set) => ({
    userName: null,
    setName: (newUserName: string) => set(() => ({ userName: newUserName })),
    removeName: () => set(() => ({ userName: null }))
}));