
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Gonzalez_ChinookCrudApp.Data;
using Gonzalez_ChinookCrudApp.Interfaces;
using Gonzalez_ChinookCrudApp.Models.Entities;
using Gonzalez_ChinookCrudApp.Services;

namespace Gonzalez_ChinookCrudApp.Services {
    public class CrudService : ICrudService {
        private readonly ApplicationDbContext _context;

        public CrudService(ApplicationDbContext context) {
            _context = context;
        }

        public async Task<Customer> AddCustomerAsync(string firstName, string lastName, string email, int supportRepId) {
            var customer = new Customer
            {
                FirstName    = firstName,
                LastName     = lastName,
                Email        = email,
                SupportRepId = supportRepId
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<bool> UpdateTrackPriceAsync(int trackId, decimal newPrice) {
            var track = await _context.Tracks.FindAsync(trackId);
            if (track == null) return false;

            track.UnitPrice = newPrice;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePlaylistAsync(int playlistId) {
            var playlist = await _context.Playlists.FindAsync(playlistId);
            if (playlist == null) return false;

            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Album> CreateAlbumForArtistAsync(int artistId, string title) {
            var album = new Album { ArtistId = artistId, Title = title };
            _context.Albums.Add(album);
            await _context.SaveChangesAsync();
            return album;
        }

        public async Task<int> UpdateTracksByComposerAsync(string composer, decimal newPrice) {
            var tracks = await _context.Tracks
                .Where(t => t.Composer == composer)
                .ToListAsync();

            foreach (var t in tracks)
                t.UnitPrice = newPrice;

            await _context.SaveChangesAsync();
            return tracks.Count;
        }

        public async Task<int> DeleteCustomersByCountryAsync(string country) {
            var list = await _context.Customers
                                     .Where(c => c.Country == country)
                                     .ToListAsync();

            _context.Customers.RemoveRange(list);
            await _context.SaveChangesAsync();
            return list.Count;
        }

        public async Task<int> AdjustTrackPricesByGenreAsync(int genreId, decimal percentIncrease) {
            var tracks = await _context.Tracks
                .Where(t => t.GenreId == genreId)
                .ToListAsync();

            foreach (var t in tracks)
                t.UnitPrice += t.UnitPrice * (percentIncrease / 100m);

            await _context.SaveChangesAsync();
            return tracks.Count;
        }

        public async Task<int> DeleteEmptyPlaylistsAsync() {
            var empty = await _context.Playlists
                .Include(p => p.Tracks)
                .Where(p => !p.Tracks.Any())
                .ToListAsync();

            _context.Playlists.RemoveRange(empty);
            await _context.SaveChangesAsync();
            return empty.Count;
        }

        public async Task<int> RenameComposerAsync(string oldName, string newName) {
            var tracks = await _context.Tracks
                .Where(t => t.Composer == oldName)
                .ToListAsync();

            foreach (var t in tracks)
                t.Composer = newName;

            await _context.SaveChangesAsync();
            return tracks.Count;
        }

        public async Task<int> DeleteCustomersWithNoInvoicesAsync() {
            var orphaned = await _context.Customers
                .Include(c => c.Invoices)
                .Where(c => !c.Invoices.Any())
                .ToListAsync();

            _context.Customers.RemoveRange(orphaned);
            await _context.SaveChangesAsync();
            return orphaned.Count;
        }

        public async Task<int> RenameAlbumsContainingKeywordAsync(string keyword, string appendText) {
            var list = await _context.Albums
                .Where(a => a.Title.Contains(keyword))
                .ToListAsync();

            foreach (var a in list)
                a.Title += appendText;

            await _context.SaveChangesAsync();
            return list.Count;
        }

        public async Task<int> DeleteTracksNotPurchasedAsync() {
            var purchasedIds = await _context.InvoiceLines
                .Select(il => il.TrackId)
                .Distinct()
                .ToListAsync();

            var toDelete = await _context.Tracks
                .Where(t => !purchasedIds.Contains(t.TrackId))
                .ToListAsync();

            _context.Tracks.RemoveRange(toDelete);
            await _context.SaveChangesAsync();
            return toDelete.Count;
        }
    }
}
