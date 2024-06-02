using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface IGenericRepositoryDL<T> where T : class
    {
        Task<T?> Get<T2>(T2 id);
        Task<IEnumerable<T>> GetAll();
        Task Add(T entity);
        Task<T> AddWithReturn(T entity);
        Task Delete(T entity);
        Task<T?> Delete<T2>(T2 id);
        Task Update(T entity);
        Task<T> UpdateWithReturn(T entity);
    }
}
