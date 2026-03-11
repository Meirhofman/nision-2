@echo off
chcp 65001 >nul
setlocal
echo.
echo ═══════════════════════════════════════════════════════════════
echo   הרצת האפליקציה לבדיקה במובייל
echo ═══════════════════════════════════════════════════════════════
echo.

cd /d "%~dp0"

call where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo שגיאה: npm לא מותקן. אנא התקן Node.js מ-https://nodejs.org
    pause
    exit /b
)

if not exist "node_modules\.bin\vite.cmd" (
    echo מתקין תלויות...
    call npm install
)

echo.
echo השרת עולה. חפש את השורה "Network:" בחלון הבא.
echo הכתובת המופיעה שם (למשל http://192.168.1.XXX:5173) - הזן אותה בדפדפן במובייל.
echo.
echo חשוב: המחשב והמובייל חייבים להיות באותה רשת WiFi.
echo.
echo לפרטים נוספים - קרא את הקובץ MOBILE.md
echo ═══════════════════════════════════════════════════════════════
echo.

call npm run dev

echo.
echo השרת הופסק.
pause
endlocal
