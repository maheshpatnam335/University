using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic
{
    public interface IScholarshipService
    {
        Result<Scholarship> AddScholarshipDetails(List<Scholarship> details);
        Scholarship GetStatus(string rollNumber, string academicYear);
        IEnumerable<Scholarship> GetList();
    }
    public class ScholarshipService : IScholarshipService
    {
        private readonly IUnitOfWork _uow;
        public ScholarshipService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Result<Scholarship> AddScholarshipDetails(List<Scholarship> details)
        {
            var result = new Result<Scholarship>();
            try
            {
                foreach (var item in details)
                {
                    if (!_uow.GetDbSet<Scholarship>().Get(predicate: x => x.RollNumber == item.RollNumber && x.AcademicYear == item.AcademicYear).Any())
                    {
                        _uow.GetDbSet<Scholarship>().Add(item);
                        _uow.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }

        public Scholarship GetStatus(string rollNumber, string academicYear)
        {
            return _uow.GetDbSet<Scholarship>().Get(include: x => x.Include(x => x.Student)).First(x => x.RollNumber == rollNumber && x.AcademicYear == academicYear);
        }

        public IEnumerable<Scholarship> GetList()
        {
            return _uow.GetDbSet<Scholarship>().Get(include: x => x.Include(x => x.Student));
        }
    }
}
