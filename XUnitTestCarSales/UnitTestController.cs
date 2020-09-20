using CarSalesWebApp.Services.Contracts;
using CarSalesWebApp.Controllers;
using CarSalesWebApp.Respositories.Contracts;
using CarSalesWebApp.Respositories.Services;
using CarSalesWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using CarSalesWebApp.Services.Service;

namespace XUnitTestCarSales
{
  public  class UnitTestController
    {

        private VehicleRepository repository;
     
        public static DbContextOptions<CarSalesContext> dbContextOptions { get; }

        static UnitTestController()
        {
            string dbName = "Test_DB";
            dbContextOptions = new DbContextOptionsBuilder<CarSalesContext>()
            .UseInMemoryDatabase(databaseName: dbName)
                .Options;
        }


        public UnitTestController()
        {
            var context = new CarSalesContext(dbContextOptions);
            DataDBInitializer db = new DataDBInitializer();
            db.Seed(context);
            repository = new VehicleRepository(context);



        }


        [Fact]
        public async void Task_Add_ValidData_Return_Success()
        {
            //Arrange
            
            VehicleService carService = new VehicleService(repository);
            var controller = new VehicleController(carService);
            var post = new CreateCarViewModel() {
                Make = "Hyundai Tucson",
                Model = "Active 2020",
                Badge = "Elite",
                Color = "Aqua Blue Mica",
                carType = "2.0DT Diesel 8 sp Automatic 4x4",
                BodyType = "Wagon",
                Condition = "New",
            };

            //Act
            Result data = await controller.CreateNewCar(post);

            //Assert

            Assert.True(data.Success);


        }

        [Fact]
        public async void Task_Add_InvalidData_Throw_Exeption()

        {
            VehicleService carService = new VehicleService(repository);
            var controller = new VehicleController(carService);
            var post = new CreateCarViewModel()
            {
                Make = null,
                Model = "Active 2020",
                Badge = "Elite",
                Color = "Aqua Blue Mica",
                carType = "2.0DT Diesel 8 sp Automatic 4x4",
                BodyType = "Wagon",
                Condition = "New",
            };

            //Act
            
            Result data = await controller.CreateNewCar(post);

            //Assert

            Assert.True(data.Success);
            Assert.NotEmpty(data.Message);

        }
    }
}
