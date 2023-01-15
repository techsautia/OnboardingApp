using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardingApp.DbContexts;
using OnboardingApp.Models;

namespace OnboardingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class SaleController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public SaleController(ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<object> GetSalesList()
        {
            var list = await _db.Sales.Select(x => new 
            {
                SalesId = x.SalesId,
                CustomerName = x.Customer.CustomerName,
                CustomerId = x.Customer.CustomerId,
                ProductName = x.Product.ProductName,
                ProductId = x.Product.ProductId,
                StoreName = x.Store.StoreName,
                StoreId = x.Store.StoreId,
                DateSold = x.DateSold.ToString("yyyy-MM-dd"),
            }).ToListAsync();

            return list;
        }
        [HttpPost]
        public async Task<int> Post(Sales sale)
        {
            if (ModelState.IsValid)
            {
                _db.Sales.Add(sale);
            }
            else
            {
                return 0;
            }

            await _db.SaveChangesAsync();
            return 1;
        }

        [HttpPut]
        public async Task<int> UpdateSales(Sales sale)
        {
            var sal = await _db.Sales.Where(x => x.SalesId == sale.SalesId).FirstOrDefaultAsync();
            sal.CustomerId = sale.CustomerId;
            sal.ProductId = sale.ProductId;
            sal.StoreId = sale.StoreId;
            sal.DateSold = sale.DateSold;
            if (ModelState.IsValid)
            {
                _db.Sales.Update(sal);
            }
            else
            {
                return 0;
            }
            await _db.SaveChangesAsync();
            return 1;
        }
        [HttpDelete]
        public async Task<int> DeleteSale(Sales sale)
        {
            var sal = await _db.Sales.Where(x => x.SalesId == sale.SalesId).FirstOrDefaultAsync();
            if (sal != null)
            {
                _db.Sales.Remove(sal);
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
