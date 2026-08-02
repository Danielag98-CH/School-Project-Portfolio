using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Gonzalez_ChinookCrudApp.Data {
  public class ApplicationDbContextFactory
    : IDesignTimeDbContextFactory<ApplicationDbContext> {
    public ApplicationDbContext CreateDbContext(string[] args) {
      
      var config = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .Build();

      
     var conn = config.GetConnectionString("DefaultConnection");
      var opts = new DbContextOptionsBuilder<ApplicationDbContext>()
        .UseSqlite(conn)
        .Options;

      return new ApplicationDbContext(opts);
    }
  }
}
