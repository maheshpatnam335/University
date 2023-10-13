using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("Student_Caste")]
    public class Caste
    {
        public int Id { get; set; }
        public string CasteName { get; set; }
        public bool Status { get; set; }
    }
}
