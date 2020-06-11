using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.Sql;
using System.Data.SqlClient;

class LoginSql
{
    static void connect()
    {
        SqlConnection con = new SqlConnection("");
        SqlDataReader reader = null;
    }
}
