using Microsoft.EntityFrameworkCore;
using Gonzalez_ChinookMusicApp.Models.Entities;
using Microsoft.EntityFrameworkCore.Design;

namespace Gonzalez_ChinookMusicApp.Data;

public class ApplicationDbContext : DbContext {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        if (!optionsBuilder.IsConfigured) {
            optionsBuilder.UseSqlite("Data Source=chinook.db");
        }
    }

    public DbSet<Artist> Artists { get; set; }
    public DbSet<Album> Albums { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<MediaType> MediaTypes { get; set; }
    public DbSet<Playlist> Playlists { get; set; }
    public DbSet<Track> Tracks { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<InvoiceLine> InvoiceLines { get; set; }

      
    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //     => optionsBuilder.UseSqlite("Data Source=chinook.db");
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