# import jwt
# from rest_framework.permissions import BasePermission

# class HasRole(BasePermission):
#     """
#     Permiso personalizado para verificar roles en el token JWT.
#     """
#     role = None  # El rol requerido para este permiso

#     def has_permission(self, request, view):
#         # Verificar que se haya definido un rol
#         if not self.role:
#             print("El rol no está definido en el permiso.")
#             return False

#         # Obtener el token JWT desde el encabezado Authorization
#         auth_header = request.headers.get('Authorization', '')
#         token = auth_header.split('Bearer ')[-1]

#         if not token or token == auth_header:  # No se proporcionó el token
#             print("No se encontró un token válido en el encabezado Authorization.")
#             return False

#         try:
#             # Decodificar el token JWT (sin verificar la firma para pruebas)
#             decoded_token = jwt.decode(token, options={"verify_signature": False})
#             print("Token decodificado con éxito:", decoded_token)

#             # Obtener los roles del namespace configurado
#             roles = decoded_token.get('https://your-app.com/roles', [])
#             print("Roles obtenidos del token:", roles)

#             # Verificar si el rol requerido está presente
#             if self.role in roles:
#                 print(f"Permiso concedido: el usuario tiene el rol '{self.role}'.")
#                 return True
#             else:
#                 print(f"Permiso denegado: el usuario no tiene el rol '{self.role}'.")
#                 return False

#         except jwt.DecodeError:
#             print("Error al decodificar el token JWT.")
#             return False
#         except Exception as e:
#             print(f"Error inesperado: {e}")
#             return False
