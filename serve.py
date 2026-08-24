import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}/index.html"
                print("==================================================")
                print("  🌿 Chacra Don Andres - Servidor Local Iniciado")
                print(f"  🌐 URL: {url}")
                print(f"  📁 Directorio: {DIRECTORY}")
                print("  ⚡ Presiona Ctrl+C para detener el servidor")
                print("==================================================")
                webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError:
            print(f"Puerto {port} ocupado, intentando con {port + 1}...")
            port += 1

if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        print("\nServidor detenido. ¡Hasta pronto!")
        sys.exit(0)
