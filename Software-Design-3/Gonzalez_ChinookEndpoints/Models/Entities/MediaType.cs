using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace Gonzalez_ChinookEndpoints.Models.Entities;
[DebuggerDisplay("{Name} (MediaTypeId = {MediaTypeId})")]

public class MediaType {
  [Key]
  public int MediaTypeId { get; set; }

  [Required, MaxLength(120)]
  public required string Name { get; set; }
}
