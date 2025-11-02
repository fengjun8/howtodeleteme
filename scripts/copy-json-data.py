import json
import os

# Read the source JSON file from user_read_only_context
source_path = 'user_read_only_context/text_attachments/sites_detailed-TRf5e.json'
target_path = 'lib/data/sites_detailed.json'

print(f"[v0] Reading source file: {source_path}")

try:
    with open(source_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"[v0] Successfully loaded {len(data)} sites from source file")
    
    # Write to target location
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"[v0] Successfully wrote {len(data)} sites to {target_path}")
    print(f"[v0] First site: {data[0]['name']}")
    print(f"[v0] Last site: {data[-1]['name']}")
    
except Exception as e:
    print(f"[v0] Error: {str(e)}")
