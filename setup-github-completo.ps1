# Script completo para crear y subir repositorio a GitHub
# Este script automatiza todo el proceso

Write-Host "=== Configuración Completa de Repositorio GitHub ===" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
Write-Host "Verificando instalación de Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Git encontrado: $gitVersion" -ForegroundColor Green
    } else {
        throw "Git no encontrado"
    }
} catch {
    Write-Host "✗ ERROR: Git no está instalado o no está en el PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor instala Git desde:" -ForegroundColor Yellow
    Write-Host "  https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Después de instalar Git:" -ForegroundColor Yellow
    Write-Host "  1. Reinicia PowerShell o abre una nueva terminal" -ForegroundColor Yellow
    Write-Host "  2. Ejecuta este script nuevamente" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "O ejecuta manualmente estos comandos:" -ForegroundColor Yellow
    Write-Host "  git init" -ForegroundColor Cyan
    Write-Host "  git add ." -ForegroundColor Cyan
    Write-Host "  git commit -m 'Initial commit'" -ForegroundColor Cyan
    Write-Host "  git branch -M main" -ForegroundColor Cyan
    Write-Host "  git remote add origin <URL_DEL_REPOSITORIO>" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
    exit 1
}

# Verificar si ya existe un repositorio Git
if (Test-Path .git) {
    Write-Host ""
    Write-Host "⚠ Ya existe un repositorio Git en este directorio." -ForegroundColor Yellow
    $continue = Read-Host "¿Deseas continuar de todos modos? (s/n)"
    if ($continue -ne "s" -and $continue -ne "S") {
        Write-Host "Operación cancelada." -ForegroundColor Yellow
        exit 0
    }
} else {
    Write-Host ""
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Cyan
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error al inicializar el repositorio." -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Repositorio inicializado" -ForegroundColor Green
}

# Verificar configuración de Git
Write-Host ""
Write-Host "Verificando configuración de Git..." -ForegroundColor Cyan
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "⚠ Git no está configurado. Configurando..." -ForegroundColor Yellow
    if (-not $userName) {
        $name = Read-Host "Ingresa tu nombre para Git"
        if ($name) {
            git config --global user.name $name
            Write-Host "✓ Nombre configurado" -ForegroundColor Green
        }
    }
    if (-not $userEmail) {
        $email = Read-Host "Ingresa tu email para Git"
        if ($email) {
            git config --global user.email $email
            Write-Host "✓ Email configurado" -ForegroundColor Green
        }
    }
} else {
    Write-Host "✓ Git configurado: $userName <$userEmail>" -ForegroundColor Green
}

# Agregar archivos
Write-Host ""
Write-Host "Agregando archivos al staging area..." -ForegroundColor Cyan
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Error al agregar archivos." -ForegroundColor Red
    exit 1
}

$fileCount = (git status --short | Measure-Object -Line).Lines
Write-Host "✓ $fileCount archivos agregados" -ForegroundColor Green

# Hacer commit
Write-Host ""
Write-Host "Creando commit inicial..." -ForegroundColor Cyan
git commit -m "Initial commit: Closers on Demand project"
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Error al crear el commit." -ForegroundColor Red
    Write-Host "  (Puede que no haya cambios para commitear)" -ForegroundColor Yellow
} else {
    Write-Host "✓ Commit creado exitosamente" -ForegroundColor Green
}

# Cambiar branch a main
Write-Host ""
Write-Host "Configurando branch principal..." -ForegroundColor Cyan
git branch -M main
Write-Host "✓ Branch configurado como 'main'" -ForegroundColor Green

# Solicitar URL del repositorio de GitHub
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PASO FINAL: Crear repositorio en GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ahora necesitas crear el repositorio en GitHub:" -ForegroundColor Yellow
Write-Host "  1. Ve a: https://github.com/new" -ForegroundColor Cyan
Write-Host "  2. Ingresa un nombre para el repositorio (ej: closers-on-demand)" -ForegroundColor Yellow
Write-Host "  3. Elige si será público o privado" -ForegroundColor Yellow
Write-Host "  4. ⚠ IMPORTANTE: NO marques 'Add a README file'" -ForegroundColor Red
Write-Host "  5. ⚠ IMPORTANTE: NO marques 'Add .gitignore'" -ForegroundColor Red
Write-Host "  6. ⚠ IMPORTANTE: NO marques 'Choose a license'" -ForegroundColor Red
Write-Host "  7. Click en 'Create repository'" -ForegroundColor Yellow
Write-Host ""
Write-Host "Después de crear el repositorio, copia la URL que aparece." -ForegroundColor Yellow
Write-Host "Ejemplo: https://github.com/tu-usuario/closers-on-demand.git" -ForegroundColor Cyan
Write-Host ""

$repoUrl = Read-Host "Ingresa la URL del repositorio de GitHub (o presiona Enter para saltar este paso)"

if ($repoUrl) {
    Write-Host ""
    Write-Host "Agregando remote origin..." -ForegroundColor Cyan
    
    # Verificar si ya existe un remote origin
    $existingRemote = git remote get-url origin 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "⚠ Ya existe un remote 'origin' apuntando a: $existingRemote" -ForegroundColor Yellow
        $replace = Read-Host "¿Deseas reemplazarlo? (s/n)"
        if ($replace -eq "s" -or $replace -eq "S") {
            git remote set-url origin $repoUrl
            Write-Host "✓ Remote origin actualizado" -ForegroundColor Green
        } else {
            Write-Host "Remote no modificado. Puedes agregarlo manualmente después." -ForegroundColor Yellow
        }
    } else {
        git remote add origin $repoUrl
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Remote origin agregado" -ForegroundColor Green
        } else {
            Write-Host "✗ Error al agregar remote origin" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "Subiendo código a GitHub..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⚠ NOTA IMPORTANTE SOBRE AUTENTICACIÓN:" -ForegroundColor Yellow
    Write-Host "  GitHub requiere un Personal Access Token (PAT) en lugar de contraseña." -ForegroundColor Yellow
    Write-Host "  Si te pide usuario y contraseña:" -ForegroundColor Yellow
    Write-Host "    - Usuario: tu nombre de usuario de GitHub" -ForegroundColor Cyan
    Write-Host "    - Contraseña: tu Personal Access Token" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Para crear un PAT:" -ForegroundColor Yellow
    Write-Host "    1. Ve a: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host "    2. Click en 'Generate new token' > 'Generate new token (classic)'" -ForegroundColor Cyan
    Write-Host "    3. Dale un nombre (ej: 'closers-on-demand')" -ForegroundColor Cyan
    Write-Host "    4. Selecciona el scope 'repo' (todos los permisos de repositorio)" -ForegroundColor Cyan
    Write-Host "    5. Click en 'Generate token'" -ForegroundColor Cyan
    Write-Host "    6. COPIA el token inmediatamente (solo se muestra una vez)" -ForegroundColor Red
    Write-Host ""
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "✓ ¡Repositorio subido exitosamente!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Tu código está ahora en: $repoUrl" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "✗ Error al subir el código. Verifica:" -ForegroundColor Red
        Write-Host "  - Que la URL del repositorio sea correcta" -ForegroundColor Yellow
        Write-Host "  - Que tengas permisos para escribir en el repositorio" -ForegroundColor Yellow
        Write-Host "  - Que hayas usado un Personal Access Token válido" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Puedes intentar nuevamente con:" -ForegroundColor Yellow
        Write-Host "  git push -u origin main" -ForegroundColor Cyan
    }
} else {
    Write-Host ""
    Write-Host "Paso saltado. Puedes agregar el remote y subir el código manualmente:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  git remote add origin <URL_DEL_REPOSITORIO>" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host ""
Write-Host "Script completado." -ForegroundColor Green

