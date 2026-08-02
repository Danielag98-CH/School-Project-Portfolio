using AutoMapper;
using ChinookAutomapperExample.Models.Entities;
using ChinookAutomapperExample.Models.Dtos;

public class ArtistProfile : Profile {
    public ArtistProfile() {
        CreateMap<Artist, ArtistDto>().ReverseMap();
    }
}

