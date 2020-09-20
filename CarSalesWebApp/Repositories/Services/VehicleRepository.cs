using CarSalesWebApp.Respositories.Contracts;
using CarSalesWebApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarSalesWebApp.Respositories.Services
{
    public class VehicleRepository : IVehicleRepository
    {

        private readonly CarSalesContext _context;

        public VehicleRepository(CarSalesContext context)
        {
            _context = context;
        }
        public async Task<int> CreateCar(Car newCar)
        {
            _context.Cars.Add(newCar);
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Car>> GetCar()
        {

            var car = _context.Cars;

            return await car.ToListAsync();


        }
        /*  public async Task<Car> GetCar(int id)
          {
              return await _context.Cars.FindAsync(id);
          }*/

    }
}
