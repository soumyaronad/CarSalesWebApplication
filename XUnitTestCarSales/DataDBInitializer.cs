using CarSalesWebApp.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace XUnitTestCarSales
{
    class DataDBInitializer
    {
        public DataDBInitializer()
        {
            

        }

        public void Seed(CarSalesContext context)
        {


            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            context.Cars.AddRange(

                new Car()
                {
                    Id = 1,
                    Make = "Hyundai Tucson",
                    Model = "Active 2020",
                    Badge = "Elite",
                    Color = "Aqua Blue Mica",
                    carType = "2.0DT Diesel 8 sp Automatic 4x4",
                    BodyType = "Wagon",
                    Condition = "New",
                    VehicleType = VehicleTypes.Car
                },
                new Car()
                {
                    Id = 2,
                    Make = "SKODA",
                    Model = "81TSI Auto",
                    Badge = " Active",
                    Color = "Race Blue",
                    carType = "3cyl 1.0L Turbo Petrol",
                    BodyType = "Hatch",
                    Condition = "Used",
                    VehicleType = VehicleTypes.Car


                },
                new Car()

                {
                    Id = 3,
                    Make = "Alfa Romeo",
                    Model = "MY19 Sedan",
                    Badge = " Veloce",
                    Color = "Stromboli Grey Metallic",
                    carType = "2.0T Petrol 8 sp Automatic RWD",
                    BodyType = "Sedan",
                    Condition = "Used",
                    VehicleType = VehicleTypes.Car


                }
                );

            context.SaveChanges();
        }
    }
}
