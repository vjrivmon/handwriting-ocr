# Handwriting OCR

App de reconocimiento de escritura manuscrita personalizada.

## Vision

- Escanear apuntes manuscritos y convertirlos a digital sin errores
- Entrenar con la letra personal del usuario (abecedario personalizado)
- Exportar a diferentes formatos (documentos, diagramas, ASCII)
- Generar texto con el estilo de escritura del usuario (bidireccional)

## Estado

**Fase actual**: Validacion de idea

## Proximos Pasos

```bash
# Iniciar Claude en el directorio del proyecto
cd /home/vicente/handwriting-ocr
claude

# Ejecutar validacion de idea
/idea:validate handwriting-ocr

Descripcion: App que escanea apuntes manuscritos y los convierte a digital.
Entrena con mi propia letra creando un "abecedario" personalizado.
Exporta a documentos, diagramas y ASCII. Tambien genera texto con mi estilo.
Quiero hacer benchmarking de LLMs para elegir el mejor modelo OCR.
```

## Estructura

```
.claude/          # Sistema de desarrollo autonomo
  ├── commands/   # Comandos slash disponibles
  ├── scripts/    # Scripts de automatizacion
  ├── specs/      # Especificaciones del proyecto
  └── ...
```

## Comandos Disponibles

| Comando | Descripcion |
|---------|-------------|
| `/idea:validate` | Validar idea (6 fases) |
| `/project:interview` | Entrevista profunda |
| `/stories:generate` | Generar historias de usuario |
| `/tasks:breakdown` | Dividir en tareas |
| `/ralph:start` | Loop autonomo |

---

Creado con el sistema de desarrollo autonomo de Vicente Rivas Monferrer.
