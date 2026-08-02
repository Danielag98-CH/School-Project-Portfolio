using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;


namespace Gonzalez_ChinookEndpoints.Models.Entities;
public class Track {
  [Key]
  public int TrackId { get; set; }

  [Required, MaxLength(200)]
  public required string Name { get; set; }

  [ForeignKey("Album")]
  public int AlbumId { get; set; }

  public virtual Album? Album {get; set;}

  [ForeignKey("MediaType")]
  public int MediaTypeId { get; set; }
  public virtual MediaType? MediaType {get; set;}

  [ForeignKey("Genre")]
  public int GenreId { get; set; }
  public virtual Genre? Genre {get; set;}

  [MaxLength(220)]
  public string? Composer { get; set; }

  [Required]
  public required int Milliseconds { get; set; }

  public int Bytes { get; set; }

  [Required]
  public required decimal UnitPrice { get; set; }

  public virtual ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
}