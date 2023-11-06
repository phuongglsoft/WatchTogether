import { Box, Typography } from '@mui/material';
import { movies } from '../utils/movies';
import { useHubConnectionStore } from '../store/hub-store';
import { InvokeServerFunction } from '../type/type';
import { useRoomStore } from '../store/room-store';
function SelectMovie() {
    const { connection } = useHubConnectionStore();
    const { room } = useRoomStore();

    function handleVideoSelect(video: string) {
        console.log(video);
        if (!connection) {
            throw new Error('Not connect to server');
        }
        if (!room) {
            throw new Error('Room is null');
        }
        connection.invoke(InvokeServerFunction.selectVideo, {
            roomCode: room.roomCode,
            video: video,
        })
    }

    return (
        <Box>
            <Typography variant='h4' marginBottom={2} textAlign='center'>Select your movie</Typography>
            <Box display='grid' gridTemplateColumns='repeat(auto-fill, 17rem)' gap={2}>
                {movies.map(movie => <Box onClick={() => handleVideoSelect(movie.code.toString())} key={movie.name} sx={{ cursor: 'pointer' }} border='1px solid gray' padding={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' borderRadius={4}>
                    <img src={movie.thumpNail} style={{ maxWidth: ' 15rem' }} />
                    <Typography variant='h6'>{movie.name}</Typography>
                </Box>)}
            </Box>
        </Box>

    )
}

export default SelectMovie