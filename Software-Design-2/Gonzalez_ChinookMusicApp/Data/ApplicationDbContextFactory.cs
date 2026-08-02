using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Gonzalez_ChinookMusicApp.Data {
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext> {
        public ApplicationDbContext CreateDbContext(string[] args) {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            
            optionsBuilder.UseSqlite("Data Source=chinook.db");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}