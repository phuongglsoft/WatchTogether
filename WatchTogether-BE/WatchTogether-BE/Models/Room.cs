namespace WatchTogether_BE.Models
{
    public class Room
    {
        public string RoomCode { get; set; } = string.Empty;
        public string Video { get; set; } = string.Empty;
        public List<string> Users { get; set; } = new List<string>();
    }
}
