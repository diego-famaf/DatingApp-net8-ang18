using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "El nombre de usuario es requerido")]
    public  string Username { get; set; } = string.Empty;
    [Required(ErrorMessage = "La contraseña es requerida")]
    [StringLength(8,MinimumLength =4,ErrorMessage = "La contraseña debe tener entre 4 y 8 caracteres.")]
    public  string Password { get; set; } = string.Empty;
}
