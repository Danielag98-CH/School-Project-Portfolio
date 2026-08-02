using AutoMapper;
using ChinookAutomapperExample.Models.Entities;
using ChinookAutomapperExample.Models.Dtos;
using NuGet.DependencyResolver;

namespace ChinookAutomapperExample.Services.Mapping;

public class TrackMappingService {
    private readonly IMapper _mapper;

    public TrackMappingService(IMapper mapper) {
        _mapper = mapper;
    }

    /*
        Mappings to DTO.
    */
    public TrackDto MapToTrackDto(Track track) {
        return _mapper.Map<TrackDto>(track);
    }

    /*
        Mappings back to Entity.
    */

    public Track MapToTrack(TrackDto trackDto) {
        return _mapper.Map<Track>(trackDto);
    }

}