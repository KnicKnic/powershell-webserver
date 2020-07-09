FROM mcr.microsoft.com/powershell

COPY webserver.ps1 /

ENTRYPOINT [ "pwsh", "/webserver.ps1" ]

