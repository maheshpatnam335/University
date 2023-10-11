using EmployeeApp.Modals;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApp.Services
{
    public class Detailsservices
    {
        public EmployeeContext _contextt;
        public Detailsservices(EmployeeContext contextt)
        {
            _contextt = contextt;
        }
        public void SaveDatails(EmployeeDetails details)
        {
            _contextt.employeedetail.Add(details);
        }
        public void Update(EmployeeDetails modal)
        {
            _contextt.employeedetail.Update(modal);
            _contextt.SaveChanges();
        }
        public void Delete(int id)
        {
            var data = _contextt.employeedetail.SingleOrDefault(x => x.Id == id);
            _contextt.employeedetail.Remove(data);
            _contextt.SaveChanges();
        }
        public List<EmployeeDetails> Get()
        {
            return _contextt.employeedetail.ToList();

        }
    }
}
