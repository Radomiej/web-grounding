[CmdletBinding()]
param(
    [switch] $NoBuild,
    [switch] $Keep
)

$ErrorActionPreference = 'Stop'
$projectName = 'web-grounding-php-test'
$composeFile = Join-Path $PSScriptRoot 'compose.yml'
$runner = Join-Path $PSScriptRoot 'test_lessons.py'
$port = if ($env:PHP_TEST_PORT) { [int] $env:PHP_TEST_PORT } else { 8787 }

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw 'Nie znaleziono polecenia docker. Uruchom Docker Desktop.'
}

$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCommand) {
    $pythonCommand = Get-Command py -ErrorAction SilentlyContinue
}
if (-not $pythonCommand) {
    throw 'Nie znaleziono Pythona. Test runner nie wymaga pakietów, ale wymaga interpretera.'
}

$upArguments = @('compose', '-p', $projectName, '-f', $composeFile, 'up', '-d')
if (-not $NoBuild) {
    $upArguments += '--build'
}

try {
    Write-Host "[container] uruchamiam projekt $projectName (port $port)"
    & docker @upArguments
    if ($LASTEXITCODE -ne 0) {
        throw "docker compose up zakończył się kodem $LASTEXITCODE"
    }

    & $pythonCommand.Source $runner '--base-url' "http://127.0.0.1:$port"
    if ($LASTEXITCODE -ne 0) {
        throw "test_lessons.py zakończył się kodem $LASTEXITCODE"
    }
}
finally {
    if (-not $Keep) {
        Write-Host "[container] usuwam wyłącznie jednorazowy projekt $projectName i jego wolumen"
        & docker compose -p $projectName -f $composeFile down -v --remove-orphans
    } else {
        Write-Host "[container] pozostawiono projekt $projectName (-Keep)"
    }
}
