using AutoMapper;
using ChinookAutomapperExample.Models.Entities;
using ChinookAutomapperExample.Models.Dtos;
using NuGet.DependencyResolver;

namespace ChinookAutomapperExample.Services.Mapping;

public class ArtistMappingService {
    private readonly IMapper _mapper;

    public ArtistMappingService(IMapper mapper) {
        _mapper = mapper;
    }

    /*
        Mappings to DTO.
    */
    public ArtistDto MapToArtistDto(Artist artist) {
        return _mapper.Map<ArtistDto>(artist);
    }

    /*
        Mappings back to Entity.
    */

    public Artist MapToArtist(ArtistDto artistDto) {
        return _mapper.Map<Artist>(artistDto);
    }

}