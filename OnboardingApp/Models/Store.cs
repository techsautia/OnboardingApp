namespace OnboardingApp.Models
{
    public class Store
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string StoreAddress { get; set; }
        public ICollection<Sales> ProductSold { get; set; }
    }
}
