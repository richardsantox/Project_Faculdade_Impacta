namespace CarZone.src.DTOs
{
    public class NovoVeiculoDTO
    {
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public int Ano { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; }
    }

    public class AtualizarVeiculoDTO
    {
        public int ID { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public int Ano { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; }
        public string ImagemUrl { get; set; }

    }

    public class ListarVeiculoDTO
    {
        public int ID { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public int Ano { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; }
        public DateTime CriadoEm { get; set; }
    }
}
