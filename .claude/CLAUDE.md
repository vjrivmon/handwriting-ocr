# CLAUDE.md - Handwriting OCR

## Proyecto

**Handwriting OCR** - App de reconocimiento de escritura manuscrita
personalizada.

### Vision

Crear una aplicacion que pueda:

1. Escanear apuntes manuscritos y convertirlos a digital sin errores
2. Entrenar con la letra personal del usuario (abecedario personalizado)
3. Exportar a diferentes formatos (documentos, diagramas, ASCII)
4. Generar texto con el estilo de escritura del usuario (bidireccional)
5. Hacer benchmarking de modelos LLM para elegir el mejor

### Estado

**Fase actual**: Validacion de idea

### Stack Tecnologico (por definir tras validacion)

Candidatos a evaluar mediante benchmarking:

- **OCR/Vision**: Tesseract, EasyOCR, Google Cloud Vision, Azure Computer Vision
- **LLMs con vision**: GPT-4V, Claude 3.5, Gemini Pro Vision
- **ML Personalizado**: PyTorch, TensorFlow, fine-tuning de modelos
- **Frontend**: Next.js 14+ con TypeScript
- **Backend**: Python FastAPI para ML, Next.js API para web
- **Database**: Supabase (PostgreSQL + Storage para imagenes)

---

## Comandos Slash Disponibles

| Comando                       | Descripcion                                      |
| ----------------------------- | ------------------------------------------------ |
| `/idea:validate <nombre>`     | Validar idea con proceso de 6 fases              |
| `/project:interview <nombre>` | Entrevista profunda para generar SPEC.md         |
| `/stories:generate <spec>`    | Generar historias de usuario desde SPEC          |
| `/tasks:breakdown <historia>` | Dividir historia en tareas                       |
| `/ralph:start <tarea>`        | Iniciar loop autonomo para una tarea             |
| `/ralph:stop`                 | Detener loop y guardar estado                    |
| `/parallel:status`            | Estado de agentes paralelos                      |
| `/ux-expert`                  | Consulta experto UX/UI para decisiones de diseno |

---

## Flujo de Desarrollo

```
1. /idea:validate handwriting-ocr    -> Genera SPEC o REJECTED
2. /project:interview handwriting-ocr -> Refina especificacion
3. /stories:generate <spec>          -> Genera historias de usuario
4. /tasks:breakdown <historia>       -> Divide en tareas
5. /ralph:start <tarea>              -> Ejecuta tarea autonomamente
6. /parallel:status                  -> Monitorea progreso
```

---

## Estructura de Directorios

```
.claude/
├── specs/        # Especificaciones del proyecto
├── stories/      # Historias de usuario (H001.md, H002.md...)
├── tasks/        # Tareas del backlog (T001.md, T002.md...)
├── checkpoints/  # Estados de sesion (JSON)
├── memory/       # Knowledge graph persistente
├── logs/         # Logs de ejecucion
├── research/     # Investigacion y benchmarks de LLMs
└── decisions/    # Architecture Decision Records

src/              # Codigo fuente (por crear)
├── ml/           # Modelos y pipelines de ML
├── api/          # Backend FastAPI
├── web/          # Frontend Next.js
└── shared/       # Codigo compartido
```

---

## Estilo de Codigo

### Python (ML/Backend)

- **Black** para formateo
- **Ruff** para linting
- Type hints obligatorios
- Docstrings en funciones publicas

### TypeScript (Frontend/API)

- **TypeScript strict mode** siempre habilitado
- **ESLint + Prettier** para formateo
- Nombres descriptivos sin abreviaciones
- Componentes funcionales con hooks

---

## Git Workflow

### Conventional Commits

```
feat: nueva funcionalidad
fix: correccion de bug
docs: documentacion
refactor: refactorizacion
test: tests
chore: mantenimiento
research: investigacion/benchmarks
```

### Branches

```
feature/*   - Nuevas funcionalidades
bugfix/*    - Correcciones de bugs
research/*  - Experimentos y benchmarks
```

---

## Testing

- **TDD**: Escribir tests antes del codigo
- Cobertura minima: **80%** para codigo nuevo
- Tests de precision para modelos ML (accuracy, WER, CER)
- Tests de integracion para pipeline completo

---

## Seguridad

### Nunca hacer

- Commitear archivos `.env` con API keys
- Subir imagenes de usuarios sin consentimiento
- Almacenar datos de entrenamiento sin encriptar

### Siempre hacer

- Usar variables de entorno para API keys
- Validar inputs de usuario
- Documentar uso de datos para entrenamiento
- GDPR compliance para datos personales

---

## Sistema de Desarrollo Autonomo

### Ralph Loop (Ejecucion Autonoma)

1. **Iniciar**: `/ralph:start .claude/tasks/T001.md`
2. **Loop automatico**: Ejecuta -> Verifica -> Repite
3. **Finalizar**: Crea `.claude/COMPLETE` o `/ralph:stop`

### Safety Limits

- Maximo 30 iteraciones por loop
- Si mismo error 3+ veces: PAUSAR
- Checkpoints automaticos despues de cada commit

### Aliases Recomendados

```bash
alias cc="claude"
alias ccp="claude --dangerously-skip-permissions"
alias ccr="claude --resume"
alias wt="bash .claude/scripts/worktree-manager.sh"
alias swarm="bash .claude/scripts/swarm-launch.sh"
```

---

## Proximos Pasos

1. Ejecutar `/idea:validate handwriting-ocr` con descripcion completa
2. Si pasa, generar SPEC.md con `/project:interview`
3. Hacer benchmark de modelos OCR/LLM
4. Crear historias de usuario
5. Empezar desarrollo del MVP
