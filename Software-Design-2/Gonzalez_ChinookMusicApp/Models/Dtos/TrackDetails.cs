using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookMusicApp.Models.Dtos;

public class TrackDetails {
    public required string Track { get; set; }

    public required string Album { get; set; }

    public required string Artist { get; set; }
}
