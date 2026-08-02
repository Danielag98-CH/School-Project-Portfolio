using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using Gonzalez_BankApp.Data;

namespace Gonzalez_BankApp.Services;

public class SeedingService {
    private readonly ApplicationDbContext _context;

    public SeedingService(ApplicationDbContext context) {
        _context = context;
    }
    public async Task SeedDatabase() {
    
        // await _context.Database.MigrateAsync();

        if (   _context.Customers.Any()
            || _context.Accounts.Any()
            || _context.CreditCards.Any() )
            return;

        string sqlScriptPath = Path.Combine(AppContext.BaseDirectory, "Data", "creation.sql");

        if (!File.Exists(sqlScriptPath)) {
            Console.WriteLine($"SQL script file not found: {sqlScriptPath}");
            return;
        }

        string sqlScript = await File.ReadAllTextAsync(sqlScriptPath);

        await _context.Database.ExecuteSqlRawAsync(sqlScript);
    }
    
}