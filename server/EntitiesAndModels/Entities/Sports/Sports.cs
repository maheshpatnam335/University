using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities.Sports
{
    [Table("University_Sports")]
    public class Sports
    {
        public int Id { get; set; }
        public int SportType { get; set; }
        public int Sport { get; set; }
        public int Rank { get; set; }
        public string RollNumber { get; set; }
        public string Description { get; set; }
        public string TournamentName { get; set; }
        public string TournamentPlace { get; set; }
        public string Reward { get; set; }
        public DateTime TournamentDate { get; set; }
        public string FilesName { get; set; }
    }
}
