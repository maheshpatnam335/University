using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Entities.Events
{
    [Table("University_Events")]
    public class Events
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public int EventType { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string HostName { get; set; }
        public string Description { get; set; }
        public string ImageName { get; set; }
        public byte[] ImageData { get; set; }
        public byte[] ResizeImageData { get; set; }
    }
}
