# Script para crear y subir repositorio a GitHub automáticamente
# Requiere autenticación previa con GitHub CLI

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "=== Creación Automática de Repositorio en GitHub ===" -ForegroundColor Cyan
Write-Host ""

# Verificar autenticación
Write-Host "Verificando autenticación con GitHub..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "No estás autenticado con GitHub CLI." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Iniciando proceso de autenticación..." -ForegroundColor Cyan
    Write-Host "Se abrirá tu navegador para autorizar." -ForegroundColor Yellow
    Write-Host ""
    
    # Intentar autenticación
    gh auth login --web --git-protocol https --hostname github.com
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error en la autenticación. Por favor intenta manualmente:" -ForegroundColor Red
        Write-Host "  gh auth login" -ForegroundColor Cyan
        exit 1
    }
    
    Write-Host "Autenticación completada" -ForegroundColor Green
} else {
    Write-Host "Ya estás autenticado" -ForegroundColor Green
}

Write-Host ""

# Obtener nombre de usuario de GitHub
$username = gh api user --jq .login
if (-not $username) {
    Write-Host "No se pudo obtener el nombre de usuario" -ForegroundColor Red
    exit 1
}

Write-Host "Usuario de GitHub: $username" -ForegroundColor Cyan
Write-Host ""

# Solicitar nombre del repositorio
$repoName = Read-Host "Ingresa el nombre del repositorio (o presiona Enter para usar 'closers-on-demand')"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "closers-on-demand"
}

# Solicitar visibilidad
Write-Host ""
Write-Host "¿Qué tipo de repositorio deseas crear?" -ForegroundColor Yellow
$visibility = Read-Host "1 = Público, 2 = Privado (presiona Enter para Público)"
if ($visibility -eq "2") {
    $isPrivate = $true
    $visibilityText = "privado"
} else {
    $isPrivate = $false
    $visibilityText = "público"
}

Write-Host ""
Write-Host "Creando repositorio '$repoName' como $visibilityText en GitHub..." -ForegroundColor Cyan

# Crear repositorio en GitHub
if ($isPrivate) {
    $repoResult = gh repo create $repoName --private --source=. --remote=origin --push 2>&1
} else {
    $repoResult = gh repo create $repoName --public --source=. --remote=origin --push 2>&1
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Repositorio creado y subido exitosamente!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "URL del repositorio: https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Puedes ver tu repositorio en:" -ForegroundColor Yellow
    Write-Host "  https://github.com/$username/$repoName" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Error al crear el repositorio:" -ForegroundColor Red
    Write-Host $repoResult -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Posibles causas:" -ForegroundColor Yellow
    Write-Host "  - El nombre del repositorio ya existe" -ForegroundColor Yellow
    Write-Host "  - Problemas de permisos" -ForegroundColor Yellow
    Write-Host "  - Error de conexión" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Puedes intentar crear el repositorio manualmente en:" -ForegroundColor Yellow
    Write-Host "  https://github.com/new" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Luego ejecuta:" -ForegroundColor Yellow
    Write-Host "  git remote add origin https://github.com/$username/$repoName.git" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
}
