using CarSalesWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesWebApp.DataPersistance.Contracts
{
    public interface IRepository
    {
        Task<int> CreateCar(Car newCar);
    }
}
