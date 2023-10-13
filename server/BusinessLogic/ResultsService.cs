using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Results;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic
{
    public interface IResultsService
    {
        Result<StudentResults> AddResults(List<StudentResults> list);
        Result<StudentResults> CheckResults(CheckResultsModel model);
        IEnumerable<StudentResults> GetStudentResults();
    }
    public class ResultsService : IResultsService
    {
        private readonly IUnitOfWork _uow;
        public ResultsService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public Result<StudentResults> AddResults(List<StudentResults> list)
        {
            var result = new Result<StudentResults>();
            try
            {
                int add = 0;
                foreach (var item in list)
                {
                    if (!_uow.GetDbSet<StudentResults>().Get().Any(x => x.RollNumber == item.RollNumber && x.Semester == item.Semester))
                    {
                        _uow.GetDbSet<StudentResults>().Add(item);
                        add++;
                    }
                }
                if (add > 0)
                { _uow.SaveChanges(); }
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }

            return result;
        }
        public Result<StudentResults> CheckResults(CheckResultsModel model)
        {
            var result = new Result<StudentResults>();
            try
            {
                result.ReturnValue = _uow.GetDbSet<StudentResults>().Get(include: x => x.Include(x => x.Student)).First(x => x.RollNumber == model.RollNumber &&
              x.Semester == model.Semester && x.Student.Class == model.Class && x.Student.DateOfBirth == Convert.ToDateTime(model.Dob));

            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }
        public IEnumerable<StudentResults> GetStudentResults()
        {
            return _uow.GetDbSet<StudentResults>().Get(include: x => x.Include(x => x.Student));
        }
    }
}
