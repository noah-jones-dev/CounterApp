@echo off
cd /d "%~dp0"
echo Step 1: Clearing Angular cache... > build.log
rmdir /s /q .angular\cache 2>>build.log

echo Step 2: Building Angular app... >> build.log
call node_modules\.bin\ng build --configuration production --base-href ./ >> build.log 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ANGULAR_BUILD_FAILED >> build.log
  exit /b 1
)

echo Step 3: Copying favicon... >> build.log
copy /y public\favicon.ico dist\primeng-counter\browser\favicon.ico >> build.log 2>&1

echo Step 4: Packaging installer... >> build.log
call node_modules\.bin\electron-builder --win --x64 >> build.log 2>&1
if %ERRORLEVEL% EQU 0 (
  echo BUILD_SUCCESS >> build.log
) else (
  echo PACKAGE_BUILD_FAILED >> build.log
)
