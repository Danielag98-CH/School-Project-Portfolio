using Microsoft.EntityFrameworkCore;
using GonzalezNorthwind.Data;
using GonzalezNorthwind.Services.Mapping;
using GonzalezNorthwind.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Provides endpoint metadata
builder.Services.AddEndpointsApiExplorer();

// Generates Swagger docs + UI
builder.Services.AddSwaggerGen();

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Register Mapping Services
builder.Services.AddScoped<CustomerMappingService>();
builder.Services.AddScoped<CategoryMappingService>();
builder.Services.AddScoped<ProductMappingService>();

// Register Business Logic Services
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<ProductService>();

// Register ApplicationDbContext with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("ApplicationDbContext")
    ?? throw new InvalidOperationException("Connection string 'ApplicationDbContext' not found.")));

var app = builder.Build();

// Seed the database
using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;
    await SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

// Add this else to have these lines only occur during development.
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