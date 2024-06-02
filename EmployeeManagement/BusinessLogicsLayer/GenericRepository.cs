using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer
{
    public abstract class GenericRepository<T> : IGenericRepositoryDL<T> where T : class
    {
        public Task Add(T entity)
        {
            return Add(entity);
        }

        public Task<T> AddWithReturn(T entity)
        {
            return AddWithReturn(entity);
        }

        public Task Delete(T entity)
        {
            return Delete(entity);
        }

        public Task<T> Delete<T2>(T2 id)
        {
            return Delete(id);
        }
        public Task<T> Get<T2>(T2 id)
        {
            return Get(id);
        }
        public Task<IEnumerable<T>> GetAll()
        {
            return GetAll();
        }

        public Task Update(T entity)
        {
            return Update(entity);
        }

        public Task<T> UpdateWithReturn(T entity)
        {
            return UpdateWithReturn(entity);
        }
    }
}
