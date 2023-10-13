namespace EntitiesAndModels.Models.ImportModels
{
    public class ImportAttendance
    {
        [NewAttribute("Roll Number")]
        public string RollNumber { get; set; }

        [NewAttribute("Attendance Percentage")]
        public int AttendancePercentage { get; set; }

        [NewAttribute("Month")]
        public DateTime Month { get; set; }

        [NewAttribute("Status")]
        public bool Status { get; set; }
    }
}
