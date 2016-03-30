import json

input = {'combo-player': 'combo', 'navigation': True, 'combo_size': 50, 'navigation_size': 50, 'transcript': True, 'qa': True}

with open('kv.json', 'w') as f:
    json.dump(input, f)