using Microsoft.EntityFrameworkCore;

namespace GonzalezNorthwind.Data;

public static class SeedData {
  public static async Task Initialize(IServiceProvider serviceProvider) {

    using (var context = new ApplicationDbContext(
      serviceProvider.GetRequiredService<
        DbContextOptions<ApplicationDbContext>>())) {

      // Verify if data exists, beginning with the first table in the script:
      if (context.Categories.Any()) {
        return; // DB has already been seeded
      }

      // Define the path to the SQL script and read its contents:
      string sqlScriptPath = Path.Combine(AppContext.BaseDirectory, "Data", "northwinds_seed_data.sql");
      string sqlScript = await File.ReadAllTextAsync(sqlScriptPath);
      
      // Execute the SQL script to seed the database and save changes:
      await context.Database.ExecuteSqlRawAsync(sqlScript);

      // // Split the SQL script into individual statements and execute each one:
      // var statements = sqlScript.Split(new[] { ";\r\n", ";\n" }, StringSplitOptions.RemoveEmptyEntries);
      
      // foreach (var statement in statements) {
      //   var trimmedStatement = statement.Trim();
      //   if (!string.IsNullOrWhiteSpace(trimmedStatement)) {
      //     try {
      //       await context.Database.ExecuteSqlRawAsync(trimmedStatement);
      //     } catch (Exception ex) {
      //       Console.WriteLine($"Error executing SQL: {ex.Message}");
      //       Console.WriteLine($"Statement: {trimmedStatement.Substring(0, Math.Min(100, trimmedStatement.Length))}...");
      //       throw;
      //     }
      //   }
      // }
      await context.SaveChangesAsync();
    }
  }
}

//extra code to decode later.