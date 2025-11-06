# Script para crear repositorio automáticamente con token
# Uso: .\crear-repo-automatico.ps1 -Token "tu_token_aqui" -RepoName "nombre-repo" -IsPrivate $false

param(
    [string]$Token = "",
    [string]$RepoName = "closers-on-demand",
    [bool]$IsPrivate = $false
)

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "=== Creación Automática de Repositorio en GitHub ===" -ForegroundColor Cyan
Write-Host ""

# Si no hay token, intentar autenticación con GitHub CLI
if ([string]::IsNullOrWhiteSpace($Token)) {
    Write-Host "Verificando autenticación con GitHub CLI..." -ForegroundColor Yellow
    
    # Verificar si ya está autenticado
    $authCheck = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "No estás autenticado. Por favor ejecuta primero:" -ForegroundColor Yellow
        Write-Host "  gh auth login" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "O proporciona un token con: -Token 'tu_token'" -ForegroundColor Yellow
        exit 1
    }
    
    # Obtener usuario
    $username = gh api user --jq .login
    Write-Host "Usuario autenticado: $username" -ForegroundColor Green
} else {
    # Usar token proporcionado
    $env:GITHUB_TOKEN = $Token
    $username = (gh api user --jq .login 2>&1)
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Token inválido" -ForegroundColor Red
        exit 1
    }
    Write-Host "Usuario autenticado: $username" -ForegroundColor Green
}

Write-Host ""
Write-Host "Creando repositorio '$RepoName'..." -ForegroundColor Cyan

# Crear repositorio
if ($IsPrivate) {
    $result = gh repo create $RepoName --private --source=. --remote=origin --push 2>&1
} else {
    $result = gh repo create $RepoName --public --source=. --remote=origin --push 2>&1
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Repositorio creado exitosamente!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "URL: https://github.com/$username/$RepoName" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Error: $result" -ForegroundColor Red
    exit 1
}

