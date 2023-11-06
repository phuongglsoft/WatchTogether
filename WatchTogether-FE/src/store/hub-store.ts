import { create } from 'zustand';
import { HubConnection } from '@microsoft/signalr';
type HubStore = {
    connection?: HubConnection | null,
    connect: (newConnection: HubConnection) => void,
    disconnect: () => void,
}

export const useHubConnectionStore = create<HubStore>((set) => ({
    connection: null,
    connect: (newConnection: HubConnection) => set(() => ({ connection: newConnection })),
    disconnect: () => set(() => ({ connection: null }))
}));