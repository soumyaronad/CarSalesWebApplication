using CarSalesWebApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarSalesWebApp.Respositories.Contracts
{
    public interface IVehicleRepository
    {
        Task<int> CreateCar(Car newCar);
        Task<IEnumerable<Car>> GetCar();
    }
}
