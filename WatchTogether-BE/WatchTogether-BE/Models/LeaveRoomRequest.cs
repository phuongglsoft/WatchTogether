using System.ComponentModel.DataAnnotations;

namespace WatchTogether_BE.Models
{
    public class LeaveRoomRequest
    {
        [Required]
        public string RoomCode { get; set; } = string.Empty;
        [Required]
        public string UserName { get; set; } = string.Empty;
    }
}
