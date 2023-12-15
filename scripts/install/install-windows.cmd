@echo off

@REM Step 1. Check if node and npm / yarn installed. If not, warning and stop
@REM Step 2. Install dependencies based on package.json (prioritizing yarn)

where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=* delims=" %%v in ('node -v') do set NODE_VERSION=%%v
    echo Node %NODE_VERSION% is installed
) else (
    echo Warning: Node.js is not installed. Please install Node.js
    exit /b 1
)

where yarn >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=* delims=" %%v in ('yarn -v') do set YARN_VERSION=%%v
    echo Yarn %YARN_VERSION% is installed

    echo Installing dependencies using yarn...
    yarn
) else (
    where npm >nul 2>nul
    if %errorlevel% equ 0 (
        for /f "tokens=* delims=" %%v in ('npm -v') do set NPM_VERSION=%%v
        echo NPM %NPM_VERSION% is installed
        echo Installing dependencies using npm...
        npm install
    )
)
if %errorlevel% neq 0 (
    echo Warning: Both Yarn and NPM are not installed. Please install Yarn ^(https://yarnpkg.com/^) or NPM ^(https://nodejs.org/^)
    exit /b 1
)

echo Dependencies installed successfully.
exit /b 0