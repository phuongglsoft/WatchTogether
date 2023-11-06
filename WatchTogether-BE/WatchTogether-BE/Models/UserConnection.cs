using System.ComponentModel.DataAnnotations;

namespace WatchTogether_BE.Models
{
    public class UserConnection
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string ConnectionId { get; set; } = string.Empty;
    }
}
