using System;
using System.Linq;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Gonzalez_ChinookEndpoints.Data;

namespace Gonzalez_ChinookEndpoints.Models;

public static class SeedData {
  public async static Task Initialize(IServiceProvider serviceProvider) {

    using (var context = new ApplicationDbContext(
      serviceProvider.GetRequiredService<
        DbContextOptions<ApplicationDbContext>>())) {

      // Verify if data exists, beginning with the first table in the script:
      if (context.Albums.Any()) {
        return; // DB has already been seeded
      }

      // Define the path to the SQL script and read its contents:
      string sqlScriptPath = Path.Combine(AppContext.BaseDirectory, "Data", "chinook_data.sql");
      string sqlScript = await File.ReadAllTextAsync(sqlScriptPath);
      
      // Execute the SQL script to seed the database and save changes:
      await context.Database.ExecuteSqlRawAsync(sqlScript);
      await context.SaveChangesAsync();
    }
  }
}

