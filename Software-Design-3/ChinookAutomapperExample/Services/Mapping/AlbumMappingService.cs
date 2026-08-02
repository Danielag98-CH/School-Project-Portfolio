using AutoMapper;
using ChinookAutomapperExample.Models.Entities;
using ChinookAutomapperExample.Models.Dtos;

namespace ChinookAutomapperExample.Services.Mapping;

public class AlbumMappingService {
    private readonly IMapper _mapper;

    public AlbumMappingService(IMapper mapper) {
        _mapper = mapper;
    }

    /*
        Mappings to DTO.
    */
    public AlbumDto MapToAlbumDto(Album album) {
        return _mapper.Map<AlbumDto>(album);
    }

    public AlbumWithArtistDto MapToAlbumWithArtistDto(Album album) {
        return _mapper.Map<AlbumWithArtistDto>(album);
    }

    public AlbumWithTracksDto MapToAlbumWithTracksDto(Album album) {
        return _mapper.Map<AlbumWithTracksDto>(album);
    }

    public AlbumWithArtistAndTracks MapToAlbumWithArtistAndTracksDto(Album album) {
        return _mapper.Map<AlbumWithArtistAndTracks>(album);
    }

    public List<AlbumWithArtistAndTracks> MapToAlbumWithArtistAndTracksListDto(List<Album> album) {
        return _mapper.Map<List<AlbumWithArtistAndTracks>>(album);
    }

    /*
        Mappings back to Entity.
    */

    public Album MapToAlbum(AlbumDto albumDto) {
        return _mapper.Map<Album>(albumDto);
    }

    public Album MapToAlbum(AlbumWithArtistDto albumDto) {
        return _mapper.Map<Album>(albumDto);
    }

    public Album MapToAlbum(AlbumWithTracksDto albumDto) {
        return _mapper.Map<Album>(albumDto);
    }

    public Album MapToAlbum(AlbumWithArtistAndTracks albumDto) {
        return _mapper.Map<Album>(albumDto);
    }

}