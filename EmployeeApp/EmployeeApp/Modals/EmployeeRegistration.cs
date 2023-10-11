using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeApp.Modals
{
    [Table ("emplyeeregister")]
    public class EmployeeRegistration
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string email{ get; set; }
        public string phonenumber{ get; set; }
        public string password{ get; set; }
     
       
        
    }
}
