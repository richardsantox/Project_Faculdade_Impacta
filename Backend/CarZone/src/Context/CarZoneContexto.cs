using CarZone.src.Models;
using Microsoft.EntityFrameworkCore;

namespace CarZone.src.Context
{
    public class CarZoneContexto : DbContext
    {
        public CarZoneContexto(DbContextOptions<CarZoneContexto> options) : base(options) { }

        public DbSet<Veiculo> Veiculos { get; set; }
    }
}
