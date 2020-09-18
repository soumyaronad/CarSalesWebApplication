using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesWebApp.Models
{
    public class CreateCarViewModel
    {

        public int Id { get; set; }

        [Required]
        public string Make { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public string Condition { get; set; }

        [Required]
        public string BodyType { get; set; }

        [Required]
        public string carType { get; set; }

        [Required]
        public string Badge { get; set; }

        [Required]
        public string Color { get; set; }
    }
}
