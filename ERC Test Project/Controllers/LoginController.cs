using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Threading.Tasks.Dataflow;
using System.IO;
using Newtonsoft.Json.Linq;

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

            //string connectionString = "Server=tcp:erc-internship-group.database.windows.net,1433;Database=Northwind;User ID=common;Password=Cville2020;Trusted_Connection=False;Encrypt=True;";
            string connectionString = "Server=KARTHIKMSILAPTO;Database=Northwind;Trusted_Connection=True;";
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

        [HttpPost]
        public void Post()
        {
            Task<string> content;
            using (var reader = new StreamReader(Request.Body))
                content = reader.ReadToEndAsync();
            string[] sent = content.Result.Split('|');

            System.Diagnostics.Debug.WriteLine(sent[0]);
            System.Diagnostics.Debug.WriteLine(sent[1]);
            System.Diagnostics.Debug.WriteLine(sent[2]);

            //string connectionString = "Server=tcp:erc-internship-group.database.windows.net,1433;Database=Northwind;User ID=common;Password=Cville2020;Trusted_Connection=False;Encrypt=True;";
            string connectionString = "Server=KARTHIKMSILAPTO;Database=Northwind;Trusted_Connection=True;";
            SqlConnection con = new SqlConnection(connectionString);
            try
            {
                con.Open();
                SqlCommand command = new SqlCommand("update customers set " + sent[1] + " = '" + sent[2] + "' where customerID= '" + sent[0] +"';");
                command.Connection = con;
                command.ExecuteReader();
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

    } 
   
}
