using EntitiesAndModels.Entities;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class UniversityContext : DbContext
    {
        public UniversityContext(DbContextOptions<UniversityContext> dbContext) : base(dbContext)
        {

        }
        public DbSet<EntitiesAndModels.Entities.Register> Registers { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
