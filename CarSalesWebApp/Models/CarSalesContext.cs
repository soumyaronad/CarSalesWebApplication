using Microsoft.EntityFrameworkCore;

namespace CarSalesWebApp.Models
{
    public class CarSalesContext:DbContext
    {


        public CarSalesContext(DbContextOptions<CarSalesContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
    }
}
