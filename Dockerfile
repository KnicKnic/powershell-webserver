# FROM mcr.microsoft.com/powershell
FROM knicknic/powershell:small

COPY webserver.ps1 /

ENTRYPOINT [ "pwsh", "/webserver.ps1" ]

