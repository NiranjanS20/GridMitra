import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Replace cases
    content = content.replace("Mayur Vihar Phase 1", "Mohol")
    content = content.replace("Mayur Vihar", "Mohol")
    content = content.replace("mayur_vihar", "mohol")
    content = content.replace("MAYUR VIHAR", "MOHOL")

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.html')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    src_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "src")
    process_directory(src_dir)
