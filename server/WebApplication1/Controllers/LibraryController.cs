using BusinessLogic;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2019.Drawing.Model3D;
using EntitiesAndModels;
using EntitiesAndModels.Models.Attendance;
using EntitiesAndModels.Models.ImportModels;
using EntitiesAndModels.Models.Library;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : MiniAuthController
    {
        private readonly ILibraryService _libraryService;
        public LibraryController(ILibraryService libraryService)
        {
            _libraryService = libraryService;
        }
        [HttpGet("Sample")]
        public IActionResult Sample()
        {
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Sample");
            int i = 1;
            foreach (var item in NewAttribute.AttributeDisplay(typeof(ImportBooks)))
            {
                ws.Row(1).Cell(i).Value = item.Attribute.title;
                i++;
            }
            var ms = new MemoryStream();
            wb.SaveAs(ms);
            var content = ms.ToArray();
            return File(content, contentType);
        }

        [HttpPost("Import")]
        public IActionResult ImportBooks([FromForm] ImportRequest file)
        {
            if (file.File == null)
            {
                return BadRequest("File should be required.");
            }

            var wb = new XLWorkbook(file.File.OpenReadStream());
            var name = wb.Worksheets.First().Name;
            var ws = wb.Worksheet(Path.GetFileNameWithoutExtension(name));

            if (!NewAttribute.ValidateHeaders<Books>(file.File, new Books()))
            {
                return BadRequest("Invalid Headers");
            }
            var list = new List<Books>();
            var totalRows = ws.LastRowUsed().RowNumber();
            var totalColumns = ws.LastColumnUsed().ColumnNumber();
            for (int i = 2; i <= totalRows; i++)
            {
                var books = new Books();
                for (int j = 1; j <= totalColumns; j++)
                {
                    switch (ws.Row(1).Cell(j).Value.ToString())
                    {
                        case "Book Name":
                            books.BookName = ws.Row(i).Cell(j).Value.ToString();
                            break;
                        case "Author Name":
                            books.AuthorName = ws.Row(i).Cell(j).Value.ToString();
                            break;
                        case "Book Code":
                            books.BookCode = ws.Row(i).Cell(j).Value.ToString();
                            break;
                        case "Branch":
                            books.Branch = Convert.ToInt32(ws.Row(i).Cell(j).Value.ToString());
                            break;
                        case "Quantity":
                            books.Quantity = Convert.ToInt32(ws.Row(i).Cell(j).Value.ToString());
                            break;
                        case "Class":
                            books.Class = Convert.ToInt32(ws.Row(i).Cell(j).Value.ToString());
                            break;
                        case "Semester":
                            books.Semester = Convert.ToInt32(ws.Row(i).Cell(j).Value.ToString());
                            break;

                    }
                }
                list.Add(books);
            }
            return Ok(_libraryService.AddBulk(list));
        }

        [HttpGet("Books")]
        public IActionResult GetBooks(int branch, int classId)
        {
            return Ok(_libraryService.GetBooks(branch, classId));
        }

        [HttpPut("RegisterBook")]
        public IActionResult RegisterBook(RegisterBookModel model)
        {
            return Ok(_libraryService.RegisterBook(model, Uid));
        }

        [HttpGet("ReturnBooks")]
        public IActionResult ReturnBooks()
        {
            return Ok(_libraryService.ReturnBooks(Uid));
        }
        [HttpPut("ReturnBook")]
        public IActionResult ReturnBook(RegisterBookModel model)
        {
            return Ok(_libraryService.ReturnBook(model,Uid));
        }
    }
}
