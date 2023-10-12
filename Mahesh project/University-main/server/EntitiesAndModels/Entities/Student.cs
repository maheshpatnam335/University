using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("University_Student")]
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AdmissionNumber { get; set; }
        public int BranchId { get; set; }
        public string RollNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string FatherName { get; set; }
        public int? SectionId { get; set; }
        public int? Class { get; set; }
    }
}
