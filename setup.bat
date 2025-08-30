@echo off
echo Setting up Todo App Frontend...
echo.

echo Installing dependencies...
npm install

echo.
echo Creating .env.local file...
if not exist .env.local (
    echo NEXT_PUBLIC_API_URL=http://localhost:3001 > .env.local
    echo .env.local file created!
) else (
    echo .env.local file already exists.
)

echo.
echo Setup complete! To start the frontend:
echo npm run dev
echo.
pause
