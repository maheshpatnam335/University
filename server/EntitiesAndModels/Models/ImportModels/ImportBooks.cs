namespace EntitiesAndModels.Models.ImportModels
{
    public class ImportBooks
    {
        [NewAttribute("Book Name")]
        public string BookName { get; set; }

        [NewAttribute("Author Name")]
        public string AuthorName { get; set; }

        [NewAttribute("Book Code")]
        public string BookCode { get; set; }

        [NewAttribute("Branch")]
        public int Branch { get; set; }

        [NewAttribute("Quantity")]
        public int Quantity { get; set; }

        [NewAttribute("Class")]
        public int Class { get; set; }

        [NewAttribute("Semester")]
        public int Semester { get; set; }
    }
}
