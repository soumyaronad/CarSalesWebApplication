using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesWebApp.Models
{
    public class CarSalesContext:DbContext
    {


        public CarSalesContext(DbContextOptions<CarSalesContext> options) : base(options)
        {

        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
    }
}
