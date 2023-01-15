using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardingApp.DbContexts;
using OnboardingApp.Models;

namespace OnboardingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class StoreController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public StoreController(ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<IEnumerable<Store>> GetStoresList()
        {
            var list = await _db.Store.Select(x => new Store
            {
                StoreId = x.StoreId,
                StoreName = x.StoreName,
                StoreAddress = x.StoreAddress,
            }).ToListAsync();

            return list;
        }
        [HttpPost]
        public async Task<int> Post(Store store)
        {
            if (ModelState.IsValid)
            {
                _db.Store.Add(store);
            }
            else
            {
                return 0;
            }

            await _db.SaveChangesAsync();
            return 1;
        }
        [HttpPut]
        public async Task<int> UpdateStore(Store store)
        {
            var stor = await _db.Store.Where(x => x.StoreId == store.StoreId).FirstOrDefaultAsync();
            stor.StoreName = store.StoreName;
            stor.StoreAddress = store.StoreAddress;
            if (ModelState.IsValid)
            {
                _db.Store.Update(stor);
            }
            else
            {
                return 0;
            }
            await _db.SaveChangesAsync();
            return 1;
        }
        [HttpDelete]
        public async Task<int> DeleteStore(Store store)
        {
            var stor = await _db.Store.Where(x => x.StoreId == store.StoreId).FirstOrDefaultAsync();
            if (stor != null)
            {
                _db.Store.Remove(stor);
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
