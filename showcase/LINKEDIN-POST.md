# Post LinkedIn - Handwriting OCR

## Post Principal (Metodo PAR)

---

**Sabias que los OCR genericos tienen hasta 45% de error con letra manuscrita?**

**El Problema:** Pase horas transcribiendo apuntes que ningun OCR podia leer.
Google Lens, Tesseract, apps de notas... todos fallaban con MI letra. El mismo
error una y otra vez: "de" se convertia en "ole", "la" en "le".

**La Solucion:** Cree un sistema RAG que APRENDE de mis correcciones. Cada vez
que corrijo un error, el sistema lo recuerda. La proxima vez, lo corrige
automaticamente.

Es como tener un OCR que se adapta a TI, no al reves.

**Resultados:**

- 82% accuracy inicial -> 95%+ despues de 50 correcciones
- Modelo qwen2.5vl supera a minicpm-v en 26 puntos
- <100ms para aplicar correcciones aprendidas
- 100% offline, sin APIs caras

[GIF: Adjuntar before-after.gif]

🔗 Demo: [URL cuando deploy] 📦 Repo: [URL GitHub]

Stack: Python + SQLite + Ollama Lo mejor: funciona con tu propia GPU.

#MachineLearning #OCR #Python #OpenSource #RAG #AI #DeepLearning

---

## Variante Thread/Carousel

### Slide 1: Hook

```
45% de error.

Eso es lo que obtiene un OCR generico
con letra manuscrita.

Pase de eso a 95%+ de accuracy.

Te cuento como. 🧵
```

### Slide 2: El Problema

```
El problema no es el OCR.

Es que no aprende de sus errores.

Google Lens comete el mismo error
una y otra vez:
- "de" -> "ole"
- "la" -> "le"
- "que" -> "fue"

Sin importar cuantas veces lo corrijas.
```

### Slide 3: La Solucion

```
Cree un sistema RAG de correcciones.

Cada vez que corriges un error,
el sistema lo guarda en una base de datos.

La proxima vez que encuentre
el mismo patron, lo corrige solo.

Es aprendizaje continuo, pero simple.
```

### Slide 4: Los Numeros

```
Benchmark con 16 muestras reales:

qwen2.5vl:7b -> 82% accuracy
minicpm-v -> 56% accuracy

Diferencia: 26 puntos.

Y despues de aprender correcciones:
95%+ accuracy en textos similares.
```

### Slide 5: El Stack

```
Todo corre en TU maquina:

- Python para el backend
- SQLite para las correcciones
- Ollama para los modelos
- Next.js para la demo

Sin APIs caras.
Sin enviar datos a la nube.
Total privacidad.
```

### Slide 6: CTA

```
Quieres probarlo?

🔗 Demo interactiva: [link]
📦 Codigo fuente: [link]

Dale una estrella ⭐ si te parece util.

Y cuentame: que OCR usas actualmente?
```

---

## Hashtags Recomendados

### Set 1 (Tech-focused)

#MachineLearning #OCR #Python #OpenSource #RAG

### Set 2 (Community-focused)

#BuildInPublic #IndieHacker #DevCommunity #100DaysOfCode

### Set 3 (AI-focused)

#AI #DeepLearning #ComputerVision #NLP #LLM

---

## Timing Recomendado

- **Mejor dia**: Martes o Miercoles
- **Mejor hora**: 8-10am o 12-2pm (hora local)
- **Evitar**: Fines de semana, lunes temprano

---

## Engagement Tips

1. **Responde a TODOS los comentarios** en las primeras 2 horas
2. **Pregunta al final** para generar conversacion
3. **Tagea personas relevantes** si tiene sentido
4. **Comparte en grupos** de desarrolladores/ML

---

## Visuales Necesarios

### 1. GIF Before/After

- Duracion: 10-15 segundos
- Muestra: OCR raw -> Correccion -> Aprendizaje
- Formato: 800x600, <5MB

### 2. Imagen Benchmark

- Grafico de barras comparativo
- qwen2.5vl (verde) vs minicpm-v (gris)
- Numeros grandes y legibles

### 3. Diagrama Arquitectura

- Flujo: Imagen -> OCR -> RAG -> Texto corregido
- Simple, 4-5 elementos max
- Iconos reconocibles

---

## Follow-up Posts

### Post 2: Behind the Scenes

"Como hice el benchmark de modelos OCR..."

### Post 3: Technical Deep Dive

"Por que RAG funciona mejor que fine-tuning para esto..."

### Post 4: Lessons Learned

"3 errores que cometi construyendo este OCR..."
