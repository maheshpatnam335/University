using Microsoft.AspNetCore.Http;

namespace EntitiesAndModels.Models.Events
{
    public class EventsModel
    {
        public int? Rating { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int EventType { get; set; }
        public string HostName { get; set; }
        public string Description { get; set; }
        public IFormFile File { get; set; }
        public string? ImageName { get; set; }
        public byte[]? ImageData { get; set; }
        public byte[]? ResizeImageData { get; set; }
    }
}
