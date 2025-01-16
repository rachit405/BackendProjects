
//using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Rate_Limiter.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Rate Limiter for users based on IP Address

// registering my custom mddleware

builder.Services.AddSingleton<FixedWindowRateLimiterMiddleware>(provider => 
{
    var next = provider.GetRequiredService<RequestDelegate>();

    // Create and return the middleware instance with parameters like rate limit and time window
    return new FixedWindowRateLimiterMiddleware(next, 10, TimeSpan.FromMinutes(1));
});

/*
builder.Services.AddRateLimiter(options =>{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy<string>("fixedIP", httpContext =>
    {
       return  RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown-ip", 
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromSeconds(10)
            });
    });
});

*/

/* // Added a RateLimiter service for all users, to make it user specific we need to add a user identifier eg. IP address
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("Fixed", o=>
    {
        o.PermitLimit = 5;
        o.Window = TimeSpan.FromSeconds(10);
    });
});
*/

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();
//app.UseRateLimiter();
app.UseMiddleware<FixedWindowRateLimiterMiddleware>(5, TimeSpan.FromSeconds(20));
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
