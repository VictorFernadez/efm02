¡Claro! Los **eventos en React** son muy similares a los eventos en JavaScript, pero tienen algunas diferencias importantes debido a cómo React maneja el DOM virtual. A continuación, te explico los conceptos clave:

---

### **¿Qué son los eventos en React?**
Los eventos son funciones que reaccionan a interacciones del usuario o del sistema, como hacer clic, mover el ratón, escribir en un campo de texto, entre otros. En React, se representan como propiedades en los elementos JSX.

**Ejemplo básico:**
```javascript
const MiComponente = () => {
  const handleClick = () => {
    console.log("Botón clickeado");
  };

  return <button onClick={handleClick}>Clic aquí</button>;
};
```

---

### **Diferencias entre eventos en React y en JavaScript:**

1. **Nombres camelCase:**
   - En React, los nombres de eventos están en **camelCase** (`onClick`, `onMouseOver`, etc.), mientras que en HTML nativo usan minúsculas (`onclick`, `onmouseover`).

2. **Funciones en lugar de cadenas:**
   - En React, se pasa una referencia a una función como manejador del evento, no una cadena como en HTML.

   **React:**
   ```javascript
   <button onClick={handleClick}>Clic aquí</button>
   ```

   **HTML nativo:**
   ```html
   <button onclick="handleClick()">Clic aquí</button>
   ```

3. **SyntheticEvent:**
   - React utiliza un sistema de eventos llamado **SyntheticEvent**, que es un envoltorio alrededor de los eventos del DOM nativo. Esto asegura la compatibilidad entre navegadores y agrega optimizaciones internas.

---

### **Tipos comunes de eventos en React**

1. **Eventos del mouse:**
   ```javascript
   <button onClick={handleClick}>Clic</button>
   <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
     Pasa el mouse aquí
   </div>
   ```

2. **Eventos del teclado:**
   ```javascript
   <input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
   ```

3. **Eventos de formulario:**
   ```javascript
   <form onSubmit={handleSubmit}>
     <input onChange={handleChange} />
     <button type="submit">Enviar</button>
   </form>
   ```

4. **Eventos de enfoque:**
   ```javascript
   <input onFocus={handleFocus} onBlur={handleBlur} />
   ```

5. **Eventos del navegador:**
   ```javascript
   <img src="imagen.jpg" onLoad={handleLoad} onError={handleError} />
   ```

---

### **Manejo de eventos:**

1. **Evitar comportamiento por defecto:**
   Puedes usar `event.preventDefault()` en eventos como `onSubmit` para evitar recargas de página:
   ```javascript
   const handleSubmit = (event) => {
     event.preventDefault();
     console.log("Formulario enviado");
   };
   ```

2. **Acceso al evento:**
   React pasa el evento como argumento a la función manejadora. Este evento es un `SyntheticEvent`:
   ```javascript
   const handleClick = (event) => {
     console.log(event.type); // "click"
   };
   ```

3. **Pasar parámetros al manejador:**
   Si necesitas pasar datos adicionales, usa una función envolvente:
   ```javascript
   const handleClick = (nombre) => {
     console.log(`Hola, ${nombre}`);
   };

   <button onClick={() => handleClick("Juan")}>Clic aquí</button>;
   ```

---

### **Ejemplo práctico completo**
Aquí tienes un ejemplo de un contador que incrementa y reinicia su valor con eventos:

```javascript
import React, { useState } from "react";

const Contador = () => {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador(contador + 1);
  const reiniciar = () => setContador(0);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
};

export default Contador;
```

---

### **Errores comunes al manejar eventos:**

1. **No usar una referencia a una función:**
   Si llamas a la función directamente, esta se ejecutará al renderizar el componente, no al dispararse el evento.
   ```javascript
   // Incorrecto
   <button onClick={handleClick()}>Clic aquí</button>;

   // Correcto
   <button onClick={handleClick}>Clic aquí</button>;
   ```

2. **Olvidar el `event.preventDefault()`:**
   Esto es crítico en formularios o enlaces con `href`.

3. **Confundir métodos del DOM con eventos SyntheticEvent:**
   Algunos métodos del SyntheticEvent son similares pero no idénticos a los del DOM nativo.

---
¡Perfecto! Aquí tienes ejercicios para cada tipo de evento mencionado, con su explicación detallada. Los ejercicios irán incrementando en complejidad.

---

## **1. Eventos del Mouse**

### **Ejercicio 1: Botón que cambia de color al hacer clic**
Este ejercicio utiliza `onClick`.

```javascript
import React, { useState } from "react";

const BotonColor = () => {
  const [color, setColor] = useState("blue");

  const cambiarColor = () => setColor(color === "blue" ? "red" : "blue");

  return (
    <button 
      onClick={cambiarColor} 
      style={{ backgroundColor: color, color: "white", padding: "10px" }}
    >
      Cambiar Color
    </button>
  );
};

export default BotonColor;
```

### **Explicación:**
- **`onClick`:** Dispara la función `cambiarColor` al hacer clic en el botón.
- **`style`:** Cambia dinámicamente el color de fondo con el estado `color`.

---

### **Ejercicio 2: Detectar entrada y salida del mouse**
Este ejercicio utiliza `onMouseEnter` y `onMouseLeave`.

```javascript
import React, { useState } from "react";

const DetectarMouse = () => {
  const [mensaje, setMensaje] = useState("Pasa el mouse por aquí");

  const manejarEntrada = () => setMensaje("¡Entraste!");
  const manejarSalida = () => setMensaje("¡Saliste!");

  return (
    <div 
      onMouseEnter={manejarEntrada} 
      onMouseLeave={manejarSalida}
      style={{ padding: "20px", border: "1px solid black", textAlign: "center" }}
    >
      {mensaje}
    </div>
  );
};

export default DetectarMouse;
```

### **Explicación:**
- **`onMouseEnter`:** Cambia el mensaje al pasar el cursor sobre el `div`.
- **`onMouseLeave`:** Cambia el mensaje al quitar el cursor del `div`.

---

### **Ejercicio 3: Dibujar clics del mouse**
Este ejercicio muestra las coordenadas de clics en pantalla.

```javascript
import React, { useState } from "react";

const CoordenadasClic = () => {
  const [coordenadas, setCoordenadas] = useState({ x: 0, y: 0 });

  const manejarClic = (e) => setCoordenadas({ x: e.clientX, y: e.clientY });

  return (
    <div 
      onClick={manejarClic} 
      style={{ height: "200px", border: "1px solid black" }}
    >
      <p>Coordenadas: ({coordenadas.x}, {coordenadas.y})</p>
    </div>
  );
};

export default CoordenadasClic;
```

### **Explicación:**
- **`onClick`:** Detecta la posición del clic (`e.clientX`, `e.clientY`) y actualiza el estado.
- **`e`:** Es el evento que proporciona los datos del clic.

---

## **2. Eventos del Teclado**

### **Ejercicio 1: Contar teclas presionadas**
```javascript
import React, { useState } from "react";

const ContadorTeclas = () => {
  const [conteo, setConteo] = useState(0);

  const manejarTecla = () => setConteo((prev) => prev + 1);

  return (
    <input 
      onKeyDown={manejarTecla} 
      placeholder="Escribe algo..." 
      style={{ padding: "5px", width: "200px" }}
    />
  );
};

export default ContadorTeclas;
```

### **Explicación:**
- **`onKeyDown`:** Se dispara cada vez que se presiona una tecla.
- **`setConteo`:** Incrementa el conteo en cada evento.

---

### **Ejercicio 2: Mostrar la tecla presionada**
```javascript
import React, { useState } from "react";

const MostrarTecla = () => {
  const [tecla, setTecla] = useState("");

  const manejarTecla = (e) => setTecla(e.key);

  return (
    <div>
      <input 
        onKeyDown={manejarTecla} 
        placeholder="Presiona una tecla..." 
      />
      <p>Tecla presionada: {tecla}</p>
    </div>
  );
};

export default MostrarTecla;
```

### **Explicación:**
- **`e.key`:** Obtiene la tecla específica que fue presionada.

---

### **Ejercicio 3: Bloquear entrada de números**
```javascript
const BloquearNumeros = () => {
  const manejarInput = (e) => {
    if (!isNaN(e.key)) e.preventDefault();
  };

  return (
    <input 
      onKeyDown={manejarInput} 
      placeholder="Solo letras..." 
    />
  );
};

export default BloquearNumeros;
```

### **Explicación:**
- **`e.preventDefault()`:** Bloquea el comportamiento predeterminado si se presiona un número.

---

## **3. Eventos de Formularios**

### **Ejercicio 1: Manejo de formularios básicos**
```javascript
import React, { useState } from "react";

const Formulario = () => {
  const [nombre, setNombre] = useState("");

  const manejarCambio = (e) => setNombre(e.target.value);

  const manejarSubmit = (e) => {
    e.preventDefault();
    alert(`Hola, ${nombre}`);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input 
        type="text" 
        value={nombre} 
        onChange={manejarCambio} 
        placeholder="Tu nombre" 
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
```

### **Explicación:**
- **`onChange`:** Actualiza el estado con el valor del input.
- **`onSubmit`:** Captura el envío y muestra un mensaje de saludo.

---

### **Ejercicio 2: Mostrar valores de varios inputs**
```javascript
import React, { useState } from "react";

const MultiInput = () => {
  const [form, setForm] = useState({ nombre: "", email: "" });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form>
      <input 
        type="text" 
        name="nombre" 
        placeholder="Nombre" 
        onChange={manejarCambio} 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        onChange={manejarCambio} 
      />
      <p>Nombre: {form.nombre}</p>
      <p>Email: {form.email}</p>
    </form>
  );
};

export default MultiInput;
```

### **Explicación:**
- **`name`:** Identifica el campo que cambia.
- **`setForm`:** Actualiza el estado dinámicamente.

---
