using CarSalesWebApp.Services.Contracts;
using CarSalesWebApp.Models;
using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using CarSalesWebApp.Respositories.Contracts;

namespace CarSalesWebApp.Services.Service
{
    public class VehicleService : IVehicleService
    {

        private readonly IVehicleRepository _VehicleRepository;


        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _VehicleRepository = vehicleRepository;
        }


        //Business Logic to handle add new car to the database 
        public async Task<bool> AddNewCar(CreateCarViewModel newCar)
        {
            Car car = new Car();
            try
            {
                if (newCar != null)
                {
                    car.Make = newCar.Make;
                    car.Model = newCar.Model;
                    car.VehicleType = VehicleTypes.Car;
                    car.BodyType = newCar.BodyType;
                    car.Badge = newCar.Badge;
                    car.Color = newCar.Badge;
                    car.Condition = newCar.Badge;
                    car.carType = newCar.carType;


                    await _VehicleRepository.CreateCar(car);
                    return true;
                }

                return false;
            }


            catch (Exception ex)
            {
                return false;
            }

        }

        //Business Logic to get all car data from the database
        public async Task<IEnumerable> GetAllCars()
        {

            var car = (await _VehicleRepository.GetCar()).Select(x => new
            {
                x.Id,
                x.Make,
                x.Model,
                x.VehicleType,
                x.Condition,
                x.Color,
                x.BodyType,
                x.carType,
                x.Badge
            });
            return car;

        }

    }
}
