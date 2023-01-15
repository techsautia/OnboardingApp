namespace OnboardingApp.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }

        public ICollection<Sales> ProductSold { get; set; }

    }
}
