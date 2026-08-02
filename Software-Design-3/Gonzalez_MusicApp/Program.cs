using Gonzalez_MusicApp.Services;
using DotNetEnv;

// This is to read the .env file.
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Adding Spotify service as a singleton.
builder.Services.AddSingleton<SpotifyApiService>(); //one instance exists for the entire duration of the lifetime of the app//
// can do addScoped for instances of accessing the server --for every new request a new instance is viewed - must create a database to record instances--//

// Provides endpoint metadata
builder.Services.AddEndpointsApiExplorer();

// Generates Swagger docs + UI
builder.Services.AddSwaggerGen();

var app = builder.Build(); 

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

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();