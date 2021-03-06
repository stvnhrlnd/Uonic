﻿using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using Umbraco.Site;
using Umbraco.Site.Models;
using Umbraco.Site.Providers;
using Umbraco.Web;
using Umbraco.Web.Security.Identity;
using UmbracoIdentity;

[assembly: OwinStartup("UmbracoIdentityStartup", typeof(UmbracoIdentityStartup))]

namespace Umbraco.Site
{
    /// <summary>
    /// OWIN Startup class for UmbracoIdentity 
    /// </summary>
    public class UmbracoIdentityStartup : UmbracoDefaultOwinStartup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        /// <summary>
        /// Configures services to be created in the OWIN context (CreatePerOwinContext)
        /// </summary>
        /// <param name="app"/>
        protected override void ConfigureServices(IAppBuilder app)
        {
            base.ConfigureServices(app);

            // Single method to configure the Identity user manager for use with Umbraco
            app.ConfigureUserManagerForUmbracoMembers<UmbracoApplicationMember>();

            // Single method to configure the Identity user manager for use with Umbraco
            app.ConfigureRoleManagerForUmbracoMembers<UmbracoApplicationRole>();
        }

        /// <summary>
        /// Configures middleware to be used (i.e. app.Use...)
        /// </summary>
        /// <param name="app"/>
        protected override void ConfigureMiddleware(IAppBuilder app)
        {
            // Ensure owin is configured for Umbraco back office authentication. If you have any front-end OWIN
            // cookie configuration, this must be declared after it.
            app
                .UseUmbracoBackOfficeCookieAuthentication(ApplicationContext, PipelineStage.Authenticate)
                .UseUmbracoBackOfficeExternalCookieAuthentication(ApplicationContext, PipelineStage.Authenticate);

            // Allow cross domain requests
            app.UseCors(CorsOptions.AllowAll);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure the application for OAuth based flow
            PublicClientId = "uonic";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/Umbraco/Api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //    consumerKey: "",
            //    consumerSecret: "");

            if (!string.IsNullOrWhiteSpace(AppSettings.FacebookAppId) &&
                !string.IsNullOrWhiteSpace(AppSettings.FacebookAppSecret))
            {
                app.UseFacebookAuthentication(new FacebookAuthenticationOptions()
                {
                    AppId = AppSettings.FacebookAppId,
                    AppSecret = AppSettings.FacebookAppSecret,
                    UserInformationEndpoint = "https://graph.facebook.com/v2.9/me?fields=id,name,email"
                });
            }

            if (!string.IsNullOrWhiteSpace(AppSettings.GoogleClientId) &&
                !string.IsNullOrWhiteSpace(AppSettings.GoogleClientSecret))
            {
                app.UseGoogleAuthentication(
                    clientId: AppSettings.GoogleClientId,
                    clientSecret: AppSettings.GoogleClientSecret);
            }

            // Lasty we need to ensure that the preview Middleware is registered, this must come after
            // all of the authentication middleware:
            app.UseUmbracoPreviewAuthentication(ApplicationContext, PipelineStage.Authorize);
        }
    }
}