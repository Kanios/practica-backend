const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Comercio API - Documentación",
      version: "1.0.0",
      description: "API para la gestión de comercios",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        Comercio: {
          type: "object",
          required: ["nombre", "cif", "direccion", "email", "telefono"],
          properties: {
            nombre: {
              type: "string",
              description: "Nombre del comercio",
            },
            cif: {
              type: "string",
              description: "CIF del comercio",
            },
            direccion: {
              type: "string",
              description: "Dirección del comercio",
            },
            email: {
              type: "string",
              description: "Email del comercio",
            },
            telefono: {
              type: "string",
              description: "Teléfono del comercio",
            },
            ciudad: {
              type: "string",
              description: "Ciudad del comercio",
            },
            actividad: {
              type: "string",
              description: "Actividad del comercio",
            },
            titulo: {
              type: "string",
              description: "Título del comercio",
            },
            resumen: {
              type: "string",
              description: "Resumen del comercio",
            },
            textos: {
              type: "string",
              description: "Textos del comercio",
            },
            fotos: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Fotos del comercio",
            },
            scoring: {
              type: "number",
              default: 0,
              description: "Scoring del comercio",
            },
            numeroPuntuaciones: {
              type: "number",
              default: 0,
              description: "Número de puntuaciones del comercio",
            },
            reseñas: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  usuario: { type: "string", description: "ID del usuario" },
                  comentario: { type: "string", description: "Comentario de la reseña" },
                  calificacion: { type: "number", description: "Calificación de la reseña" },
                  fecha: { type: "string", format: "date-time", description: "Fecha de la reseña" },
                },
              },
              description: "Reseñas del comercio",
            },
            borrado: {
              type: "boolean",
              default: false,
              description: "Indica si el comercio está borrado",
            },
          },
        },
        User: {
          type: "object",
          required: ["email", "password", "nombre", "edad", "ciudad"],
          properties: {
            email: { type: "string", description: "Email del usuario" },
            password: { type: "string", description: "Contraseña del usuario" },
            nombre: { type: "string", description: "Nombre del usuario" },
            edad: { type: "number", description: "Edad del usuario" },
            ciudad: { type: "string", description: "Ciudad del usuario" },
            intereses: { type: "array", items: { type: "string" }, description: "Intereses del usuario" },
            permiteRecibirOfertas: { type: "boolean", description: "Permite recibir ofertas" },
          },
        },
        Admin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", description: "Email del admin" },
            password: { type: "string", description: "Contraseña del admin" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);