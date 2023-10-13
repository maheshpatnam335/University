using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities
{
    [Table("University_Branches")]
    public class Branch
    {
        public int Id { get; set; }
        public string BranchName { get; set; }
        public bool Status { get; set; }
    }
}
