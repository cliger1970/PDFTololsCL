@echo off
set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\Git\bin"
cd /d C:\CREAR_APP\PDFToolsCL

echo ===================================================================
echo   SINCRONIZANDO PROYECTO DOCUFLOW PRO CON GITHUB: cliger1970/PDFTololsCL
echo ===================================================================
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo ===================================================================
echo   OPERACION FINALIZADA. Presiona cualquier tecla para cerrar.
echo ===================================================================
pause
