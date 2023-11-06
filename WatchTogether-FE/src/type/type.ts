export type Room = {
    roomCode: string,
    video?: string | null,
    users: string[],
}

export type JoinRoomRequest = {
    userName: string,
    roomCode: string,
}

export type LeaveRoomRequest = {
    userName: string,
    roomCode: string
}

export const InvokeServerFunction = {
    connect: 'Connect',
    joinRoom: 'JoinRoom',
    leaveRoom: 'LeaveRoom',
    createRoom: 'createRoom',
    selectVideo: 'SelectVideo',
    playVideo: 'PlayVideo',
    pauseVideo: 'PauseVideo',
    addTime: 'AddTime',
    replay: 'Replay'
}

export type Movie = {
    code: number,
    name: string,
    src: string,
    thumpNail: string,

}

export enum VideoStatus {
    Playing,
    Paused,
    Ended
}

export type AddTime = {
    roomCode: string,
    timeStamp: number
}