using System.ComponentModel.DataAnnotations;

namespace WatchTogether_BE.Models
{
    public class AddTimeRequest
    {
        [Required]
        public string RoomCode { get; set; } = string.Empty;
        [Required]
        public float TimeStamp { get; set; }
    }
}
