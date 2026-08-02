using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Gonzalez_BankApp.Data {
  public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext> {
    public ApplicationDbContext CreateDbContext(string[] args) {
      var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

      optionsBuilder.UseSqlite("Data Source=bank.db");

      return new ApplicationDbContext(optionsBuilder.Options);
    }
  }
}
