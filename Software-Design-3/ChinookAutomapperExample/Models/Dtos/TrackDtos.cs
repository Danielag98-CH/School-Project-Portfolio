
using ChinookAutomapperExample.Models.Entities;

namespace ChinookAutomapperExample.Models.Dtos;

public class TrackDto {
    public int TrackId { get; set; }
    public string Name { get; set; }
    public int AlbumId { get; set; }
    public int MediaTypeId { get; set; }
    public int GenreId { get; set; }
    public string? Composer { get; set; }
    public int Milliseconds { get; set; }
    public int Bytes { get; set; }
    public decimal UnitPrice { get; set; }
    // public virtual Album Album { get; set; }
    public virtual MediaType MediaType { get; set; }
    // public virtual Genre Genre { get; set; }
    // public virtual ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
}


