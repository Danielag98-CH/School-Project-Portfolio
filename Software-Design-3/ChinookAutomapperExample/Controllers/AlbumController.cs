using ChinookAutomapperExample.Data;
using ChinookAutomapperExample.Models.Dtos;
using ChinookAutomapperExample.Models.Entities;
using ChinookAutomapperExample.Services.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChinookAutomapperExample.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly AlbumMappingService _albumMappingService;

        public AlbumController(
            ApplicationDbContext context,
            AlbumMappingService albumMappingService
        ) {
            _context = context;
            _albumMappingService = albumMappingService;
        }

        // [HttpGet("")]
        // public async Task<ActionResult<List<Album>>> GetAllAlbums() {
        //     var albums = await _context.Album.ToListAsync();

        //     return Ok(albums);
        // }

        [HttpGet("")]
        public async Task<ActionResult<List<AlbumWithArtistAndTracks>>> GetAllAlbums() {
            var albums = await _context.Album
            .Include(al => al.Artist)
            .Include(al => al.Tracks)
            .ToListAsync();

            var albumDtoList = _albumMappingService.MapToAlbumWithArtistAndTracksListDto(albums);

            return Ok(albumDtoList);
        }

        // [HttpGet("{albumId:int}")]
        // public async Task<ActionResult<List<Album>>> GetAlbumById(int albumId) {
        //     var album = await _context.Album
        //     .Include(al => al.Artist)
        //     .Include(al => al.Tracks)
        //     .SingleOrDefaultAsync(al => al.AlbumId == albumId);

        //     if (null == album) {
        //         return NotFound($"No Album found with ID: {album}");
        //     }
        //     ArtistDto artistDto = new ArtistDto {
        //         ArtistId = album.ArtistId,
        //         Name = album.Artist.Name
        //     };

        //     List<TrackDto> trackDtos = new List<TrackDto>();

        //     foreach (Track track in album.Tracks) {
        //         trackDtos.Add(new TrackDto {
        //             TrackId = track.TrackId,
        //             Name = track.Name,
        //             AlbumId = track.AlbumId,
        //             MediaTypeId = track.MediaTypeId,
        //             MediaType = track.MediaType,
        //             GenreId = track.GenreId,
        //             Composer = track.Composer,
        //             Milliseconds = track.Milliseconds,
        //             Bytes = track.Bytes,
        //             UnitPrice = track.UnitPrice
        //         });
        //     }

        //     AlbumWithArtistAndTracks albumDto = new AlbumWithArtistAndTracks {
        //         AlbumId = album.AlbumId,
        //         Title = album.Title,
        //         ArtistId = album.ArtistId,
        //         Artist = artistDto,
        //         Tracks = trackDtos
        //     };

        //     return Ok(albumDto);
        // }

        [HttpGet("{albumId:int}")]
        public async Task<ActionResult<List<Album>>> GetAlbumById(int albumId) {
            var album = await _context.Album
            .Include(al => al.Artist)
            .Include(al => al.Tracks)
            .SingleOrDefaultAsync(al => al.AlbumId == albumId);

            if (null == album) {
                return NotFound($"No Album found with ID: {album}");
            }

            var albumDto = _albumMappingService.MapToAlbumWithArtistAndTracksDto(album);

            return Ok(albumDto);
        }

    }
}
