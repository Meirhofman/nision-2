@echo off
setlocal
echo מפעיל את שרת האפליקציה...

:: עובר לתיקייה שבה נמצא הקובץ
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
    echo נראה שחסרות תלויות ^(node_modules^), מתקין כעת. זה עשוי לקחת רגע...
    call npm install
)



:: פותח את Chrome בחלון נפרד אחרי 8 שניות
start "" cmd /c "timeout /t 8 /nobreak >nul && start chrome http://localhost:5173/"

:: מפעיל את שרת הפיתוח
echo השרת עולה... Chrome יפתח בעוד מספר שניות.
call npm run dev

:: אם הפקודה הופסקה (למשל על ידי המשתמש) או נכשלה
echo.
echo השרת הופסק.
pause
endlocal
