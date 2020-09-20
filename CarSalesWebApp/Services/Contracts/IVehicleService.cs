using CarSalesWebApp.Models;
using System.Collections;
using System.Threading.Tasks;

namespace CarSalesWebApp.Services.Contracts
{
    public interface IVehicleService
    {
        Task<bool> AddNewCar(CreateCarViewModel car);
        Task<IEnumerable> GetAllCars();
    }
}
