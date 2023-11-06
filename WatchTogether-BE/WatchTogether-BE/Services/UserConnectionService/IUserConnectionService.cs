namespace WatchTogether_BE.Services.UserConnectionService
{
    public interface IUserConnectionService
    {
        void AddUserConnection(string connectionId,string userName);
        void RemoveUserConnection(string connectionId);
        string? GetUserNameByConnectionId(string connectionId);
    }
}
