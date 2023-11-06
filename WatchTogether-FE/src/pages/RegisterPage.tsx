import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useUserStore } from '../store/user-store';

function RegisterPage() {
    const [name, setName] = useState('');
    const { setName: setUserName } = useUserStore();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!name) return;
        setUserName(name);
    }
    return (
        <Box width='100%' height='100vh' alignItems='center' justifyContent='center' display={'flex'}>
            <form onSubmit={handleSubmit}>
                <Box display={'flex'} flexDirection='column' gap={1} border={'1px solid lightgray'} padding={2} borderRadius={'10px'}>
                <Typography variant='subtitle1'>Enter your name</Typography>
                    <TextField label='Name' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
                    <Button variant='contained' type='submit'>Ok</Button>
                </Box>
            </form>
        </Box>
    )
}

export default RegisterPage