using Newtonsoft.Json.Serialization;
using System.Web.Http;
using Umbraco.Core;

namespace Umbraco.Site.App_Start
{
    public class UmbracoEventHandler : ApplicationEventHandler
    {
        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            var config = GlobalConfiguration.Configuration;

            // Configure Web API to return JSON with camel case property names
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
        }
    }
}