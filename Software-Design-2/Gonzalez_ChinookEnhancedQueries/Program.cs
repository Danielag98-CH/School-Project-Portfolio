using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Gonzalez_ChinookEnhancedQueries.Data;
using Gonzalez_ChinookEnhancedQueries.Models.Entities;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.CountryDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.CustomerDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.MusicDtos;
using Gonzalez_ChinookEnhancedQueries.Services;
using Microsoft.EntityFrameworkCore;

ServiceProvider _serviceProvider;
SeedingService _seedingService;
EnhancedQueryService _queryService;

var services = new ServiceCollection();

var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "chinook.db");
services.AddDbContext<ApplicationDbContext>(opts =>
    opts.UseSqlite($"Data Source={dbPath}"));
// Console.WriteLine("Opening DB at: " + Path.GetFullPath(dbPath));



// services.AddDbContext<ApplicationDbContext>();
services.AddScoped<SeedingService>();
services.AddScoped<EnhancedQueryService>();



_serviceProvider = services.BuildServiceProvider();


_seedingService = _serviceProvider.GetRequiredService<SeedingService>();

_queryService = _serviceProvider.GetRequiredService<EnhancedQueryService>();




await _seedingService.SeedDatabase();

JsonSerializerOptions jsonOptions = new JsonSerializerOptions { WriteIndented = true };

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


Console.WriteLine();

var result1 = await _queryService.CustomersGroupedBySupportRepAsync();
Console.WriteLine("1) CustomersGroupedBySupportRepAsync:");
foreach (var elem in result1) {
    Console.WriteLine($"Rep: {elem.Key} => {elem.Value.Count} customers");
}

var result2 = await _queryService.GetCustomersByCountry();
Console.WriteLine("\n2) GetCustomersByCountry:");
foreach (var elem in result2) {
    Console.WriteLine($"{elem.Key}: {elem.Value.Count} customers");
}

var result3 = await _queryService.TrackCountByAlbumAsync();
Console.WriteLine("\n3) TrackCountByAlbumAsync:");
foreach (var elem in result3) {
    Console.WriteLine($"{elem.Key}: {elem.Value} tracks");
}

var result4 = await _queryService.TopThreeAlbumsMostTracks();
Console.WriteLine("\n4) TopThreeAlbumsMostTracks:");
foreach (var album in result4) {
    Console.WriteLine($"{album.Title}: {album.TrackCount} tracks");
}

var result5 = await _queryService.TracksByComposer();
Console.WriteLine("\n5) TracksByComposer:");
foreach (var elem in result5) {
    Console.WriteLine($"Composer: {elem.Key}, Tracks: {elem.Value.Count}");
}

var result6 = await _queryService.ComposersAndTracks();
Console.WriteLine("\n6) ComposersAndTracks:");
foreach (var composer in result6) {
    Console.WriteLine($"{composer.Name}: {composer.TrackCount} tracks");
}

var result7 = await _queryService.GetTracksByGenreAsync("Rock");
Console.WriteLine("\n7) GetTracksByGenreAsync(\"Rock\"):");
Console.WriteLine($"Found {result7.Count} tracks");

var result8 = await _queryService.GetTracksLongerThanAsync(300);
Console.WriteLine("\n8) GetTracksLongerThanAsync(300):");
Console.WriteLine($"Found {result8.Count} tracks");

var result9 = await _queryService.FiveMostExpensiveTracks();
Console.WriteLine("\n9) FiveMostExpensiveTracks:");
foreach (var track in result9) {
    Console.WriteLine($"{track.Name} (${track.Price}) - {track.AlbumTitle}");
}

var result10 = await _queryService.CustomersAndAmountSpent();
Console.WriteLine("\n10) CustomersAndAmountSpent:");
foreach (var customerSummary in result10) {
    Console.WriteLine($"{customerSummary.FirstName} {customerSummary.LastName}: ${customerSummary.TransactionTotal} ({customerSummary.TransactionCount} purchases)");
}

var result11 = await _queryService.CustomersToalPurchaseAmounts();
Console.WriteLine("\n11) CustomersToalPurchaseAmounts:");
foreach (var customerSummary in result11) {
    Console.WriteLine($"{customerSummary.FirstName} {customerSummary.LastName}: ${customerSummary.TransactionTotal} ({customerSummary.TransactionCount})");
}

var result12 = await _queryService.CustomersWithMoreThanFivePurchases();
Console.WriteLine("\n12) CustomersWithMoreThanFivePurchases:");
foreach (var customerSummary in result12) {
    Console.WriteLine($"{customerSummary.FirstName} {customerSummary.LastName}: ${customerSummary.TransactionTotal} ({customerSummary.TransactionCount})");
}

var result13 = await _queryService.InvoicesGroupedByCustomerAsync();
Console.WriteLine("\n13) InvoicesGroupedByCustomerAsync:");
foreach (var elem in result13) {
    Console.WriteLine($"CustomerId {elem.Key}: {elem.Value.Count} invoices");
}

var result14 = await _queryService.GetTopCustomersBySpendingAsync(3);
Console.WriteLine("\n14) GetTopCustomersBySpendingAsync(3):");
foreach (var customerSummary in result14) {
    Console.WriteLine($"{customerSummary.FirstName} {customerSummary.LastName}: ${customerSummary.TransactionTotal}");
}

var result15 = await _queryService.RevenueByCountryAsync();
Console.WriteLine("\n15) RevenueByCountryAsync:");
foreach (var elem in result15) {
    Console.WriteLine($"{elem.Key}: ${elem.Value}");
}

var result16 = await _queryService.TotalPurchasesByCountry();
Console.WriteLine("\n16) TotalPurchasesByCountry:");
foreach (var customerSummary in result16) {
    Console.WriteLine($"{customerSummary.Name}: ${customerSummary.TransactionTotal} ({customerSummary.TransactionCount} invoices)");
}

var result17 = await _queryService.GetCustomersByCountryAsync("USA");
Console.WriteLine("\n17) GetCustomersByCountryAsync(\"USA\"):");
Console.WriteLine($"Found {result17.Count} customers");

var result18 = await _queryService.GetInvoicesInDateRangeAsync(new DateTime(2024, 1, 1), new DateTime(2025, 1, 1));
Console.WriteLine("\n18) GetInvoicesInDateRangeAsync(2024 - 2025):");
Console.WriteLine($"Found {result18.Count} invoices");

Console.WriteLine("\n----- END OF TEST OUTPUTS -----");