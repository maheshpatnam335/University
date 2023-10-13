using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("StudentScholarship")]
    public class Scholarship
    {
        public int Id { get; set; }
        public string RollNumber { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public string ApplicationNumber { get; set; }
        public string AcademicYear { get; set; }
        public string PendingAt { get; set; }
        public int Status { get; set; }
        public DateTime RemmittedDate { get; set; }
        public decimal TutionFee { get; set; }
        public decimal ExamFee { get; set; }
        public decimal MessFee { get; set; }
        public bool IsPending { get; set; }
        public DateTime DetailsModifiedAt { get; set; }
    }
}
