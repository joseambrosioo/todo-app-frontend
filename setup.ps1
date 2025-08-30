Write-Host "Setting up Todo App Frontend..." -ForegroundColor Green
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Creating .env.local file..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    @"
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host ".env.local file created!" -ForegroundColor Green
} else {
    Write-Host ".env.local file already exists." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete! To start the frontend:" -ForegroundColor Green
Write-Host "npm run dev" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"
