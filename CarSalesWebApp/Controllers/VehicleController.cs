using System;
using System.Threading.Tasks;
using CarSalesWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using CarSalesWebApp.Services.Contracts;

namespace CarSalesWebApp.Controllers

{
    [ApiController]
    [Route("[controller]/[action]")]
    public class VehicleController : Controller

    {

        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
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

                bool result = await _vehicleService.AddNewCar(carData);

                return new Result() { Success = true, Message = "Car Added Successfully" };
            }
            catch (ApplicationException e)
            {
                return new Result() { Success = false, Message = " Application error, Please try later" };
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetCarData()
        {
            try
            {
                var car = (await _vehicleService.GetAllCars());

                return Json(new { Success = true, carList = car});
            }

            catch (Exception e)
            {
                return Json(new { Success = false, message = "Error while retriving the data, Please try later" });
            }



        }
            
    }
}