# Script para inicializar y subir el repositorio a GitHub
# Ejecuta este script después de instalar Git

Write-Host "=== Configuración de Repositorio GitHub ===" -ForegroundColor Cyan

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git no está instalado." -ForegroundColor Red
    Write-Host "Por favor instala Git desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Verificar si ya existe un repositorio Git
if (Test-Path .git) {
    Write-Host "Ya existe un repositorio Git en este directorio." -ForegroundColor Yellow
    $continue = Read-Host "¿Deseas continuar de todos modos? (s/n)"
    if ($continue -ne "s") {
        exit 0
    }
} else {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Cyan
    git init
}

# Agregar archivos
Write-Host "Agregando archivos al staging area..." -ForegroundColor Cyan
git add .

# Hacer commit
Write-Host "Creando commit inicial..." -ForegroundColor Cyan
git commit -m "Initial commit"

# Solicitar URL del repositorio de GitHub
Write-Host ""
Write-Host "Ahora necesitas crear el repositorio en GitHub:" -ForegroundColor Yellow
Write-Host "1. Ve a https://github.com/new" -ForegroundColor Yellow
Write-Host "2. Crea un nuevo repositorio" -ForegroundColor Yellow
Write-Host "3. NO inicialices con README, .gitignore o licencia" -ForegroundColor Yellow
Write-Host ""
$repoUrl = Read-Host "Ingresa la URL del repositorio (ej: https://github.com/usuario/repo.git)"

if ($repoUrl) {
    Write-Host "Agregando remote origin..." -ForegroundColor Cyan
    git remote add origin $repoUrl
    
    Write-Host "Cambiando branch a main..." -ForegroundColor Cyan
    git branch -M main
    
    Write-Host "Subiendo código a GitHub..." -ForegroundColor Cyan
    Write-Host "NOTA: Si te pide autenticación, usa un Personal Access Token de GitHub" -ForegroundColor Yellow
    Write-Host "Puedes crear uno en: https://github.com/settings/tokens" -ForegroundColor Yellow
    Write-Host ""
    
    git push -u origin main
    
    Write-Host ""
    Write-Host "¡Repositorio subido exitosamente a GitHub!" -ForegroundColor Green
} else {
    Write-Host "No se proporcionó URL. Puedes agregar el remote manualmente después con:" -ForegroundColor Yellow
    Write-Host "git remote add origin <URL>" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor Yellow
}

