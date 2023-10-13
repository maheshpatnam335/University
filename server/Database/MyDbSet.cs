using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Database
{
    public interface IMyDbSet<T> where T : class
    {
        void Add(T entity);
        T Update(T entity);
        IEnumerable<T> AddBulk(IEnumerable<T> values);
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        T GetWithId(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        void SaveChanges();
    }
    public class MyDbSet<T> : IMyDbSet<T> where T : class
    {
        private readonly DbContext _universityContext;
        private readonly DbSet<T> _dbSet;
        public MyDbSet(DbContext universityContext)
        {
            _universityContext = universityContext;
            _dbSet = _universityContext.Set<T>();
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }
        public T Update(T entity)
        {
            _dbSet.Update(entity);
            return entity;
        }

        public IEnumerable<T> Get(
            Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _dbSet;
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            if (include != null)
            {
                query = include(query);
            }
            return query.ToList();
        }

        public T GetWithId(Expression<Func<T, bool>> predicate = null
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _dbSet;
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            if (include != null)
            {
                query = include(query);
            }
            return query.FirstOrDefault();
        }

        public void SaveChanges()
        {
            _universityContext.SaveChanges();
        }

        public IEnumerable<T> AddBulk(IEnumerable<T> values)
        {
            _dbSet.AddRange(values);
            return values;
        }
    }
}
