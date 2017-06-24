using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Umbraco.Site
{
    public class AppSettings
    {
        public static string FacebookAppId => ConfigurationManager.AppSettings["FacebookAppId"];
        public static string FacebookAppSecret => ConfigurationManager.AppSettings["FacebookAppSecret"];
        public static string GoogleClientId => ConfigurationManager.AppSettings["GoogleClientId"];
        public static string GoogleClientSecret => ConfigurationManager.AppSettings["GoogleClientSecret"];
    }
}