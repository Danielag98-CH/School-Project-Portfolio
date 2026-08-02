using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using Gonzalez_ChinookEnhancedQueries.Data;


namespace Gonzalez_ChinookEnhancedQueries.Services {

    public class SeedingService {
        private readonly ApplicationDbContext _context;

        public SeedingService(ApplicationDbContext context) {
            _context = context;
        }

        public async Task SeedDatabase() {

            await _context.Database.MigrateAsync();

            if (/*await*/ _context.Albums.Any()
                || /*await*/ _context.Artists.Any()
                || /*await*/ _context.Customers.Any()
                || /*await*/ _context.Employees.Any()
                || /*await*/ _context.Genres.Any()
                || /*await*/ _context.Invoices.Any()
                || /*await*/ _context.InvoiceLines.Any()
                || /*await*/ _context.MediaTypes.Any()
                || /*await*/ _context.Playlists.Any()
                || /*await*/ _context.Tracks.Any())

            {
                return;
            }


            // Define the path to the SQL script file:
            string sqlScriptPath = Path.Combine(AppContext.BaseDirectory, "Data", "chinook_data.sql");


            // Console.WriteLine($"Reading SQL script from: {sqlScriptPath}");
            if (!File.Exists(sqlScriptPath)) {
                Console.WriteLine($"SQL script file not found: {sqlScriptPath}");
                return;
            }

            string sqlScript = await File.ReadAllTextAsync(sqlScriptPath);
            // var script = await File.ReadAllTextAsync(sqlScriptPath);

            await _context.Database.ExecuteSqlRawAsync(sqlScript);
            // await _context.SaveChangesAsync();
        }
    }
}