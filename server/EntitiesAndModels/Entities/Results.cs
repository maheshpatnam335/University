using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("Student_Results")]
    public class StudentResults
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int SubjectMarksId { get; set; }
        public ICollection<SubjectMarks> SubjectMarks { get; set; }
        public Student Student { get; set; }
        public string RollNumber { get; set; }
        public string AcademicYear { get; set; }
        public int Semester { get; set; }
        public int TotalMarks { get; set; }
    }
    [Table("Students_Subjects")]
    public class SubjectMarks
    {
        public int Id { get; set; }
        public int marks { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public string RollNumber { get; set; }
        public string SubjectName { get; set; }

    }
}
