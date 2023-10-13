using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesAndModels.Models.Library
{
    [Table("Library_Books")]
    public class Books
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string BookName { get; set; }
        public string BookCode { get; set; }
        public string AuthorName { get; set; }
        public int Branch { get; set; }
        public int Quantity { get; set; }
        public int Class { get; set; }
        public int Semester { get; set; }
        public int Status { get; set; }
        public DateTime? ReturnDate { get; set; }
    }
}
