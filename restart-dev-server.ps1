# Stop the frontend dev server and restart it
Write-Host "Stopping frontend dev server..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "`nRestarting frontend dev server..." -ForegroundColor Green
Set-Location "d:\Dinestx\codeandchill\frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "`nFrontend dev server restarted!" -ForegroundColor Green
Write-Host "The server should now load the NEXT_PUBLIC_API_URL environment variable." -ForegroundColor Cyan
Write-Host "`nOpen your browser to http://localhost:3000 to test." -ForegroundColor Cyan
