using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("Student_Attendance")]
    public class Attendance
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string? RollNumber { get; set; }
        public int AttendancePercentage { get; set; }
        public Student? Student { get; set; }
        public DateTime Month { get; set; }
        public bool Status { get; set; }
    }
}
