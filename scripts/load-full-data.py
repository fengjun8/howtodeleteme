import json
import shutil

# Copy the full JSON data from user uploads to the project
source_path = 'user_read_only_context/text_attachments/sites_detailed-TRf5e.json'
target_path = 'lib/data/sites_detailed.json'

print(f"[v0] Copying full dataset from {source_path} to {target_path}")

try:
    # Simply copy the file
    shutil.copy2(source_path, target_path)
    
    # Verify the copy
    with open(target_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"[v0] Successfully loaded {len(data)} sites")
    print(f"[v0] First site: {data[0]['name']}")
    print(f"[v0] Last site: {data[-1]['name']}")
    
    # Show difficulty distribution
    difficulties = {}
    for site in data:
        diff = site.get('difficulty', 'unknown')
        difficulties[diff] = difficulties.get(diff, 0) + 1
    
    print(f"[v0] Difficulty distribution:")
    for diff, count in sorted(difficulties.items()):
        print(f"  {diff}: {count}")
    
except Exception as e:
    print(f"[v0] Error: {str(e)}")
    import traceback
    traceback.print_exc()
