namespace EntitiesAndModels.Models.ImportModels
{
    public class ImportResults
    {
        [NewAttribute("Roll Number")]
        public string RollNumber { get; set; }
        [NewAttribute("Academic Year(2020-2020)")]
        public string AcademicYear { get; set; }
        [NewAttribute("Semester")]
        public int Semester { get; set; }
        [NewAttribute("TotalMarks Marks")]
        public int TotalMarks { get; set; }
    }
}
