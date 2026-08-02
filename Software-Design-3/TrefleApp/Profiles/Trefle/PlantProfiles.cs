using AutoMapper;
using TrefleApp.Models.Trefle.Responses;
using TrefleApp.Models.Trefle.Dtos;

namespace TrefleApp.Profiles.Trefle;

public class PlantProfile : Profile {
    public PlantProfile() {
        CreateMap<PlantDto, Plant>().ReverseMap();
    }
}
