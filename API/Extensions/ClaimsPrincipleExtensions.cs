using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static string GetUsername(this ClaimsPrincipal user )
    {
        var username = user.FindFirstValue(ClaimTypes.Name) 
            ?? throw new Exception("No se puede obtener el nombre de usuario desde el token");
        return username;
    }

    public static int GetUserId(this ClaimsPrincipal user )
    {
        var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier) 
            ?? throw new Exception("No se puede obtener el nombre de usuario desde el token"));
        return userId;
    }
}
