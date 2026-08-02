using Gonzalez_ChinookMusicApp.Data;
using Gonzalez_ChinookMusicApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

using SQLitePCL;

namespace Gonzalez_ChinookMusicApp.Services;

public class SeedingService {

    private readonly ApplicationDbContext _context;

    public SeedingService(ApplicationDbContext context) {

        _context = context;
    }

    public async Task SeedDatabase() {
        if (_context.Albums.Any()
                || _context.Artists.Any()
                || _context.Customers.Any()
                || _context.Employees.Any()
                || _context.Genres.Any()
                || _context.Invoices.Any()
                || _context.InvoiceLines.Any()
                || _context.MediaTypes.Any()
                || _context.Playlists.Any()
                || _context.Tracks.Any()
        ) {
            return;
        }
 
        
        string sqlScriptPath = Path.Combine(AppContext.BaseDirectory, "Data", "chinook_data.sql");
            if (!File.Exists(sqlScriptPath)) {
            Console.WriteLine($" SQL file not found at {sqlScriptPath}");
            return;
}
    
       
        string sqlScript = await File.ReadAllTextAsync(sqlScriptPath);
 
        
        await _context.Database.ExecuteSqlRawAsync(sqlScript);
        
    }
}


