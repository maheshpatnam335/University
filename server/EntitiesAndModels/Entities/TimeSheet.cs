using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesAndModels.Entities
{
    public class TimeSheet
    {
        public int Id { get; set; }
        public int LogId { get; set; }
        public DateTime? PunchIn { get; set; }
        public DateTime? PunchOut { get; set; }
    }
}
