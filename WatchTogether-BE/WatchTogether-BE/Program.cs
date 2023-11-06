using WatchTogether_BE.Hubs;
using WatchTogether_BE.Services.RoomService;
using WatchTogether_BE.Services.UserConnectionService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IRoomService, RoomService>();
builder.Services.AddSingleton<IUserConnectionService, UserConnectionService>();
builder.Services.AddSignalR();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();
app.MapHub<WatchingHub>("/hub");
app.MapControllers();
app.Run();
