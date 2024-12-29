using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration configuration) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = configuration["TokenKey"]?? throw new Exception("No se puede acceder a tokenKey desde appsettings");
        if(tokenKey.Length < 64)  throw new Exception("Tu tokenKey necesita ser mas largo");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier,user.UserName)
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
