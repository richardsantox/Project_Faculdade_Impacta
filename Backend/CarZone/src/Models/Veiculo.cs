namespace CarZone.src.Models
{
    public class Veiculo : ModeloBase
    {
        
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public int Ano { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; }
    }
}
