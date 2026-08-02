using Gonzalez_ChinookEnhancedQueries.Models.Dtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.CountryDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.CustomerDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.MusicDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Entities;
using Gonzalez_ChinookEnhancedQueries.Data;
using Gonzalez_ChinookEnhancedQueries.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gonzalez_ChinookEnhancedQueries.Services {
    public class EnhancedQueryService : IEnhancedQuery {
        private readonly ApplicationDbContext _context;

        public EnhancedQueryService(ApplicationDbContext context) {
            _context = context;
        }

        public async Task<Dictionary<string, List<Customer>>> CustomersGroupedBySupportRepAsync() {
            return await _context.Customers
                .Include(c => c.SupportRep)
                .GroupBy(c => c.SupportRep!.Email!)
                .ToDictionaryAsync(g => g.Key, g => g.ToList());
        }

        public async Task<Dictionary<string, List<Customer>>> GetCustomersByCountry() {
            return await _context.Customers
                .GroupBy(c => c.Country!)
                .ToDictionaryAsync(g => g.Key, g => g.ToList());
        }

        public async Task<Dictionary<string, int>> TrackCountByAlbumAsync() {
            return await _context.Tracks
                .Include(t => t.Album)
                .GroupBy(t => t.Album.Title!)
                .ToDictionaryAsync(g => g.Key, g => g.Count());
        }

        public async Task<List<AlbumStatDto>> TopThreeAlbumsMostTracks() {
            return await _context.Albums
                .Include(a => a.Tracks)
                .Select(a => new AlbumStatDto { Title = a.Title, TrackCount = a.Tracks.Count })
                .OrderByDescending(x => x.TrackCount)
                .Take(3)
                .ToListAsync();
        }

        public async Task<Dictionary<string, List<Track>>> TracksByComposer() {
            return await _context.Tracks
                .GroupBy(t => t.Composer ?? "Unknown")
                .ToDictionaryAsync(g => g.Key, g => g.ToList());
        }

        public async Task<List<ComposerStatDto>> ComposersAndTracks() {
            return await _context.Tracks
                .GroupBy(t => t.Composer)
                .Select(g => new ComposerStatDto { Name = g.Key, TrackCount = g.Count() })
                .ToListAsync();
        }

        public async Task<List<Track>> GetTracksByGenreAsync(string genreName) {
            return await _context.Tracks
                .Include(t => t.Genre)
                .Where(t => t.Genre.Name == genreName)
                .ToListAsync();
        }

        public async Task<List<Track>> GetTracksLongerThanAsync(int seconds) {
            return await _context.Tracks
                .Where(t => t.Milliseconds > seconds * 1000)
                .ToListAsync();
        }

        public async Task<List<TrackStatDto>> FiveMostExpensiveTracks() {
            //    return await _context.Tracks
            //         .Include(t => t.Album)
            //         .OrderByDescending(t => t.UnitPrice)
            //         .Take(5)
            //         .Select(t => new TrackStatDto { Name = t.Name, Price = t.UnitPrice, AlbumTitle = t.Album.Title })
            //         .ToListAsync();
            // }
            var trackData = await _context.Tracks
                   .Include(t => t.Album)
                   .Select(t => new
                   {
                       Name = t.Name,
                       Price = t.UnitPrice,
                       AlbumTitle = t.Album.Title
                   })
                   .ToListAsync();

            return trackData
                .OrderByDescending(t => t.Price)
                .Take(5)
                .Select(t => new TrackStatDto
                {
                    Name = t.Name ?? "",
                    Price = t.Price,
                    AlbumTitle = t.AlbumTitle ?? ""
                })
                .ToList();
        }

        public async Task<List<CustomerTransactionSummaryDto>> CustomersAndAmountSpent() {
            return await _context.Customers
                .Select(c => new CustomerTransactionSummaryDto {
                    Id = c.CustomerId,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    TransactionTotal = c.Invoices.Sum(i => i.Total),
                    TransactionCount = c.Invoices.Count()
                })
                .ToListAsync();
        }

        public async Task<List<CustomerTransactionSummaryDto>> CustomersToalPurchaseAmounts() {
            return await _context.Invoices
                .Include(i => i.Customer)
                .GroupBy(i => new { i.CustomerId, i.Customer.FirstName, i.Customer.LastName })
                .Select(g => new CustomerTransactionSummaryDto {
                    Id = g.Key.CustomerId,
                    FirstName = g.Key.FirstName,
                    LastName = g.Key.LastName,
                    TransactionTotal = g.Sum(i => i.Total),
                    TransactionCount = g.Count()
                })
                .Where(dto => dto.TransactionCount > 5)
                .ToListAsync();
        }

        public Task<List<CustomerTransactionSummaryDto>> CustomersWithMoreThanFivePurchases() {
            return CustomersToalPurchaseAmounts();
        }

        public async Task<Dictionary<int, List<Invoice>>> InvoicesGroupedByCustomerAsync() {
            return await _context.Invoices
                .GroupBy(i => i.CustomerId)
                .ToDictionaryAsync(g => g.Key, g => g.ToList());
        }

        public async Task<List<CustomerTransactionSummaryDto>> GetTopCustomersBySpendingAsync(int count) {
            // return await _context.Invoices
            //     .Include(i => i.Customer)
            //     .GroupBy(i => new { i.CustomerId, i.Customer.FirstName, i.Customer.LastName })
            //     .Select(g => new CustomerTransactionSummaryDto {
            //         Id = g.Key.CustomerId,
            //         FirstName = g.Key.FirstName,
            //         LastName = g.Key.LastName,
            //         TransactionTotal = g.Sum(i => i.Total),
            //         TransactionCount = g.Count()
            //     })
            //     .OrderByDescending(dto => dto.TransactionTotal)
            //     .Take(count)
            //     .ToListAsync();
          var data = await _context.Invoices
                .Include(i => i.Customer)
                .GroupBy(i => new { i.CustomerId, 
                                   FirstName = i.Customer.FirstName, 
                                   LastName = i.Customer.LastName })
                .Select(g => new CustomerTransactionSummaryDto {
                    Id = g.Key.CustomerId,
                    FirstName = g.Key.FirstName,
                    LastName = g.Key.LastName,
                    TransactionTotal = g.Sum(i => i.Total),
                    TransactionCount = g.Count()
                })
                .ToListAsync();

            return data
                .OrderByDescending(dto => dto.TransactionTotal)
                .Take(count)
                .ToList();
    
        }
        

        public async Task<Dictionary<string, decimal>> RevenueByCountryAsync() {
            return await _context.Invoices
                .GroupBy(i => i.BillingCountry!)
                .ToDictionaryAsync(g => g.Key, g => g.Sum(i => i.Total));
        }

        public async Task<List<CountryTransactionSummaryDto>> TotalPurchasesByCountry() {
            var list = await _context.Invoices
               .GroupBy(i => i.BillingCountry)
               .Select(g => new CountryTransactionSummaryDto {
                   Name = g.Key,
                   TransactionCount = g.Count(),
                   TransactionTotal = g.Sum(i => i.Total)
               })
               .ToListAsync();
            return list
                .OrderByDescending(dto => dto.TransactionTotal)
                .ToList();
        }

        public async Task<List<Customer>> GetCustomersByCountryAsync(string country) {
            return await _context.Customers
                .Where(c => c.Country == country)
                .ToListAsync();
        }

        public async Task<List<Invoice>> GetInvoicesInDateRangeAsync(DateTime startDate, DateTime endDate) {
            return await _context.Invoices
                .Where(i => i.InvoiceDate >= startDate && i.InvoiceDate <= endDate)
                .ToListAsync();
        }
    }
}
