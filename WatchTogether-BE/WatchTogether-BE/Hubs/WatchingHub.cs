using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.SignalR;
using WatchTogether_BE.Models;
using WatchTogether_BE.Services.RoomService;
using WatchTogether_BE.Services.UserConnectionService;

namespace WatchTogether_BE.Hubs
{
    public class WatchingHub : Hub
    {
        private readonly IRoomService _roomService;
        private readonly IUserConnectionService _userConnectionService;

        public WatchingHub(IRoomService roomService, IUserConnectionService userConnectionService)
        {
            _roomService = roomService;
            _userConnectionService = userConnectionService;
        }

        public void Connect(string userName)
        {
            _userConnectionService.AddUserConnection(Context.ConnectionId, userName);
        }

        public async Task CreateRoom(string userName)
        {
            Room room = _roomService.CreateNewRoom(userName);
            await Groups.AddToGroupAsync(Context.ConnectionId, room.RoomCode);
            await Clients.Client(Context.ConnectionId).SendAsync("RoomCreated", room);
        }

        public async Task JoinRoom(JoinRoomRequest request)
        {
            Room room = _roomService.JoinRoom(request.RoomCode, request.UserName);
            await Groups.AddToGroupAsync(Context.ConnectionId, request.RoomCode);
            await Clients.Group(request.RoomCode).SendAsync("JoinedRoom", room);
        }

        public async Task SelectVideo(SelectVideoRequest request)
        {
            Room room = _roomService.SelectVideo(request.RoomCode, request.Video);
            await Clients.Group(request.RoomCode).SendAsync("VideoSelected", room);
        }

        public async Task PlayVideo(string roomCode)
        {
            await Clients.Group(roomCode).SendAsync("VideoPlaying");
        }
        public async Task PauseVideo(string roomCode)
        {
            await Clients.Group(roomCode).SendAsync("VideoPaused");
        }

        public async Task Replay(string roomCode)
        {
            await Clients.Group(roomCode).SendAsync("Replayed");
        }
        public async Task ChangeTimeStamp(AddTimeRequest request)
        {
            await Clients.Group(request.RoomCode).SendAsync("TimeStampChanged", request.TimeStamp);
        }


        public async Task LeaveRoom(LeaveRoomRequest request)
        {
            Room room = _roomService.LeaveRoom(request.RoomCode, request.UserName);
            await Groups.RemoveFromGroupAsync(request.RoomCode, request.UserName);
            await Clients.Group(request.RoomCode).SendAsync("LeavedRoom", room);
        }

        public async override Task OnDisconnectedAsync(Exception? exception)
        {
            var userName = _userConnectionService.GetUserNameByConnectionId(Context.ConnectionId);
            if (userName is not null)
            {
                var room = _roomService.UserDisconnected(userName);
                if (room is not null)
                {
                    await Clients.Group(room.RoomCode).SendAsync("LeavedRoom", room);
                }
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}
