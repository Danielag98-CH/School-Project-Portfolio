using System.Text.Json.Serialization;
using Gonzalez_ChinookEndpoints.Data;
using Gonzalez_ChinookEndpoints.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services
  .AddControllersWithViews()
  .AddJsonOptions(options =>
  {
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
  });


// Add services to the container.
builder.Services.AddControllersWithViews();

// Provides endpoint metadata
builder.Services.AddEndpointsApiExplorer();

// Generates Swagger docs + UI
builder.Services.AddSwaggerGen();

// Register ApplicationDbContext with SQLite provider
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("ApplicationDbContext")
    ?? throw new InvalidOperationException("Connection string 'ApplicationDbContext' not found.")));


var app = builder.Build();

// Seed the database.
using (var scope = app.Services.CreateScope()) {
    // await using (var scope = app.Services.CreateAsyncScope()) {    
    var services = scope.ServiceProvider;

    await SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
} else {
    // Generates swagger.json
    app.UseSwagger();
    // Serves the Swagger UI at /swagger
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
