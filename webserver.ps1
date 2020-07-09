[string] $listenUrl = 'http://*:80/'

function ProcessData($data)
{  
    $json = $data | ConvertFrom-Json 
}


$htmlcontents = @{
    'GET /'  = '<html>Hi</html>'
    'POST /' = "success"
}

# start web server
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($listenUrl)
$listener.Start()

try
{
    while ($listener.IsListening)
    {  
        # process received request
        $context = $listener.GetContext()
        $Request = $context.Request
        $Response = $context.Response

        $received = '{0} {1}' -f $Request.httpmethod, $Request.url.localpath
        write-host "Recieved request $received"
    
        # is there HTML content for this URL?
        $html = $htmlcontents[$received]
        if ($html -eq $null)
        {
            $Response.statuscode = 404
            $html = 'Oops, the page is not available!'
        }
    
        if ($REQUEST.HasEntityBody)
        {
            $reader = New-Object System.IO.StreamReader($Request.InputStream, $request.ContentEncoding)
            $data = $reader.ReadToEnd()
            $reader.Close()
            $request.InputStream.Close()
            ProcessData $data
            write-host $data
        }
    
        # return the HTML to the caller
        $buffer = [Text.Encoding]::UTF8.GetBytes($html)
        $Response.ContentLength64 = $buffer.length
        $Response.OutputStream.Write($buffer, 0, $buffer.length)
    
        $Response.Close()
    }
}
finally
{
    $listener.Stop()
}