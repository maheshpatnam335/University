using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesAndModels.Models.Sports
{
    public class SportsModel
    {
        public int SportType { get; set; }
        public int Sport { get; set; }
        public int Rank { get; set; }
        public string RollNumber { get; set; }
        public string Description { get; set; }
        public string TournamentName{ get; set; }
        public string TournamentPlace { get; set; }
        public string Reward { get; set; }
        public DateTime TournamentDate{ get; set; }
        public string FilesName { get; set; }
    }
}
