using ChinookDtoExample.Models.Entities;

namespace ChinookDtoExample.Models.Dtos;

public class AlbumDto {
    public int AlbumId { get; set; }
    public string Title { get; set; }
    public int ArtistId { get; set; }

}

public class AlbumWithArtistAndTracksDto : AlbumDto {
    public virtual ArtistDto Artist { get; set; }
    public virtual ICollection<TrackDto> Tracks { get; set; } = new List<TrackDto>();
}