using FluentValidation;
using WebApp_FluentValidation.Controllers;
using WebApp_FluentValidation.Models;   
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using FluentValidation.AspNetCore;
using System.Reflection;


var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly , includeInternalTypes: true);
/*builder.Services.AddControllers().AddFluentValidation( fv => {
    fv.AutomaticValidationEnabled = false;
    fv.RegisterValidatorsFromAssembly(typeof(Program).Assembly , includeInternalTypes : true);
}); */
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseRouting();

//app.UseAuthorization();

app.MapControllers(); // Maps attributes routes like [Route]

//app.MapControllers();

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
