namespace WatchTogether_BE.Services.UserConnectionService
{
    public class UserConnectionService : IUserConnectionService
    {
        private readonly Dictionary<string, string> _dict = new Dictionary<string, string>();
        public void AddUserConnection(string connectionId, string userName)
        {
            _dict.Add(connectionId, userName);
        }

        public string? GetUserNameByConnectionId(string connectionId)
        {
            _dict.TryGetValue(connectionId, out string? userName);
            return userName;
        }

        public void RemoveUserConnection(string connectionId)
        {
            _dict.Remove(connectionId);
        }
    }
}
