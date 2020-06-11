using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace ERC_Test_Project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {

        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        

        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            List<Customer> result = new List<Customer>();

            string connectionString = "Server=tcp:erc-internship-group.database.windows.net,1433;Database=Northwind;User ID=common;Password=Cville2020;Trusted_Connection=False;Encrypt=True;";
            SqlConnection con = new SqlConnection(connectionString);
            SqlDataReader reader = null;
            try
            {
                con.Open();
                SqlCommand command = new SqlCommand("select * from [dbo].[Customers]");
                command.Connection = con;
                reader = command.ExecuteReader();

                while (reader.Read())
                {
                    result.Add(new Customer
                    {
                        id = (string)reader[0],
                        companyName = (string)reader[1],
                        name = (string)reader[2],
                        title = (string)reader[3],
                        address = (string)reader[4],
                        city = (string)reader[5],
                        region = reader[6] == DBNull.Value ? "" : (string) reader[6],
                        postalCode = reader[7] == DBNull.Value ? "" : (string)reader[7],
                        country = (string)reader[8],
                        phoneNumber = (string)reader[9],
                        fax = reader[10] == DBNull.Value ? "" : (string)reader[10]
                    });
                }
            } 
            finally
            {
                if (reader != null)
                {
                    reader.Close();
                }
                if (con != null)
                {
                    con.Close();
                }
            }
            

     
            return result.ToArray();
        }
        
    }
    
}
