using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookEndpoints.Models.Entities;
[DebuggerDisplay("{Name} (PlaylistId = {PlaylistId})")]

public class Playlist {
  [Key]
  public int PlaylistId { get; set; }

  [Required, MaxLength(120)]
  public required string Name { get; set; }

  public virtual ICollection<Track> Tracks { get; set; } = new List<Track>();
}