using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OnboardingApp.DbContexts;
using OnboardingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnboardingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CustomerController(ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomersList()
        {
            var list = await _db.Customer.Select(x => new Customer
            {
                CustomerId = x.CustomerId,
                CustomerName = x.CustomerName,
                Address = x.Address,
            }).ToListAsync();

            return list;
        }

        [HttpPost]
        public async Task<int> Post(Customer customer)
        {
            if (ModelState.IsValid)
            {
                _db.Customer.Add(customer);
            }
            else
            {
                return 0;
            }

            await _db.SaveChangesAsync();
            return 1;
        }

        //[HttpGet]
        //public async Task<Customer> GetUpdateCustomer(int id)
        //{
        //    var customer = await _db.Customer.Where(x => x.CustomerId == id).FirstOrDefaultAsync();
        //    return customer;
        //}

        [HttpPut]
        public async Task<int> UpdateCustomer(Customer customer)
        {
            var cust = await _db.Customer.Where(x => x.CustomerId == customer.CustomerId).FirstOrDefaultAsync();
            cust.CustomerName = customer.CustomerName;
            cust.Address = customer.Address;
            if (ModelState.IsValid)
            {
                _db.Customer.Update(cust);
            }
            else
            {
                return 0;
            }
            await _db.SaveChangesAsync();
            return 1;
        }

        [HttpDelete]
        public async Task<int> DeleteCustomer(Customer customer)
        {
            var cust = await _db.Customer.Where(x => x.CustomerId == customer.CustomerId).FirstOrDefaultAsync();
            if(cust != null)
            {
                _db.Customer.Remove(cust);
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
