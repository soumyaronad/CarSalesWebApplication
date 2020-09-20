using CarSalesWebApp.Services.Contracts;
using CarSalesWebApp.Respositories.Contracts;
using CarSalesWebApp.Respositories.Services;
using CarSalesWebApp.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using CarSalesWebApp.Services.Service;

namespace XUnitTestCarSales
{
    public class TestCarService
    {
        public static DbContextOptions<CarSalesContext> dbContextOptions { get; set; }

        [Fact]
        public async void Task_Add_ValidData_Return_Success()
        {

            //Arrange 
            bool result = true;
            var repository = new Mock<IVehicleRepository>();

            repository.Setup(p => p.CreateCar(It.IsAny<Car>())).Returns(Task.FromResult(Convert.ToInt32(result)));

            VehicleService appService = new VehicleService(repository.Object);

            var post = new CreateCarViewModel()
            {
                Make = "Hyundai Tucson",
                Model = "Active 2020",
                Badge = "Elite",
                Color = "Aqua Blue Mica",
                carType = "2.0DT Diesel 8 sp Automatic 4x4",
                BodyType = "Wagon",
                Condition = "New",
            };

            //Act
            result = await appService.AddNewCar(post);



            //Assert
            Assert.True(result);

        }

        [Fact]
        public async void Task_Add_InValidData_Return_Success()
        {
 
            //Arrange 
            bool result = false;
            var repository = new Mock<IVehicleRepository>();

            repository.Setup(p => p.CreateCar(It.IsAny<Car>())).Returns(Task.FromResult(Convert.ToInt32(result)));

            VehicleService appService = new VehicleService(repository.Object);

            var post = new CreateCarViewModel()
            {
                Make = null,
                Model = null,
                Badge = "Elite",
                Color = "Aqua Blue Mica",
                carType = "2.0DT Diesel 8 sp Automatic 4x4",
                BodyType = "Wagon",
                Condition = "New",
            };

            //Act
            result = await appService.AddNewCar(post);


            //Assert
            Assert.True(result);

        }


    }
}
