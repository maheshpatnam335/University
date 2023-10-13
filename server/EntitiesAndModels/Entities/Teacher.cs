using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("University_Teachers")]
    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmployeeId { get; set; }
        public int Gender { get; set; }
        public int MaritalStatus { get; set; }
        public int Age { get; set; }
        public int Experince { get; set; }
        public int Department { get; set; }
        public string Subjects { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int Qualification { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfJoining { get; set; }
        public string SpouseName { get; set; }
        public string ESINo { get; set; }
        public string PFNo { get; set; }
    }
}
