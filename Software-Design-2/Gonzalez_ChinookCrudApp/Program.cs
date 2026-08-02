using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Gonzalez_ChinookCrudApp.Data;
using Gonzalez_ChinookCrudApp.Models.Entities;
using Gonzalez_ChinookCrudApp.Interfaces;
using Gonzalez_ChinookCrudApp.Services;
using Microsoft.EntityFrameworkCore;

ServiceProvider _serviceProvider;
SeedingService _seedingService;
CrudService _crudService;
VerifyService _verifyService;

var services = new ServiceCollection();

var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "chinook.db");
services.AddDbContext<ApplicationDbContext>(opts =>
    opts.UseSqlite($"Data Source={dbPath}"));


// services.AddDbContext<ApplicationDbContext>();
services.AddScoped<SeedingService>();
services.AddScoped<CrudService>();
services.AddScoped<VerifyService>();

// services.AddSingleton<IDesignTimeDbContextFactory<ApplicationDbContext>, ApplicationDbContextFactory>();

// services.AddScoped(sp => {
//     var factory = sp.GetRequiredService<IDesignTimeDbContextFactory<ApplicationDbContext>>();
//     return factory.CreateDbContext(Array.Empty<string>());
// });


_serviceProvider = services.BuildServiceProvider();


_seedingService = _serviceProvider.GetRequiredService<SeedingService>();

_crudService = _serviceProvider.GetRequiredService<CrudService>();

_verifyService = _serviceProvider.GetRequiredService<VerifyService>();


await _seedingService.SeedDatabase();

JsonSerializerOptions jsonOptions = new JsonSerializerOptions { WriteIndented = true };

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

Console.WriteLine("===== CRUD SERVICE TESTS =====\n");

// // --- BASIC TESTS ---

Console.WriteLine(">> 1) Adding new customer...");
var customer = await _crudService.AddCustomerAsync("Test", "User", "testuser@example.com", 3);
Console.WriteLine($"Created customer: {customer.FirstName} {customer.LastName} with ID: {customer.CustomerId}");


Console.WriteLine(">> 2) Updating track price...");
bool updatedPrice = await _crudService.UpdateTrackPriceAsync(1, 2.99m);
Console.WriteLine($"Price update successful: {updatedPrice}");
var trackAfterUpdate = await _verifyService.GetTrackByIdAsync(1);
Console.WriteLine($"   => New price: {trackAfterUpdate?.UnitPrice}");


Console.WriteLine(">> 3) Creating new album for artist...");
var album = await _crudService.CreateAlbumForArtistAsync(1, "Test Album");
Console.WriteLine($"Created album: {album.Title} with ID: {album.AlbumId}");


Console.WriteLine(">> 4) Deleting a playlist...");
bool deleted = await _crudService.DeletePlaylistAsync(1);
Console.WriteLine($"Playlist deleted: {deleted}\n");



// // --- INTRICATE TESTS ---

Console.WriteLine(">> 5) Updating tracks by composer 'AC/DC' to $4.44...");
int updatedTracks = await _crudService.UpdateTracksByComposerAsync("AC/DC", 4.44m);
Console.WriteLine($"Updated {updatedTracks} track(s).");

Console.WriteLine("   => Verifying update...");
var acdcTracks = await _verifyService.GetTracksByComposerAsync("AC/DC");

foreach (var t in acdcTracks) {
    Console.WriteLine($"   - {t.Name} -> ${t.UnitPrice}");
}


Console.WriteLine("\n>> 6) Deleting customers from 'Canada'...");
int deletedCustomers = await _crudService.DeleteCustomersByCountryAsync("Canada");
Console.WriteLine($"Deleted {deletedCustomers} customer(s).");


Console.WriteLine("\n>> 7) Increasing prices of all tracks in genre ID 1 by 10%...");
int genreTracksUpdated = await _crudService.AdjustTrackPricesByGenreAsync(1, 10);
Console.WriteLine($"Updated {genreTracksUpdated} track(s).");


Console.WriteLine("\n>> 8) Deleting all empty playlists...");
int emptyDeleted = await _crudService.DeleteEmptyPlaylistsAsync();
Console.WriteLine($"Deleted {emptyDeleted} empty playlist(s).");


Console.WriteLine("\n>> 9) Renaming composer 'U2' to 'U2 (Legacy)'...");
int renamed = await _crudService.RenameComposerAsync("U2", "U2 (Legacy)");
Console.WriteLine($"Renamed {renamed} track(s).");

Console.WriteLine("   => Verifying rename...");
var renamedTracks = await _verifyService.GetTracksByComposerAsync("U2 (Legacy)");

foreach (var track in renamedTracks) {
    Console.WriteLine($"   - {track.Name} -> {track.Composer}");
}


Console.WriteLine("\n>> 10) Deleting customers with no invoices...");
int removed = await _crudService.DeleteCustomersWithNoInvoicesAsync();
Console.WriteLine($"Deleted {removed} customer(s) with no invoices.");


Console.WriteLine("\n>> 11) Renaming all albums with 'Rock' in the title (appending '[Updated]')...");
int albumsRenamed = await _crudService.RenameAlbumsContainingKeywordAsync("Rock", " [Updated]");
Console.WriteLine($"Renamed {albumsRenamed} album(s).");

Console.WriteLine("   => Sample result:");
var updatedAlbums = await _verifyService.GetAlbumsWithTitleContainingAsync("Rock");

foreach (var a in updatedAlbums) {
    Console.WriteLine($"   - {a.Title}");
}


Console.WriteLine("\n>> 12) Deleting tracks that have never been purchased...");
int unpurchased = await _crudService.DeleteTracksNotPurchasedAsync();
Console.WriteLine($"Deleted {unpurchased} unused track(s).");


Console.WriteLine("\n===== ALL TESTS COMPLETE =====");