import os
import re
import sys
try:
    import rembg
except ImportError:
    print("rembg not found. Please install it first.")
    sys.exit(1)

# Read the product files from components/products.tsx
try:
    with open('components/products.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading components/products.tsx: {e}")
    sys.exit(1)

# Extract the imageFiles array
match = re.search(r'const imageFiles = \[\s*([\s\S]*?)\s*\] as const', content)
if not match:
    print('Could not find imageFiles array in components/products.tsx')
    sys.exit(1)

array_content = match.group(1)
filenames = re.findall(r"'([^']+)'", array_content)

print(f'Found {len(filenames)} files to process.')

image_dir = 'public/Images'

for filename in filenames:
    input_path = os.path.join(image_dir, filename)
    
    # Target transparent filename
    base, ext = os.path.splitext(filename)
    output_filename = base + '.png'
    output_path = os.path.join(image_dir, output_filename)
    
    print(f'Processing {filename} -> {output_filename}')
    
    try:
        if not os.path.exists(input_path):
            print(f'  Input file not found: {input_path}')
            continue
            
        with open(input_path, 'rb') as i:
            input_data = i.read()
            
        output_data = rembg.remove(input_data)
        
        with open(output_path, 'wb') as o:
            o.write(output_data)
            
        print(f'  Success!')
    except Exception as e:
        print(f'  Error: {e}')
