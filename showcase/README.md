# Showcase Assets

Este directorio contiene los assets para promocionar Handwriting OCR.

## Contenido

### Documentos

- `LINKEDIN-POST.md` - Post principal y variantes para LinkedIn

### Visuales a Crear

Los siguientes visuales deben crearse para el lanzamiento:

#### 1. before-after.gif

- **Fuente**: Grabar la demo web
- **Contenido**: Upload imagen -> OCR raw -> Correccion -> Confirmacion
- **Duracion**: 10-15 segundos
- **Resolucion**: 800x600 o 1200x800
- **Herramienta**: ScreenToGif, Gifski, o FFmpeg

#### 2. benchmark-chart.png

- **Fuente**: Exportar desde la web app o Recharts
- **Contenido**: Barras comparando qwen2.5vl (82%) vs minicpm-v (56%)
- **Colores**: Verde para ganador, gris para perdedor
- **Resolucion**: 1200x630 (ratio LinkedIn)

#### 3. architecture-diagram.png

- **Fuente**: Excalidraw o similar
- **Contenido**: Flujo Imagen -> OCR -> RAG -> Texto
- **Estilo**: Hand-drawn look, minimalista
- **Resolucion**: 1200x630

#### 4. og-image.png

- **Fuente**: Figma o Canva
- **Contenido**: Logo + "OCR que aprende TU letra" + Stats
- **Resolucion**: 1200x630 (Open Graph)

## Comandos Utiles

### Grabar GIF de la demo

```bash
# Con FFmpeg (Linux)
ffmpeg -f x11grab -s 1200x800 -i :0.0 -t 15 demo.mp4
gifski --fps 10 --quality 80 -o before-after.gif demo.mp4
```

### Optimizar imagenes

```bash
# Optimizar PNG
optipng -o7 benchmark-chart.png

# Comprimir JPEG
jpegoptim --max=85 og-image.jpg
```

### Exportar chart desde React

```javascript
// En la app Next.js, agregar boton de export
import html2canvas from "html2canvas";

const exportChart = async () => {
  const element = document.getElementById("benchmark-chart");
  const canvas = await html2canvas(element);
  const link = document.createElement("a");
  link.download = "benchmark-chart.png";
  link.href = canvas.toDataURL();
  link.click();
};
```

## Checklist Pre-Publicacion

- [ ] GIF before-after.gif creado y < 5MB
- [ ] benchmark-chart.png exportado
- [ ] architecture-diagram.png creado
- [ ] og-image.png para social sharing
- [ ] Demo web deployada y funcionando
- [ ] Repo GitHub publico
- [ ] README del repo actualizado
- [ ] Post de LinkedIn redactado
- [ ] Links verificados

## Timeline Sugerido

1. **Dia -2**: Crear todos los visuales
2. **Dia -1**: Deploy de la demo, verificar links
3. **Dia 0**: Publicar post (Martes/Miercoles 9am)
4. **Dia 0-1**: Responder comentarios activamente
5. **Dia +3**: Post de follow-up (Behind the Scenes)
