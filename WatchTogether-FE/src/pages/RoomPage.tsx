import { Box, IconButton, Typography } from '@mui/material'
import { useRoomStore } from '../store/room-store'
import { Outlet } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';

function RoomPage() {
    const { room, setRoom } = useRoomStore();
    
    function handleBackClick() {
        if (!room) return;
        setRoom({ ...room, video: null });
    }

    return (
        <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center' padding={1}>
            <Box display='flex' width='55rem' height='100%' >
                <Box flex={2} border='1px solid lightgray' padding={1}>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Box display='flex' alignItems='center'>
                            {
                                room?.video && <IconButton onClick={handleBackClick}>
                                    <ArrowLeft size={24} />
                                </IconButton>
                            }
                            <Typography variant='h4'>Room</Typography>
                        </Box>
                        <Typography>{room?.roomCode}</Typography>
                    </Box>
                    <Typography variant='h4' marginTop={1}>Users</Typography>
                    {room?.users.map(user => <Box key={user} >
                        <Typography>{user}</Typography>
                    </Box>)}
                </Box>
                <Box flex={5} border='1px solid lightgray' padding={1} overflow='scroll'>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default RoomPage