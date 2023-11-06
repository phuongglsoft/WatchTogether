using WatchTogether_BE.Models;

namespace WatchTogether_BE.Services.RoomService
{
    public interface IRoomService
    {
        Room CreateNewRoom(string userName);
        Room JoinRoom(string roomCode, string userName);

        void RemoveUserFromRoom(string roomCode, string userName);
        Room LeaveRoom(string roomCode, string userName);

        Room SelectVideo(string roomCode, string video);
        Room? UserDisconnected(string userName);
    }
}
