using GitHubSearchApi.Models; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace GitHubSearchApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel loginModel)
    {

        if (loginModel == null || string.IsNullOrEmpty(loginModel.Username) || string.IsNullOrEmpty(loginModel.Password))
        {
            return BadRequest("Username and password are required.");
        }


        var adminUsername = _configuration["AdminCredentials:Username"];
        var adminPassword = _configuration["AdminCredentials:Password"];

        if (loginModel.Username == adminUsername && loginModel.Password == adminPassword)
        {
            var token = GenerateJwtToken();
            return Ok(new { token });
        }

        return Unauthorized("Invalid credentials.");
    }

    private string GenerateJwtToken()
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

      

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}