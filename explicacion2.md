El hook `useEffect` en React permite realizar **efectos secundarios** en los componentes. Piensa en efectos secundarios como tareas externas que deben ejecutarse después de que React haya actualizado el DOM, como:

- **Consultar una API**
- **Suscribirse a eventos**
- **Actualizar el título de la página**
- **Gestionar un temporizador**

### **Analogía del Mundo Real:**
Imagina que estás cocinando y sigues una receta. Los pasos de la receta son tus **renderizados principales** (lo que React dibuja en pantalla). Pero después de completar cada paso, tienes que hacer tareas adicionales, como:
- Limpiar la mesa (**efecto secundario**).
- Avisar a alguien que la comida estará lista (**efecto secundario**).
- Desconectar el horno cuando ya no lo necesitas (**limpieza del efecto**).

En React, `useEffect` es como configurar estas tareas adicionales en el contexto de tu componente.

---

### **Uso Básico de `useEffect`**
```javascript
import React, { useState, useEffect } from "react";

const Temporizador = () => {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    // Este código se ejecuta cada vez que se renderiza el componente
    console.log(`El componente se actualizó. Segundos: ${segundos}`);

    // Opción para realizar tareas periódicas
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    // Cleanup: Esto se ejecuta cuando el componente se desmonta o se actualiza
    return () => clearInterval(intervalo);
  }, [segundos]); // Solo se ejecuta cuando 'segundos' cambia

  return <div>Segundos: {segundos}</div>;
};
```

---

### **Analogías con este Ejemplo**
1. **Primera Montura**: Cuando montas el componente por primera vez, es como preparar los ingredientes para cocinar. `useEffect` ejecuta su función inicial.
2. **Actualizaciones**: Si cambias algo (un estado como `segundos`), es como si añades más ingredientes y continúas cocinando. `useEffect` vuelve a ejecutarse para reflejar los cambios.
3. **Limpieza (Cleanup)**: Cuando terminas de cocinar, limpias el área de trabajo. Esto es lo que hace la función de limpieza retornada por `useEffect`.

---

### **Ejemplos Claves para Usos Comunes**

#### 1. **Cargar Datos de una API**
```javascript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  };

  fetchData();
}, []); // El arreglo vacío asegura que esto se ejecuta solo una vez, al montar el componente.
```

#### 2. **Escuchar Eventos del Teclado**
```javascript
useEffect(() => {
  const manejarTecla = (e) => console.log(`Tecla presionada: ${e.key}`);
  window.addEventListener("keydown", manejarTecla);

  return () => window.removeEventListener("keydown", manejarTecla);
}, []); // Solo al montar y desmontar.
```

#### 3. **Ejecutar Algo Cuando un Valor Cambia**
```javascript
useEffect(() => {
  console.log(`El contador cambió: ${contador}`);
}, [contador]); // Solo se ejecuta cuando 'contador' cambia.
```

---

### **Resumiendo `useEffect`**
- Es **como una lista de tareas adicionales** que React ejecuta después de renderizar.
- Se usa para tareas como:
  - Llamadas a APIs.
  - Suscripciones a eventos.
  - Temporizadores.
  - Limpieza al desmontar el componente.
- **Analogía:** Montar un componente = empezar a cocinar, actualizar = añadir ingredientes, desmontar = limpiar todo.

---
¡Buena observación! Aunque en este caso no se están usando **propiedades computadas**, la lógica detrás del código tiene un propósito similar al que vimos antes: actualizar una parte del estado sin perder los valores anteriores.

Desglosemos esta línea para entenderla:

### Código
```javascript
setFormData({ ...formData, skills: newSkills });
```

---

### **Paso a Paso de lo que hace**
1. **`...formData`:** 
   - Esta es la **sintaxis de propagación (spread)**.
   - Crea una **copia** de todo el contenido actual del estado `formData`. De esta manera, no pierdes los demás datos almacenados en el objeto.

   Por ejemplo, si `formData` tiene:
   ```javascript
   formData = {
       name: "Juan",
       email: "juan@example.com",
       skills: []
   };
   ```
   Entonces, `...formData` crea una copia exacta:
   ```javascript
   {
       name: "Juan",
       email: "juan@example.com",
       skills: [] // Aquí todavía no actualizamos nada.
   }
   ```

2. **`skills: newSkills`:** 
   - Aquí estás **sobrescribiendo** el valor de la propiedad `skills` dentro de la copia que hiciste de `formData`.
   - El nuevo valor de `skills` será `newSkills`, que ya contiene un arreglo con las habilidades obtenidas de `e.target.value`.

   Siguiendo el ejemplo, si `newSkills` es:
   ```javascript
   ["React", "JavaScript", "CSS"]
   ```
   Entonces el resultado final será:
   ```javascript
   {
       name: "Juan",
       email: "juan@example.com",
       skills: ["React", "JavaScript", "CSS"]
   }
   ```

3. **`setFormData`:** 
   - Finalmente, **actualizas el estado** con el objeto modificado que contiene tanto las propiedades originales (`name`, `email`) como el valor actualizado (`skills`).

---

### **¿Por qué no usa propiedades computadas aquí?**
No es necesario usar propiedades computadas porque el nombre de la clave (`skills`) es fijo. Las propiedades computadas solo son útiles cuando el nombre de la propiedad es dinámico (es decir, puede cambiar según el contexto).

Si en lugar de `skills` quisieras actualizar una propiedad cuyo nombre depende de otro valor (por ejemplo, `e.target.name`), entonces las propiedades computadas serían necesarias:
```javascript
setFormData({ ...formData, [e.target.name]: newSkills });
```

---

### **¿Por qué se usa `...formData`?**
La sintaxis de propagación es importante porque React **no permite modificar directamente el estado**. Si no incluyes `...formData`, estarías sobrescribiendo completamente el estado con solo la nueva propiedad:
```javascript
setFormData({ skills: newSkills }); // ERROR: Pierdes el resto de las propiedades.
```

---

### **Analogía del Mundo Real**
Imagina que `formData` es una hoja de papel con varios datos escritos:
- Nombre: Juan
- Email: juan@example.com
- Habilidades: []

Cuando actualizas `skills`, copias toda la hoja con los mismos datos y solo cambias la sección de habilidades. Así no pierdes el nombre ni el email mientras actualizas.

---

### Resumen:
```javascript
setFormData({ ...formData, skills: newSkills });
```
- **Copia** el estado actual con `...formData`.
- **Sobrescribe** la propiedad específica `skills` con el nuevo valor.
- **Actualiza** el estado con el nuevo objeto completo usando `setFormData`.
