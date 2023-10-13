using EntitiesAndModels.Entities;

namespace EntitiesAndModels.Models.Attendance
{
    public class AttendanceModel
    {
        public string Name { get; set; }
        public int BranchId { get; set; }
        public int? Class { get; set; }
        public int AttendancePercentage { get; set; }
        public int? SectionId { get; set; }
        public int Gender { get; set; }
        public string? RollNumber { get; set; }
        public string FatherName { get; set; }
        public string Month { get; set; }
    }
}
