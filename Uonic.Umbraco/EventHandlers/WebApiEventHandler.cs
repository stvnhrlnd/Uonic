using System.Web.Http;
using Umbraco.Core;

namespace Uonic.Umbraco.EventHandlers
{
    /// <summary>
    /// Implements startup event handlers for configuring Web API.
    /// </summary>
    public class WebApiEventHandler : ApplicationEventHandler
    {
        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication,
            ApplicationContext applicationContext)
        {
            // Enable support for CORS
            GlobalConfiguration.Configuration.EnableCors();
        }
    }
}