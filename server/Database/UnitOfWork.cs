using Microsoft.EntityFrameworkCore;

namespace Database
{
    public interface IUnitOfWork
    {
        public IMyDbSet<T> GetDbSet<T>() where T : class;
        void SaveChanges();
    }
    public interface IUnitOfWork<TContext> : IUnitOfWork
    {
        public TContext Context { get; set; }
    }
    public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext : DbContext
    {
        public TContext Context { get; set; }
        public UnitOfWork(TContext context)
        {
            Context = context;
        }

        Dictionary<Type, object> _properties;
        public IMyDbSet<T> GetDbSet<T>() where T : class
        {
             _properties ??= new Dictionary<Type, object>();
            var type = typeof(T);
            if (!_properties.ContainsKey(type))
            {
                _properties[type] = new MyDbSet<T>(Context);
            }
            return (IMyDbSet<T>)_properties[type];
        }

        public void SaveChanges()
        {
            Context.SaveChanges();
        }
    }
}
