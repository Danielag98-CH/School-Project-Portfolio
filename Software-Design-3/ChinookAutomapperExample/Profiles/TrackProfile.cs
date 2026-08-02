using AutoMapper;
using ChinookAutomapperExample.Models.Entities;
using ChinookAutomapperExample.Models.Dtos;

public class TrackProfile : Profile {
    public TrackProfile() {
        CreateMap<Track, TrackDto>().ReverseMap();
    }
}

