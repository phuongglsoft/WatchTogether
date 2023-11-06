using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.ComponentModel.DataAnnotations;

namespace WatchTogether_BE.Models
{
    public class JoinRoomRequest
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string RoomCode { get; set; } = string.Empty;
    }
}
