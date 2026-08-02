using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Gonzalez_BankApp.Models.Entities;

public class ApplicationDbContext : DbContext {
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options) { }

  public DbSet<Customer> Customers { get; set; }

  public DbSet<Account> Accounts { get; set; }

  public DbSet<CreditCard> CreditCards { get; set; }

  public DbSet<CustomerAccount> CustomerAccounts { get; set; }

  public DbSet<CustomerCreditCard> CustomerCreditCards { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {

    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Customer>().ToTable("Customer").HasKey(c => c.CustId);
    modelBuilder.Entity<Account>().ToTable("Account").HasKey(a => a.AccountId);
    modelBuilder.Entity<CreditCard>().ToTable("CreditCard").HasKey(cc => cc.CardId);

    modelBuilder.Entity<CustomerAccount>(entity => {
      entity.ToTable("CustomerAccount");
      entity.HasKey(ca => new { ca.CustId, ca.AccountId });
      entity.HasOne(ca => ca.Customer)
            .WithMany(c => c.CustomerAccounts)
            .HasForeignKey(ca => ca.CustId);
      entity.HasOne(ca => ca.Account)
            .WithMany(a => a.CustomerAccounts)
            .HasForeignKey(ca => ca.AccountId);
    });

    modelBuilder.Entity<CustomerCreditCard>(entity => {
      entity.ToTable("CustomerCreditCard");
      entity.HasKey(cc => new { cc.CustId, cc.CardId });
      entity.HasOne(cc => cc.Customer)
            .WithMany(c => c.CustomerCreditCards)
            .HasForeignKey(cc => cc.CustId);
      entity.HasOne(cc => cc.CreditCard)
            .WithMany(c => c.CustomerCreditCards)
            .HasForeignKey(cc => cc.CardId);
    });

  }

}