import { Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { useUserStore } from './store/user-store'
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import SelectRoomPage from './pages/SelectRoomPage';
import { useRoomStore } from './store/room-store';
import WatchMovie from './components/WatchMovie';
import SelectMovie from './components/SelectMovie';

function App() {
  const { userName } = useUserStore();
  const { room } = useRoomStore();
  return (
    <Routes>
      <Route path="/register" element={userName ? <Navigate to="/home" /> : <RegisterPage />} />
      <Route path="/home" element={userName ? <HomePage /> : <Navigate to="/register" />}>
        <Route index element={room ? <Navigate to={`/home/room/${room.roomCode}`} /> : <SelectRoomPage />} />
        <Route path="room/:roomCode" element={room ? <RoomPage /> : <Navigate to="/home" />}>
          <Route index element={room?.video ? <Navigate to={`/home/room/${room.roomCode}/video/${room.video}`} /> : <SelectMovie />} />
          <Route path="video/:videoId" element={room?.video ? <WatchMovie /> : <Navigate to={`/home/room/${room?.roomCode}`} />} />
        </Route>
      </Route>
      <Route index element={userName ? <Navigate to="/home" /> : <RegisterPage />} />
    </Routes>

  )
}

export default App
