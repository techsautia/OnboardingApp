using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardingApp.DbContexts;
using OnboardingApp.Models;

namespace OnboardingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public ProductController(ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<IEnumerable<Product>> GetProductsList()
        {
            var list = await _db.Product.Select(x => new Product
            {
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                ProductPrice = x.ProductPrice,
            }).ToListAsync();

            return list;
        }
        [HttpPost]
        public async Task<int> Post(Product product)
        {
            if (ModelState.IsValid)
            {
                _db.Product.Add(product);
            }
            else
            {
                return 0;
            }

            await _db.SaveChangesAsync();
            return 1;
        }
        [HttpPut]
        public async Task<int> UpdateProduct(Product product)
        {
            var prodct = await _db.Product.Where(x => x.ProductId == product.ProductId).FirstOrDefaultAsync();
            prodct.ProductName = product.ProductName;
            prodct.ProductPrice = product.ProductPrice;
            if (ModelState.IsValid)
            {
                _db.Product.Update(prodct);
            }
            else
            {
                return 0;
            }
            await _db.SaveChangesAsync();
            return 1;
        }
        [HttpDelete]
        public async Task<int> DeleteProduct(Product product)
        {
            var prodct = await _db.Product.Where(x => x.ProductId == product.ProductId).FirstOrDefaultAsync();
            if (prodct != null)
            {
                _db.Product.Remove(prodct);
            }
            else
            {
                return 0;
            }
            await _db.SaveChangesAsync();
            return 1;
        }
    }
}
