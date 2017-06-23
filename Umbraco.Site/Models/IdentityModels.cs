using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using UmbracoIdentity.Models;

namespace Umbraco.Site.Models
{
    public class UmbracoApplicationMember : UmbracoIdentityMember
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<UmbracoApplicationMember, int> manager,
            string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class UmbracoApplicationRole : UmbracoIdentityRole
    {
    }
}