using System.Text;
using WatchTogether_BE.Models;

namespace WatchTogether_BE.Services.RoomService
{
    public class RoomService : IRoomService
    {
        private readonly Dictionary<string, Room> _roomDictionary = new Dictionary<string,Room>();
        private readonly Random random = new Random();
        public Room CreateNewRoom(string userName)
        {
            var newRoomCode = GenerateRoomCode();
            List<string> users = new()
            {
                userName
            };
            var newRoom = new Room { RoomCode = newRoomCode, Users = users };
            _roomDictionary.Add(newRoomCode, newRoom);
            return newRoom;
        }

        public Room JoinRoom(string roomCode, string userName)
        {
            Room room = _roomDictionary[roomCode];
            room.Users.Add(userName);
            return room;
        }

        public Room LeaveRoom(string roomCode, string userName)
        {
            Room room = _roomDictionary[roomCode];
            room.Users.Remove(userName);
            return room;
        }

        public void RemoveUserFromRoom(string roomCode, string userName)
        {
            _roomDictionary[roomCode].Users.Remove(userName);
        }

        public Room SelectVideo(string roomCode, string video)
        {
            Room room = _roomDictionary[roomCode];
            room.Video = video;
            return room;
        }

        public Room? UserDisconnected(string userName)
        {
            var room = _roomDictionary.FirstOrDefault(key => key.Value.Users.Contains(userName)).Value;
            if(room is not null)
            {
                room.Users.Remove(userName);
                return room;
            }
            return default;
        }

        private string GenerateRoomCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder stringBuilder = new StringBuilder();

            for (int i = 0; i < 5; i++)
            {
                stringBuilder.Append(chars[random.Next(chars.Length)]);
            }

            return stringBuilder.ToString();
        }
    }
}
