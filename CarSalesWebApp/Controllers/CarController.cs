using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarSalesWebApp.CarAppServices.Service;
using CarSalesWebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarSalesWebApp.Controllers

{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CarController : Controller

    {

        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        //Add New Car
        [HttpPost]
        public async Task<Result> CreateNewCar(CreateCarViewModel carData)
        {
            try
            {
 
                if (!ModelState.IsValid)
                {
                    return new Result () { Success = false, Message = "Parameter can not be null" };
                }

                bool result = await _carService.AddNewCar(carData);

                return new Result() { Success = true, Message = "Car Added Successfully" };
            }
            catch (ApplicationException e)
            {
                return new Result() { Success = false, Message =e.Message};
            }
        }

            
    }
}