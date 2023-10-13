using AutoMapper;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Entities.Events;
using EntitiesAndModels.Entities.Sports;
using EntitiesAndModels.Models.Attendance;
using EntitiesAndModels.Models.Authorisation;
using EntitiesAndModels.Models.Events;
using EntitiesAndModels.Models.Sports;

namespace WebApi.AutoMapper
{
    public class UniversityProfile : Profile
    {
        public UniversityProfile()
        {
            CreateMap<AttendanceModel, Attendance>();
            CreateMap<Attendance, AttendanceModel>()
                .ForMember(d => d.Name, x => x.MapFrom(x => x.Student.Name))
                .ForMember(d => d.BranchId, x => x.MapFrom(x => x.Student.BranchId))
                .ForMember(d => d.SectionId, x => x.MapFrom(x => x.Student.SectionId))
                .ForMember(d => d.Class, x => x.MapFrom(x => x.Student.Class))
                .ForMember(d => d.Gender, x => x.MapFrom(x => x.Student.Gender)).
                ForMember(d => d.FatherName, x => x.MapFrom(x => x.Student.FatherName))
                .ForMember(d => d.Month, x => x.MapFrom(x => x.Month.ToString("yyyy-MM")));

            CreateMap<Events, EventsModel>();
            CreateMap<EventsModel, Events>();
            CreateMap<Sports, SportsModel>();
            CreateMap<SportsModel, Sports>();

            CreateMap<RegisterModel, Register>();
        }
    }
}
