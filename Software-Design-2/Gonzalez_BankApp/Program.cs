using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Gonzalez_BankApp.Models.Dtos;
// using Gonzalez_BankApp.Models.Dtos.AccountDtos;
// using Gonzalez_BankApp.Models.Dtos.CustomerDtos;
using Gonzalez_BankApp.Models.Entities;
using Gonzalez_BankApp.Data;
using Gonzalez_BankApp.Services;

ServiceProvider serviceProvider;
BankQueryService _bankQueryService;

var services = new ServiceCollection();

services.AddDbContext<ApplicationDbContext>(options =>
  options.UseSqlite("Data Source=bank.db")); 

services.AddScoped<BankQueryService>();
services.AddScoped<SeedingService>();

serviceProvider = services.BuildServiceProvider();

var seeder = serviceProvider.GetRequiredService<SeedingService>();
Console.WriteLine("Starting DB seeding...");
await seeder.SeedDatabase();
Console.WriteLine("Finished DB seeding.");


_bankQueryService = serviceProvider.GetRequiredService<BankQueryService>();

var jsonOptions = new JsonSerializerOptions { WriteIndented = true };

Console.WriteLine("\n--- 1) CustomerSummariesAsync ---");
var customerSummaries = await _bankQueryService.CustomerSummariesAsync();
Console.WriteLine(JsonSerializer.Serialize(customerSummaries, jsonOptions));

Console.WriteLine("\n--- 2) GetCustomersByMinCreditScoreAsync(minScore: 700) ---");
var customersByCredit = await _bankQueryService.GetCustomersByMinCreditScoreAsync(700);
Console.WriteLine(JsonSerializer.Serialize(customersByCredit, jsonOptions));

Console.WriteLine("\n--- 3) GetTotalBalanceByAccountTypeAsync ---");
var balancesByType = await _bankQueryService.GetTotalBalanceByAccountTypeAsync();
Console.WriteLine(JsonSerializer.Serialize(balancesByType, jsonOptions));

Console.WriteLine("\n--- 4) GetCustomersGroupedByStateAsync ---");
var customersByState = await _bankQueryService.GetCustomersGroupedByStateAsync();
Console.WriteLine(JsonSerializer.Serialize(customersByState, jsonOptions));

Console.WriteLine("\n--- 5) GetCustomerCountsByStateAsync ---");
var countsByState = await _bankQueryService.GetCustomerCountsByStateAsync();
Console.WriteLine(JsonSerializer.Serialize(countsByState, jsonOptions));

Console.WriteLine("\n--- 6) GetCustomersWithHighCreditLimitAsync(minCredit: 5000) ---");
var highCreditCustomers = await _bankQueryService.GetCustomersWithHighCreditLimitAsync(5000);
Console.WriteLine(JsonSerializer.Serialize(highCreditCustomers, jsonOptions));

Console.WriteLine("\n--- 7) GetCustomersGroupedByBirthCenturyAsync ---");
var groupedByCentury = await _bankQueryService.GetCustomersGroupedByBirthCenturyAsync();
Console.WriteLine(JsonSerializer.Serialize(groupedByCentury, jsonOptions));

Console.WriteLine("\n--- 8) GetCustomerCreditScoreBracketsAsync ---");
var creditBrackets = await _bankQueryService.GetCustomerCreditScoreBracketsAsync();
Console.WriteLine(JsonSerializer.Serialize(creditBrackets, jsonOptions));

Console.WriteLine("\n--- 9) GetAverageSavingsBalanceInRangeAsync ---");
var avgSavings = await _bankQueryService.GetAverageSavingsBalanceInRangeAsync(
    new DateTime(2015, 1, 1),
    new DateTime(2025, 1, 1)
);
Console.WriteLine(avgSavings);

Console.WriteLine("\n--- 10) GetQualifiedCheckingCustomersAsync(minBalance: 2000, minCreditScore: 600) ---");
var qualifiedCheckers = await _bankQueryService.GetQualifiedCheckingCustomersAsync(2000, 600);
Console.WriteLine(JsonSerializer.Serialize(qualifiedCheckers, jsonOptions));
