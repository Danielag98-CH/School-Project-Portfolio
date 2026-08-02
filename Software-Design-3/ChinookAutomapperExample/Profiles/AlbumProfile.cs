using AutoMapper;
using ChinookAutomapperExample.Models.Entities;
using ChinookAutomapperExample.Models.Dtos;

public class AlbumProfile : Profile {
    public AlbumProfile() {
        CreateMap<Album, AlbumDto>().ReverseMap();
        CreateMap<Album, AlbumWithArtistDto>().ReverseMap();
        CreateMap<Album, AlbumWithTracksDto>().ReverseMap();
        CreateMap<Album, AlbumWithArtistAndTracks>().ReverseMap();
    }
}

