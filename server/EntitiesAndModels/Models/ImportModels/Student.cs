namespace EntitiesAndModels.Models.ImportModels
{
    public class ImportStudent
    {
        public ImportStudent()
        {

        }
        [NewAttribute("Name")]
        public int getId { get; set; }

        [NewAttribute("Branch")]
        public string Branch { get; set; }

        [NewAttribute("Class")]
        public string Class { get; set; }

        [NewAttribute("Section")]
        public string Section { get; set; }

        [NewAttribute("Gender")]
        public string Gender { get; set; }

        [NewAttribute("Mobile Number")]//
        public string MobileNumber { get; set; }

        [NewAttribute("Admission Number")]
        public string AdmissionNumber { get; set; }

        [NewAttribute("Roll Number")]
        public string RollNumber { get; set; }

        [NewAttribute("Date Of Birth")]
        public string DateOfBirth { get; set; }

        [NewAttribute("Father Name")]
        public string FatherName { get; set; }

        [NewAttribute("Caste")]
        public string Caste { get; set; }
        [NewAttribute("Address")]
        public string Address { get; set; }
    }
}
