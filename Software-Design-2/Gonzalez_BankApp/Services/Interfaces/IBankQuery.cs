using Gonzalez_BankApp.Models.Dtos;
using Gonzalez_BankApp.Models.Dtos.CustomerDtos;
using Gonzalez_BankApp.Models.Dtos.AccountDtos;
using Gonzalez_BankApp.Models.Entities;

namespace Gonzalez_BankApp.Services.Interfaces;

public interface IBankQuery {
    /// <summary>
    /// Returns a summary of all customers, including their name, credit score, 
    /// number of accounts, and number of credit cards.
    /// </summary>
    Task<List<CustomerSummaryDto>> CustomerSummariesAsync();

    /// <summary>
    /// Returns a list of customers whose credit score is greater than or equal to the specified minimum score.
    /// </summary>
    /// <param name="minScore">Minimum credit score to filter customers.</param>
    Task<List<CustomerSummaryDto>> GetCustomersByMinCreditScoreAsync(int minScore);

    /// <summary>
    /// Returns the total balance grouped by account type.
    /// </summary>
    Task<List<AccountBalanceDto>> GetTotalBalanceByAccountTypeAsync();

    /// <summary>
    /// Returns a dictionary grouping customers by their state.
    /// </summary>
    Task<Dictionary<string, List<Customer>>> GetCustomersGroupedByStateAsync();

    /// <summary>
    /// Returns the number of customers in each state, ordered by count descending.
    /// </summary>
    Task<List<StateCustomerCountDto>> GetCustomerCountsByStateAsync();

    /// <summary>
    /// Returns a list of customers who have at least one credit card with available credit greater than or equal to the specified amount.
    /// </summary>
    /// <param name="minCredit">Minimum available credit.</param>
    Task<List<CustomerSummaryDto>> GetCustomersWithHighCreditLimitAsync(decimal minCredit);

    /// <summary>
    /// Groups customers by the century in which they were born.
    /// Note that string interpolation will not work in the GroupBy. You will
    /// need to retrieve *all* Customers out of the database first, and then
    /// write a second LINQ query to go over this retrieved list of Customers
    /// to do the GroupBy() is needed.
    /// Doing (DOB.year / 100 + 1) will get you the birth century.
    /// </summary>
    Task<Dictionary<string, List<Customer>>> GetCustomersGroupedByBirthCenturyAsync();

    /// <summary>
    /// Groups customers into credit score brackets (e.g., "600–649") and returns a list of full names for each bracket.
    /// It would likely be easiest to first create a list of CreditScoreBracket DTOs
    /// with the Bracket's value as CreditScore - (CreditScore % 50). And then, in a separate
    /// LINQ statement, create the dictionary. For the labels in the dictionary, you could just do the range
    /// as the key something like the $"{group.Key}-{group.Key + 49}."
    /// </summary>
    Task<Dictionary<string, List<string>>> GetCustomerCreditScoreBracketsAsync();

    /// <summary>
    /// Calculates the average balance of savings accounts created within a specified date range.
    /// This may be beneficial to use more than one LINQ query. The first LINQ
    /// query getting a list of the balances from all of the relevant accounts. The second LINQ
    /// query going over that list of balances and getting the average. 
    /// </summary>
    /// <param name="start">Start date of the range (inclusive).</param>
    /// <param name="end">End date of the range (inclusive).</param>
    Task<decimal> GetAverageSavingsBalanceInRangeAsync(DateTime start, DateTime end);

    /// <summary>
    /// Returns a list of customers who have a credit score above the specified threshold and at least one checking account with a balance above the given minimum.
    /// </summary>
    /// <param name="minBalance">Minimum required balance in a checking account.</param>
    /// <param name="minCreditScore">Minimum credit score required.</param>
    Task<List<Customer>> GetQualifiedCheckingCustomersAsync(decimal minBalance, int minCreditScore);
}
