using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookCrudApp.Models.Dtos;

public class TrackDetails {

    [Required]
    public string ? Track { get; set; }

    [Required]
    public string ? Album { get; set; }

    [Required]
    public string ? Artist { get; set; }
}
