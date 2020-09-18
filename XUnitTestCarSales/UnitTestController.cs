using CarSalesWebApp.CarAppServices.Contracts;
using CarSalesWebApp.CarAppServices.Service;
using CarSalesWebApp.Controllers;
using CarSalesWebApp.DataPersistance.Contracts;
using CarSalesWebApp.DataPersistance.Services;
using CarSalesWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTestCarSales
{
  public  class UnitTestController
    {

        private Repository repository;
     
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
            repository = new Repository(context);



        }


        [Fact]
        public async void Task_Add_ValidData_Return_Success()
        {
            //Arrange
            
            CarService carService = new CarService(repository);
            var controller = new CarController(carService);
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
            CarService carService = new CarService(repository);
            var controller = new CarController(carService);
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
