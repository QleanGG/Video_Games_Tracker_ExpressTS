import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    json_data = []
    
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if row['Score']:
                row['Score'] = float(row['Score']) / 10  # Adjust score scale
            json_data.append(row)
    
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, ensure_ascii=False, indent=4)

# Usage
csv_to_json('./new_game_details.csv', './game_info.json')
