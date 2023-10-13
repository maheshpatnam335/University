using Database;
using EntitiesAndModels;
using EntitiesAndModels.Models.Library;

namespace BusinessLogic
{
    public interface ILibraryService
    {
        Result<Books> AddBulk(List<Books> list);
        IEnumerable<Books> GetBooks(int branch, int classId);
        Result<RegisterBookModel> RegisterBook(RegisterBookModel model, int id);
        IEnumerable<Books> ReturnBooks(int id);
        Result<RegisterBookModel> ReturnBook(RegisterBookModel model, int id);
    }
    public class LibraryService : ILibraryService
    {
        public IUnitOfWork _uow;
        public LibraryService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Result<Books> AddBulk(List<Books> list)
        {
            var result = new Result<Books>();
            try
            {
                foreach (Books book in list)
                {
                    if (!_uow.GetDbSet<Books>().Get(predicate: x => x.AuthorName == book.AuthorName && x.BookCode == book.BookCode && x.BookName == book.BookName).Any())
                    {
                        book.Status = 1;//Available
                        _uow.GetDbSet<Books>().Add(book);
                    }
                    if (_uow.GetDbSet<Books>().Get(predicate: x => x.BookCode == book.BookCode && x.AuthorName == book.AuthorName).Any())
                    {
                        var oldBook = _uow.GetDbSet<Books>().GetWithId(x => x.BookCode == book.BookCode && x.AuthorName == book.AuthorName);
                        oldBook.Quantity = oldBook.Quantity + book.Quantity;
                        _uow.GetDbSet<Books>().Update(oldBook);
                          _uow.SaveChanges();
                    }
                }
                _uow.SaveChanges();
                result.ReturnValues = list;
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }

        public IEnumerable<Books> GetBooks(int branch, int classId)
        {
            return _uow.GetDbSet<Books>().Get(predicate: x => x.Class == classId && x.Branch == branch && x.Status == 1);
        }

        public Result<RegisterBookModel> RegisterBook(RegisterBookModel model, int id)
        {
            var res = new Result<RegisterBookModel>();
            var book = _uow.GetDbSet<Books>().Get(predicate: x => x.BookCode == model.BookCode).FirstOrDefault();
            if (book.Quantity - 1 >= 0)
            {
                try
                {
                    book.Quantity = book.Quantity - 1;
                    book.UserId = id;
                    book.ReturnDate = DateTime.Now.AddDays(15);
                    _uow.GetDbSet<Books>().Update(book);
                    _uow.SaveChanges();
                }
                catch (Exception ex)
                {
                    res.AddMessageItem(new ReturnMessage(ex.Message));
                }
            }
            else
            {
                book.Status = 2;
                _uow.GetDbSet<Books>().Update(book);
                _uow.SaveChanges();
            }
            return res;
        }

        public IEnumerable<Books> ReturnBooks(int id)
        {
            return _uow.GetDbSet<Books>().Get(predicate: x => x.UserId == id);
        }

        public Result<RegisterBookModel> ReturnBook(RegisterBookModel model, int id)
        {
            var res = new Result<RegisterBookModel>();
            var book = _uow.GetDbSet<Books>().Get(predicate: x => x.BookCode == model.BookCode).FirstOrDefault();

            try
            {
                book.Quantity = book.Quantity + 1;
                book.UserId = 0;
                book.ReturnDate = null;
                book.Status = 1;
                _uow.GetDbSet<Books>().Update(book);
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                res.AddMessageItem(new ReturnMessage(ex.Message));
            }

            return res;
        }
    }
}
