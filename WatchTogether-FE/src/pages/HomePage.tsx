
import { useUserStore } from '../store/user-store'
import { useEffect } from 'react';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { InvokeServerFunction, Room } from '../type/type';
import { useHubConnectionStore } from '../store/hub-store';
import { useRoomStore } from '../store/room-store';
import { Outlet } from 'react-router-dom';
const BASEURL = 'ws://localhost:5165'
function HomePage() {
    const { userName } = useUserStore();
    const { connect, disconnect } = useHubConnectionStore();
    const { setRoom, removeRoom } = useRoomStore();


    useEffect(() => {
        connectHub();
        async function connectHub() {
            try {
                const newConnection = new HubConnectionBuilder()
                    .withUrl(`${BASEURL}/hub`, { skipNegotiation: true, transport: HttpTransportType.WebSockets, withCredentials: true })
                    .configureLogging(LogLevel.Information)
                    .withAutomaticReconnect()
                    .build();
                newConnection.on('RoomCreated', (room: Room) => {
                    console.log('RoomCreated', room);
                    setRoom(room);
                });
                newConnection.on('JoinedRoom', (room: Room) => {
                    console.log('JoinedRoom', room);
                    setRoom(room);
                })
                newConnection.on('VideoSelected', (room: Room) => {
                    console.log('VideoSelected', room);
                    setRoom(room);
                })
                newConnection.on('LeavedRoom', (room: Room) => {
                    console.log('LeavedRoom', room);
                    setRoom(room);
                })


                await newConnection.start().then(() => console.info('Hub connection established'));
                await newConnection.invoke(InvokeServerFunction.connect, userName);

                connect(newConnection);
            } catch (err) {
                console.log(err)
            }
        }
        return () => {
            removeRoom();
            disconnect();
        }
    }, [])

    return (
        <Outlet />
    )
}

export default HomePage