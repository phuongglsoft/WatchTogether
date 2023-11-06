import { create } from 'zustand';
import { Room } from '../type/type';

type RoomStore = {
    room?: Room | null,
    setRoom: (room: Room) => void,
    removeRoom: () => void,
}

export const useRoomStore = create<RoomStore>((set) => ({
    room: null,
    setRoom: (room: Room) => set(() => ({ room })),
    removeRoom: () => set(() => ({ room: null }))
}));