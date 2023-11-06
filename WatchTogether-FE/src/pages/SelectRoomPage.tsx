import { Box, Button, TextField, Typography } from '@mui/material'
import { useHubConnectionStore } from '../store/hub-store';
import { InvokeServerFunction, JoinRoomRequest } from '../type/type';
import { useUserStore } from '../store/user-store';
import { useState } from 'react';
function SelectRoomPage() {
    const { connection } = useHubConnectionStore();
    const { removeName, userName } = useUserStore();
    const [roomCode, setRoomCode] = useState('');
    function createRoom() {
        if (!connection) {
            throw new Error("Not connect to server");
        }
        connection.invoke(InvokeServerFunction.createRoom, userName);
    }
    function handleJoinRoom(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!roomCode) return;
        if (!connection) {
            throw new Error("Not connect to server");
        }
        const request: JoinRoomRequest = {
            roomCode,
            userName: userName!
        }
        connection.invoke(InvokeServerFunction.joinRoom, request);
    }
    return (
        <Box width='100%' height='100vh' display='flex' alignContent='center' justifyContent='center'>
            <Box display='flex' alignContent='center' justifyContent='center' flexDirection='column' gap={2}>

                <Button onClick={createRoom} variant='contained'>Create Room</Button>
                <Typography textAlign='center'>or</Typography>
                <form onSubmit={handleJoinRoom}>
                    <Box display='flex' alignItems='center' gap={1}>
                        <TextField label='Room Code' placeholder='Enter room code' value={roomCode} onChange={e => setRoomCode(e.target.value)} required />
                        <Button variant='outlined' type='submit'>Join Room</Button>
                    </Box>
                </form>
                <Button onClick={removeName} variant='outlined' color='error' style={{ marginTop: '2rem' }}>Exit</Button>
            </Box>
        </Box>
    )
}

export default SelectRoomPage