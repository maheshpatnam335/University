using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities.Sports;

namespace BusinessLogic
{
    public interface ISportsService
    {
        Result<Sports> AddSports(Sports sports);
        IEnumerable<Sports> GetSports();
    }
    public class SportsService : ISportsService
    {
        public IUnitOfWork _uow;
        public SportsService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Result<Sports> AddSports(Sports sports)
        {
            var result = new Result<Sports>();
            try
            {
                _uow.GetDbSet<Sports>().Add(sports);
                _uow.SaveChanges();
                result.ReturnValue = sports;
            }catch(Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }
        public IEnumerable<Sports> GetSports()
        {
            return _uow.GetDbSet<Sports>().Get();
        }
    }
}
