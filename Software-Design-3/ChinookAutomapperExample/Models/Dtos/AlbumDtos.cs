
using ChinookAutomapperExample.Models.Entities;

namespace ChinookAutomapperExample.Models.Dtos;
public class AlbumDto {
    public int AlbumId { get; set; }

    public string Title { get; set; }

    public int ArtistId { get; set; }

}
public class AlbumWithArtistDto : AlbumDto {
    public virtual ArtistDto Artist { get; set; }

}
public class AlbumWithTracksDto : AlbumDto {
    public virtual ICollection<TrackDto> Tracks { get; set; } = new List<TrackDto>();
}

public class AlbumWithArtistAndTracks : AlbumDto {
    public virtual ArtistDto Artist { get; set; }
    public virtual ICollection<TrackDto> Tracks { get; set; } = new List<TrackDto>();
}