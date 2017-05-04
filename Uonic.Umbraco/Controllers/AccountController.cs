using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Umbraco.Web.Models;
using Umbraco.Web.WebApi;
using UmbracoIdentity;
using Uonic.Umbraco.Models;
using Uonic.Umbraco.Models.UmbracoIdentity;

namespace Uonic.Umbraco.Controllers
{
    /// <summary>
    /// Implements operations on member accounts.
    /// </summary>
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class AccountController : UmbracoApiController
    {
        private UmbracoMembersUserManager<UmbracoApplicationMember> _userManager;

        /// <summary>
        /// The OWIN context for the current request.
        /// </summary>
        protected IOwinContext OwinContext
        {
            get { return Request.GetOwinContext(); }
        }

        /// <summary>
        /// The user manager from the current OWIN context.
        /// </summary>
        public UmbracoMembersUserManager<UmbracoApplicationMember> UserManager
        {
            get
            {
                return _userManager ?? (_userManager = OwinContext
                    .GetUserManager<UmbracoMembersUserManager<UmbracoApplicationMember>>());
            }
        }

        /// <summary>
        /// Registers a new member.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new UmbracoApplicationMember
            {
                UserName = model.Email,
                Email = model.Email,
                MemberProperties = new List<UmbracoProperty>
                {
                    new UmbracoProperty { Alias = "firstName", Value = model.FirstName },
                    new UmbracoProperty { Alias = "surname", Value = model.Surname }
                }
            };
            var result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        /// <summary>
        /// Gets the appropriate error result for the given identity result.
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}