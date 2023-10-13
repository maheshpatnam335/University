using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("University_Student")]
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BranchId { get; set; }
        public int? Class { get; set; }
        public int? SectionId { get; set; }
        public int Gender { get; set; }
        public string MobileNumber { get; set; }
        public string AdmissionNumber { get; set; }
        public string? RollNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string FatherName { get; set; }
        public int Caste { get; set; }
        public string Address { get; set; }


    }
}
