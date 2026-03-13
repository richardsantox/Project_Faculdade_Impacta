using CarZone.src.Context;
using CarZone.src.Repositories;
using CarZone.src.Repositories.Implementations;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using System;

var builder = WebApplication.CreateBuilder(args);

// Configura a conex�o com o banco de dados
builder.Services.AddDbContext<CarZoneContexto>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adiciona serviços do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CarZone API",
        Version = "v1",
        Description = "API do CarZone"
    });
});


// Add services to the container.
builder.Services.AddScoped<IVeiculo, VeiculoRepositorio>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", builder =>
    {
        builder.WithOrigins("http://127.0.0.1:5500", "http://localhost:3000") // Live Server és outras origens
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Minha API v1");
        c.RoutePrefix = string.Empty; // Swagger na raiz do site
    });
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowLocalhost");
app.MapControllers();

app.UseStaticFiles();
app.MapControllers();

app.Run();
