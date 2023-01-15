namespace OnboardingApp.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public ICollection<Sales> ProductSold { get; set; }
    }
}
