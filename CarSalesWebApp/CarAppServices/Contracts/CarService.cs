using CarSalesWebApp.CarAppServices.Service;
using CarSalesWebApp.DataPersistance.Contracts;
using CarSalesWebApp.DataPersistance.Services;
using CarSalesWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesWebApp.CarAppServices.Contracts
{
    public class CarService: ICarService
    {

        private readonly IRepository _dataRepository;


        public CarService(IRepository repository)
        {
            _dataRepository = repository;
        }

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


                    await _dataRepository.CreateCar(car);
                    return true;
                }

                return false;
            }


            catch (Exception ex)
            {
                return false;
            }

        }

        public static implicit operator CarService(Repository v)
        {
            throw new NotImplementedException();
        }
    }
}
