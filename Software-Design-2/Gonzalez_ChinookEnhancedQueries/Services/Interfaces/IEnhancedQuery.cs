using Gonzalez_ChinookEnhancedQueries.Models.Dtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.CountryDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.CustomerDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Dtos.MusicDtos;
using Gonzalez_ChinookEnhancedQueries.Models.Entities;
using Microsoft.EntityFrameworkCore.Design;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookEnhancedQueries.Services.Interfaces;

public interface IEnhancedQuery {
    /// <summary>
    /// Groups customers by their support representative's email.
    /// </summary>
    /// <returns>A dictionary where the key is the support rep's email and the value is the list of their customers.</returns>
    Task<Dictionary<string, List<Customer>>> CustomersGroupedBySupportRepAsync();

    /// <summary>
    /// Groups customers by country.
    /// </summary>
    /// <returns>A dictionary where the key is the country and the value is the list of customers in that country.</returns>
    Task<Dictionary<string, List<Customer>>> GetCustomersByCountry();

    /// <summary>
    /// Retrieves a dictionary mapping album title to the number of tracks in each album.
    /// </summary>
    /// <returns>A dictionary where the key is the album title and the value is the number of tracks.</returns>
    Task<Dictionary<string, int>> TrackCountByAlbumAsync();

    /// <summary>
    /// Retrieves the top three albums with the most tracks.
    /// </summary>
    /// <returns>A list of AlbumStatDto objects containing the title and track count of the top three albums.</returns>
    Task<List<AlbumStatDto>> TopThreeAlbumsMostTracks();

    /// <summary>
    /// Groups tracks by composer.
    /// </summary>
    /// <returns>A dictionary where the key is the composer's name and the value is the list of tracks they composed.</returns>
    Task<Dictionary<string, List<Track>>> TracksByComposer();

    /// <summary>
    /// Lists each composer and the total number of tracks they have composed.
    /// </summary>
    /// <returns>A list of ComposerStatDto objects representing each composer and their track count.</returns>
    Task<List<ComposerStatDto>> ComposersAndTracks();

    /// <summary>
    /// Retrieves all tracks that belong to a specified genre.
    /// </summary>
    /// <param name="genreName">The name of the genre to filter by.</param>
    /// <returns>A list of tracks that belong to the given genre.</returns>
    Task<List<Track>> GetTracksByGenreAsync(string genreName);

    /// <summary>
    /// Retrieves tracks longer than a given duration in seconds.
    /// </summary>
    /// <param name="seconds">The minimum track duration in seconds.</param>
    /// <returns>A list of tracks longer than the specified duration.</returns>
    Task<List<Track>> GetTracksLongerThanAsync(int seconds);

    /// <summary>
    /// Retrieves the top five most expensive tracks.
    /// </summary>
    /// <returns>A list of TrackStatDto objects for the five most expensive tracks.</returns>
    Task<List<TrackStatDto>> FiveMostExpensiveTracks();

    /// <summary>
    /// Retrieves a list of customers along with the total amount they have spent and their invoice count.
    /// </summary>
    /// <returns>A list of CustomerTransactionSummaryDto objects for each customer.</returns>
    Task<List<CustomerTransactionSummaryDto>> CustomersAndAmountSpent();

    /// <summary>
    /// Retrieves a list of customers with more than five purchases, including total spent and purchase count.
    /// </summary>
    /// <returns>A list of CustomerTransactionSummaryDto objects for customers with more than five invoices.</returns>
    Task<List<CustomerTransactionSummaryDto>> CustomersToalPurchaseAmounts();

    /// <summary>
    /// Retrieves a list of customers who have made more than five purchases.
    /// </summary>
    /// <returns>A list of CustomerTransactionSummaryDto objects with full names and transaction details.</returns>
    Task<List<CustomerTransactionSummaryDto>> CustomersWithMoreThanFivePurchases();

    /// <summary>
    /// Groups invoices by customer.
    /// </summary>
    /// <returns>A dictionary where the key is the customer ID and the value is the list of that customer's invoices.</returns>
    Task<Dictionary<int, List<Invoice>>> InvoicesGroupedByCustomerAsync();

    /// <summary>
    /// Retrieves the top N customers based on total spending.
    /// </summary>
    /// <param name="count">The number of top customers to return.</param>
    /// <returns>A list of CustomerTransactionSummaryDto objects representing the top spenders.</returns>
    Task<List<CustomerTransactionSummaryDto>> GetTopCustomersBySpendingAsync(int count);

    /// <summary>
    /// Calculates total revenue by billing country.
    /// </summary>
    /// <returns>A dictionary where the key is the country name and the value is the total revenue from that country.</returns>
    Task<Dictionary<string, decimal>> RevenueByCountryAsync();

    /// <summary>
    /// Calculates the total number of transactions and the total revenue by country.
    /// </summary>
    /// <returns>A list of CountryTransactionSummaryDto objects for each country.</returns>
    Task<List<CountryTransactionSummaryDto>> TotalPurchasesByCountry();

    /// <summary>
    /// Retrieves all customers located in the specified country.
    /// </summary>
    /// <param name="country">The country to filter customers by.</param>
    /// <returns>A list of customers from the specified country.</returns>
    Task<List<Customer>> GetCustomersByCountryAsync(string country);

    /// <summary>
    /// Retrieves all invoices within the specified date range.
    /// </summary>
    /// <param name="startDate">The start date of the range (inclusive).</param>
    /// <param name="endDate">The end date of the range (inclusive).</param>
    /// <returns>A list of invoices issued within the date range.</returns>
    Task<List<Invoice>> GetInvoicesInDateRangeAsync(DateTime startDate, DateTime endDate);
}
