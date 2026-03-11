@echo off
setlocal
echo מפעיל את האפליקציה... אנא המתן.

:: עובר לתיקייה של הפרויקט
cd /d "%~dp0"

:: בודק אם npm מותקן
call where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo שגיאה: npm לא מותקן. אנא התקן Node.js מ-https://nodejs.org
    pause
    exit /b
)

:: בודק אם התיקייה node_modules תקינה
if not exist "node_modules\.bin\vite.cmd" (
    echo נראה שחסרות תלויות ^(node_modules^), מתקין כעת...
    call npm install
)

:: פותח את כרום בנפרד אחרי שהשרת יעלה
start "" cmd /c "timeout /t 5 /nobreak >nul && start chrome http://localhost:5173/"

:: מפעיל את השרת
echo השרת עולה... כרום יפתח בעוד מספר שניות.
echo (כדי לכבות את האפליקציה, פשוט סגור את החלון הזה)
call npm run dev

pause
endlocal
