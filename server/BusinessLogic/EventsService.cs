using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities.Events;

namespace BusinessLogic
{
    public interface IEventsService
    {
        Result<Events> AddEvents(Events events);
        List<Events> GetCultural();
        List<Events> GetTechnical();
        List<Events> GetFun();
        List<Events> GetLiterary();
        public List<Events> GetPastEvents();
    }
    public class EventsService : IEventsService
    {
        public IUnitOfWork _uow;
        public EventsService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Result<Events> AddEvents(Events events)
        {
            var result = new Result<Events>();
            try
            {
                _uow.GetDbSet<Events>().Add(events);
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }

        public List<Events> GetCultural()
        {

            return _uow.GetDbSet<Events>().Get(predicate: x => x.EventType == 1 && x.Date.Date > DateTime.Now.Date).ToList();
        }
        public List<Events> GetTechnical()
        {
            return _uow.GetDbSet<Events>().Get(predicate: x => x.EventType == 2 && x.Date > DateTime.Now).ToList();
        }
        public List<Events> GetFun()
        {
            return _uow.GetDbSet<Events>().Get(predicate: x => x.EventType == 3 && x.Date > DateTime.Now).ToList();
        }
        public List<Events> GetLiterary()
        {
            return _uow.GetDbSet<Events>().Get(predicate: x => x.EventType == 4 && x.Date > DateTime.Now).ToList();
        }

        public List<Events> GetPastEvents()
        {
            return _uow.GetDbSet<Events>().Get(predicate: x => x.Date < DateTime.Now.Date).ToList();
        }
    }
}
