namespace EntitiesAndModels.Models.ImportModels
{
    public class ImportScholarship
    {
        [NewAttribute("Roll Number")]
        public string RollNumber { get; set; }
        [NewAttribute("Application Number")]
        public string ApplicationNumber { get; set; }
        [NewAttribute("Academic Year")]
        public string AcademicYear { get; set; }
        [NewAttribute("Pending At")]
        public string PendingAt { get; set; }
        [NewAttribute("Status")]
        public int Status { get; set; }
        [NewAttribute("Remitted date")]
        public DateTime RemmittedDate { get; set; }
        [NewAttribute("Tution Fee")]
        public decimal TutionFee { get; set; }
        [NewAttribute("Exam Fee")]
        public decimal ExamFee { get; set; }
        [NewAttribute("Mess Fee")]
        public decimal MessFee { get; set; }
        [NewAttribute("Is Pending")]
        public bool IsPending { get; set; }
    }
}
