using Microsoft.EntityFrameworkCore;
using Gonzalez_ChinookCrudApp.Models.Entities;
using Microsoft.EntityFrameworkCore.Design;


namespace Gonzalez_ChinookCrudApp.Data;

public class ApplicationDbContext : DbContext {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options) { }

    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
    //     if (!optionsBuilder.IsConfigured) {

    //         var dbPath = Path.Combine(AppContext.BaseDirectory, "chinook.db");
    //         optionsBuilder.UseSqlite($"Data Source={dbPath}");

    //     }
    // }

    public DbSet<Album> Albums { get; set; } = null!;
    public DbSet<Artist> Artists { get; set; } = null!;
    public DbSet<Customer> Customers { get; set; } = null!;
    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<Genre> Genres { get; set; } = null!;
    public DbSet<MediaType> MediaTypes { get; set; } = null!;
    public DbSet<Playlist> Playlists { get; set; } = null!;
    public DbSet<Track> Tracks { get; set; } = null!;
    public DbSet<Invoice> Invoices { get; set; } = null!;
    public DbSet<InvoiceLine> InvoiceLines { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Playlist>()
         .HasMany(p => p.Tracks)
         .WithMany(t => t.Playlists)
         .UsingEntity<Dictionary<string, object>>(
             "PlaylistTracks",
             right => right.HasOne<Track>().WithMany().HasForeignKey("TrackId"),
             left => left.HasOne<Playlist>().WithMany().HasForeignKey("PlaylistId"),
             join => {
                 join.HasKey("PlaylistId", "TrackId");
                 join.Property<int>("PlaylistId");
                 join.Property<int>("TrackId");

            });

    }
}