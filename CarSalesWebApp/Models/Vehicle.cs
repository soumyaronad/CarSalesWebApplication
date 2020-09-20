namespace CarSalesWebApp.Models
{
    public class Vehicle
    {
        public  int Id { get; set; }

        public string Make { get; set; }

        public  string Model { get; set; }

        public  string Condition { get; set; }

        public VehicleTypes VehicleType { get; set; }
    }
}
