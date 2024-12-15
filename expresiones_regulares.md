---

## **1. Expresiones Regulares (RegEx)**

### **¿Qué son las expresiones regulares?**
Las expresiones regulares son patrones utilizados para buscar, validar o manipular cadenas de texto. Estos patrones son muy potentes y permiten identificar combinaciones específicas de caracteres dentro de una cadena.

### **Sintaxis básica de RegEx**
| Símbolo | Significado | Ejemplo               |
|---------|-------------|-----------------------|
| `.`     | Cualquier carácter (excepto salto de línea) | `a.c` coincide con `abc`, `a1c`. |
| `*`     | Cero o más repeticiones del carácter anterior | `a*` coincide con `a`, `aaa`, o `nada`. |
| `+`     | Una o más repeticiones del carácter anterior | `a+` coincide con `a`, `aaa`, pero no con `nada`. |
| `?`     | Cero o una repetición del carácter anterior | `a?` coincide con `a` o nada. |
| `{n}`   | Exactamente `n` repeticiones | `a{2}` coincide con `aa`. |
| `[abc]` | Cualquier carácter dentro de los corchetes | `[aeiou]` coincide con cualquier vocal. |
| `[^abc]`| Cualquier carácter *excepto* los incluidos | `[^aeiou]` coincide con consonantes. |
| `\d`    | Cualquier dígito (0-9) | `\d+` coincide con `123`. |
| `\w`    | Cualquier carácter alfanumérico o guion bajo | `\w+` coincide con `abc123`. |
| `\s`    | Cualquier espacio en blanco | `\s+` coincide con espacios, tabulaciones. |

### **Ejemplo práctico en JavaScript**
```javascript
const texto = "Mi número es 123-456-7890.";
const regex = /\d{3}-\d{3}-\d{4}/;
const coincidencia = texto.match(regex);
console.log(coincidencia); // Output: ["123-456-7890"]
```

---

## **2. Aplicación de RegEx en React**

### **¿Dónde se usan las expresiones regulares en React?**
1. **Validación de formularios**:
   - Ejemplo: Validar emails, números de teléfono, contraseñas.
2. **Filtrado de datos**:
   - Ejemplo: Buscar coincidencias en listas o tablas dinámicas.
3. **Manipulación de texto**:
   - Ejemplo: Extraer partes específicas de un texto (como un dominio en una URL).

---

### **Ejercicio 1: Validar un email en un formulario**
```javascript
import React, { useState } from "react";

const ValidarEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const manejarCambio = (e) => {
    const valor = e.target.value;
    setEmail(valor);

    // RegEx para validar un correo
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(valor)) {
      setError("Email no válido");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <form>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={manejarCambio}
            placeholder="Ingresa tu correo"
          />
        </label>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default ValidarEmail;
```

### **Explicación**
1. **`regex.test(valor)`:** Comprueba si la cadena cumple el patrón de un correo electrónico.
2. **Estado `error`:** Actualiza el mensaje de error si el correo no es válido.

---

### **Ejercicio 2: Validar una contraseña fuerte**
```javascript
import React, { useState } from "react";

const ValidarPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarCambio = (e) => {
    const valor = e.target.value;
    setPassword(valor);

    // RegEx para validar contraseñas fuertes
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(valor)) {
      setError("La contraseña debe tener: 8 caracteres, una mayúscula, un número y un símbolo.");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <form>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={manejarCambio}
            placeholder="Ingresa tu contraseña"
          />
        </label>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default ValidarPassword;
```

### **Explicación**
1. **`(?=.*[a-z])`:** Al menos una letra minúscula.
2. **`(?=.*[A-Z])`:** Al menos una letra mayúscula.
3. **`(?=.*\d)`:** Al menos un dígito.
4. **`(?=.*[\W_])`:** Al menos un carácter especial.
5. **`{8,}`:** Mínimo de 8 caracteres.

---

### **Ejercicio 3: Filtrar una lista de elementos**
```javascript
import React, { useState } from "react";

const FiltrarLista = () => {
  const [busqueda, setBusqueda] = useState("");
  const elementos = ["Manzana", "Banana", "Uva", "Mango", "Mandarina"];

  const elementosFiltrados = elementos.filter((elemento) =>
    new RegExp(busqueda, "i").test(elemento) // Filtra usando RegEx
  );

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Busca una fruta"
      />
      <ul>
        {elementosFiltrados.map((elemento, index) => (
          <li key={index}>{elemento}</li>
        ))}
      </ul>
    </div>
  );
};

export default FiltrarLista;
```

### **Explicación**
1. **`RegExp(busqueda, "i")`:** Busca coincidencias de manera insensible a mayúsculas/minúsculas.
2. **`filter`:** Devuelve solo los elementos que coinciden con el patrón.

---

### **Sobre `preventDefault` y su relación con formularios**
En React, usamos `preventDefault()` para evitar que un formulario recargue la página al ser enviado. Esto nos da control sobre qué sucede cuando el usuario hace clic en el botón de envío.
