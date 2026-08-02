using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using SchoolSystemCycling.Data;
using SchoolSystemCycling.Models.Entities;
using SchoolSystemCycling.Services;

ServiceProvider _serviceProvider;
SeedingService _seedingService;
BasicQueryService _basicQueryService;

// Create container to hold services for dependency injection
var services = new ServiceCollection();

// Add services to service container
services.AddDbContext<ApplicationDbContext>();
services.AddScoped<SeedingService>();
services.AddScoped<BasicQueryService>();

/*
    Get the service provider - this is our way to take something
    out of the container.
*/
_serviceProvider = services.BuildServiceProvider();

// Retrieve instance of SeedingService from the container
_seedingService = _serviceProvider.GetRequiredService<SeedingService>();

// Retrieve instance of BasicQueryService from the container
_basicQueryService = _serviceProvider.GetRequiredService<BasicQueryService>();

// Call method to seed the database.
await _seedingService.SeedDatabase();

JsonSerializerOptions jsonOptions = new JsonSerializerOptions { WriteIndented = true };

Console.WriteLine("\n=============== GetInstructorByIdWithDept()=================");

Instructor? instructorWithDept = await _basicQueryService
    .GetInstructorByIdWithDept(3);


Console.WriteLine($"1 {instructorWithDept}");

Console.WriteLine($"\n2 Instructor : {instructorWithDept.LastName} in Dept: {instructorWithDept.Department.Name}");

Console.WriteLine($"\n3 {instructorWithDept.Department}");

Console.WriteLine($"\n4 Instr Obj Serialized {JsonSerializer.Serialize(instructorWithDept)}"); // this is stingifying (creating a list of objects w/JSON)
//causing cycling: because it keeps looping the instuctor and department db; it needs to get all the info and causes an overload

//get around it using DTO's(Data Transfer Objects)-> defines how the data wll be sent over the network. create a DTO that has what you need


// to fix this issue comment out "public virtual ICollection<Instructor> Instructors { get; set; } = new List<Instructor>();" in Department.cs


