# specify sha256, this will generate regular dependabot updates
FROM mcr.microsoft.com/powershell@sha256:3725bc5feed22a1ce405d4eedb9266c33c2452a92bacd647c91781286ea700ec
# FROM knicknic/powershell:small

COPY webserver.ps1 /

ENTRYPOINT [ "pwsh", "/webserver.ps1" ]

