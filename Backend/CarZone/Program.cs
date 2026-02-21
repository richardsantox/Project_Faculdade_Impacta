using CarZone.src.Context;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Configura a conexão com o banco de dados
builder.Services.AddDbContext<CarZoneContexto>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
