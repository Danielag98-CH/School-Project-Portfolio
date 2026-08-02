using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gonzalez_BankApp.Models.Dtos;
using Gonzalez_BankApp.Models.Dtos.CustomerDtos;
using Gonzalez_BankApp.Models.Dtos.AccountDtos;
using Gonzalez_BankApp.Models.Entities;
using Gonzalez_BankApp.Data;
using Gonzalez_BankApp.Services.Interfaces;


namespace Gonzalez_BankApp.Services {
    public class BankQueryService : IBankQuery {
        private readonly ApplicationDbContext _context;

        public BankQueryService(ApplicationDbContext context) {
            _context = context;
        }
        
        public async Task<List<CustomerSummaryDto>> CustomerSummariesAsync() {
            return await _context.Customers
                .Select(c => new CustomerSummaryDto
                {
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    CreditScore = c.CreditScore,
                    NumAccounts = c.CustomerAccounts.Count,
                    NumCreditCards = c.CustomerCreditCards.Count
                })
            .ToListAsync();
        }
        public async Task<List<CustomerSummaryDto>> GetCustomersByMinCreditScoreAsync(int minScore) {
            return await _context.Customers
                .Where(c => c.CreditScore >= minScore)
                .Select(c => new CustomerSummaryDto {
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    CreditScore = c.CreditScore,
                    NumAccounts = c.CustomerAccounts.Count,
                    NumCreditCards = c.CustomerCreditCards.Count
                })
            .ToListAsync();
        }
        public async Task<List<AccountBalanceDto>> GetTotalBalanceByAccountTypeAsync() {
            return await _context.Accounts
                .GroupBy(a => a.Type)
                .Select(g => new AccountBalanceDto {
                    AccountType = g.Key,
                    TotalBalance = g.Sum(a => a.Balance)
                })
            .ToListAsync();
        }
        public async Task<Dictionary<string, List<Customer>>> GetCustomersGroupedByStateAsync() {
            return await _context.Customers
                .GroupBy(c => c.State)
                .ToDictionaryAsync(g => g.Key, g => g.ToList());
        }
        public async Task<List<StateCustomerCountDto>> GetCustomerCountsByStateAsync() {
            return await _context.Customers
                .GroupBy(c => c.State)
                .Select(g => new StateCustomerCountDto {
                    State = g.Key,
                    CustomerCount = g.Count()
                })
            .OrderByDescending(dto => dto.CustomerCount)
            .ToListAsync();
        }
        public async Task<List<CustomerSummaryDto>> GetCustomersWithHighCreditLimitAsync(decimal minCredit) {
            return await _context.Customers
                .Where(c => c.CustomerCreditCards.Any(cc => cc.CreditCard.AvailCredit >= minCredit))
                .Select(c => new CustomerSummaryDto {
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    CreditScore = c.CreditScore,
                    NumAccounts = c.CustomerAccounts.Count,
                    NumCreditCards = c.CustomerCreditCards.Count
                })
            .ToListAsync();
        }
        public async Task<Dictionary<string, List<Customer>>> GetCustomersGroupedByBirthCenturyAsync() {
            var allCustomers = await _context.Customers.ToListAsync();

            return allCustomers
                .GroupBy(c => $"{(c.DOB.Year / 100 + 1)}th Century")
                .ToDictionary(g => g.Key, g => g.ToList());
        }
        public async Task<Dictionary<string, List<string>>> GetCustomerCreditScoreBracketsAsync() {
            var brackets = await _context.Customers
                .Select(c => new CreditScoreBracket {
                    Name = $"{c.FirstName} {c.LastName}",
                    Bracket = (c.CreditScore / 50) * 50
                })
                .ToListAsync();

            return brackets
                .GroupBy(b => $"{b.Bracket}-{b.Bracket + 49}")
                .OrderBy(g => g.Key)
                .ToDictionary(g => g.Key, g => g.Select(b => b.Name).ToList());
        }
        public async Task<decimal> GetAverageSavingsBalanceInRangeAsync(DateTime start, DateTime end) {
            var balances = await _context.Accounts
                .Where(a => a.Type == "Savings" && a.DateCreated >= start && a.DateCreated <= end)
                .Select(a => a.Balance)
                .ToListAsync();

            return balances.Any() ? balances.Average() : 0m;
        }
        public async Task<List<Customer>> GetQualifiedCheckingCustomersAsync(decimal minBalance, int minCreditScore) {
            return await _context.Customers
                .Where(c => c.CreditScore > minCreditScore &&
                            c.CustomerAccounts.Any(ca => ca.Account.Type == "Checking" && ca.Account.Balance > minBalance))
                .ToListAsync();
        }

    }

}