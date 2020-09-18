using CarSalesWebApp.DataPersistance.Contracts;
using CarSalesWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesWebApp.DataPersistance.Services
{
    public class Repository : IRepository
    {

        private readonly CarSalesContext _context;

        public Repository(CarSalesContext context)
        {
            _context = context;
        }
        public async Task<int> CreateCar(Car newCar)
        {
            _context.Cars.Add(newCar);
            return await _context.SaveChangesAsync();
        }

        /*  public async Task<Car> GetCar(int id)
          {
              return await _context.Cars.FindAsync(id);
          }*/

    }
}
