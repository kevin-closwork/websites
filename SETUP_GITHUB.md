# Guía para crear y subir el repositorio a GitHub

## Paso 1: Instalar Git

Si Git no está instalado, descárgalo desde: https://git-scm.com/download/win

Después de instalar, reinicia PowerShell o abre una nueva terminal.

## Paso 2: Verificar la instalación de Git

```powershell
git --version
```

## Paso 3: Configurar Git (si es la primera vez)

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
```

## Paso 4: Inicializar el repositorio Git

```powershell
git init
```

## Paso 5: Agregar todos los archivos

```powershell
git add .
```

## Paso 6: Hacer el commit inicial

```powershell
git commit -m "Initial commit"
```

## Paso 7: Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. Crea un nuevo repositorio (puedes llamarlo `closers-on-demand` o el nombre que prefieras)
3. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
4. Copia la URL del repositorio (algo como: `https://github.com/tu-usuario/nombre-repo.git`)

## Paso 8: Conectar el repositorio local con GitHub

```powershell
git remote add origin https://github.com/tu-usuario/nombre-repo.git
```

## Paso 9: Subir el código a GitHub

```powershell
git branch -M main
git push -u origin main
```

Si te pide autenticación, GitHub ahora requiere un token de acceso personal en lugar de contraseña:
- Ve a https://github.com/settings/tokens
- Genera un nuevo token (classic) con permisos `repo`
- Usa ese token como contraseña cuando Git te lo pida

---

## Alternativa: Usar GitHub CLI (más fácil)

Si prefieres, puedes instalar GitHub CLI desde: https://cli.github.com/

Luego puedes crear el repositorio directamente desde la terminal:

```powershell
gh auth login
gh repo create closers-on-demand --public --source=. --remote=origin --push
```

