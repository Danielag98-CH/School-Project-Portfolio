using Microsoft.EntityFrameworkCore;
using GonzalezNorthwind.Models.Entities;

namespace GonzalezNorthwind.Data;

public class ApplicationDbContext : DbContext {

  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options) {
  }
  public DbSet<Category> Categories { get; set; } = default!;
  public DbSet<Customer> Customers { get; set; } = default!;
  public DbSet<CustomerCustomerDemo> CustomerCustomerDemos { get; set; } = default!;
  public DbSet<CustomerDemographic> CustomerDemographics { get; set; } = default!;
  public DbSet<Employee> Employees { get; set; } = default!;
  public DbSet<EmployeeTerritory> EmployeeTerritories { get; set; } = default!;
  public DbSet<Order> Orders { get; set; } = default!;
  public DbSet<OrderDetail> OrderDetails { get; set; } = default!;
  public DbSet<Product> Products { get; set; } = default!;
  public DbSet<Region> Regions { get; set; } = default!;
  public DbSet<Shipper> Shippers { get; set; } = default!;
  public DbSet<Supplier> Suppliers { get; set; } = default!;
  public DbSet<Territory> Territories { get; set; } = default!;

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    // Configure composite key for CustomerCustomerDemo
    modelBuilder.Entity<CustomerCustomerDemo>()
      .HasKey(cc => new { cc.CustomerId, cc.CustomerTypeId });

    // Configure composite key for EmployeeTerritory
    modelBuilder.Entity<EmployeeTerritory>()
      .HasKey(et => new { et.EmployeeId, et.TerritoryId });

    // Configure composite key for OrderDetail
    modelBuilder.Entity<OrderDetail>()
      .HasKey(od => new { od.OrderId, od.ProductId });

    // Configure Employee self-referencing relationship
    modelBuilder.Entity<Employee>()
      .HasOne(e => e.Manager)
      .WithMany(e => e.Subordinates)
      .HasForeignKey(e => e.ReportsTo)
      .OnDelete(DeleteBehavior.Restrict);
  }
}