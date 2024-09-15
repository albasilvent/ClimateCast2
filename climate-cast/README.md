# CLIMATE CAST

Esta aplicación de pronóstico del clima ha sido desarrollada utilizando diversas herramientas y buenas prácticas para asegurar un código limpio, estructurado y fácil de mantener.

# Requisitos previos

Para que la aplicación funcione correctamente, debes seguir estos pasos antes de ejecutarla:

1. Clonar el repositorio en tu máquina local.

2. Ejecutar el comando npm install para instalar las dependencias necesarias.

3. Crear un archivo .env en la raíz del proyecto e incluir tu clave de API (API_KEY) para los servicios de clima. Un ejemplo del archivo .env sería:

# TESTING

Una vez configurado todo, puedes iniciar el servidor de desarrollo con el siguiente comando:

npm run dev

# Tecnologías y herramientas utilizadas

1. TypeScript: Lenguaje utilizado para asegurar tipado estático y mayor robustez en el código.
2. ESLint con Airbnb Style: Configuración de estilo de código basada en las reglas de Airbnb para mantener consistencia y limpieza en el proyecto.
3. Sass: Preprocesador CSS utilizado para gestionar estilos de forma modular y eficiente.
4. Vitest: Utilizado para las pruebas unitarias, permitiendo un desarrollo basado en test de forma ágil.
5. React Clean Code: La arquitectura del proyecto sigue las prácticas recomendadas para escribir código limpio en React, basadas en los siguientes recursos:

- [Best Practices for Writing Clean React Code](https://dev.to/serifcolakel/best-practices-for-writing-clean-react-code-with-examples-4b90)
- [Estructuras para organizar un proyecto React](https://reboot.studio/blog/es/estructuras-organizar-proyecto-react)
  Arquitectura del proyecto:
  SLa aplicación sigue una arquitectura modular y bien estructurada, que separa los componentes de lógica de negocio, presentación y estilo. Esta organización facilita la escalabilidad y el mantenimiento del código.

# Diseño basado en el patrón Observer

Como patrón de diseño, se ha implementado el patrón Observer, aprovechando el Context API de React. Este patrón permite que los componentes reaccionen automáticamente ante cambios en el estado, facilitando la comunicación eficiente entre diferentes partes de la aplicación. Más información sobre este patrón puede encontrarse aquí:

https://refactoring.guru/es/design-patterns/observer

# Funcionalidades adicionales

Además de los requisitos iniciales de la prueba, se han añadido las siguientes mejoras:

1. Barra de búsqueda: Permite buscar una ciudad específica para obtener su pronóstico del clima.
2. Lista de favoritos: Puedes guardar y gestionar una lista de ciudades favoritas para acceder rápidamente a su pronóstico.
3. Pronóstico por hora: Ahora es posible ver el pronóstico por horas para cada día de la semana, proporcionando mayor detalle y precisión.
