#!/bin/bash
echo "===================================================="
echo "  Chacra Don Andres - Experiencia Web & Tour 360"
echo "===================================================="
cd "$(dirname "$0")"
python3 serve.py || xdg-open index.html || open index.html
