using System.ComponentModel.DataAnnotations;

namespace WatchTogether_BE.Models
{
    public class SelectVideoRequest
    {
        [Required]
        public string RoomCode { get; set; } = string.Empty;
        [Required]
        public string Video { get; set; } = string.Empty;
    }
}
