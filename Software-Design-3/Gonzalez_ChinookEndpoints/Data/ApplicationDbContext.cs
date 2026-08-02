using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Gonzalez_ChinookEndpoints.Models.Entities;

namespace Gonzalez_ChinookEndpoints.Data;

public class ApplicationDbContext : DbContext {

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
      : base(options) {
    }
    public DbSet<Album> Albums { get; set; } = default!;
    public DbSet<Artist> Artists { get; set; } = default!;
    public DbSet<Customer> Customers { get; set; } = default!;
    public DbSet<Employee> Employees { get; set; } = default!;
    public DbSet<Genre> Genres { get; set; } = default!;
    public DbSet<Invoice> Invoices { get; set; } = default!;
    public DbSet<InvoiceLine> InvoiceLines { get; set; } = default!;
    public DbSet<MediaType> MediaTypes { get; set; } = default!;
    public DbSet<Playlist> Playlists { get; set; } = default!;
    public DbSet<Track> Tracks { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      modelBuilder.Entity<Playlist>()
        .HasMany(pl => pl.Tracks)
        .WithMany(t => t.Playlists)
        .UsingEntity<PlaylistTrack>();
    }
}