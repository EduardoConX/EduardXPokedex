import json
import csv 

input_file = 'pokemon.csv'
updated_data = []
unmatched_pokemon = []

with open('pokemonList.json', 'r') as file:
   pokemonList = json.load(file)

with open(input_file, 'r',  newline='') as csv_file:
  csv_reader = csv.DictReader(csv_file)
  fieldnames = csv_reader.fieldnames
  
  for index, row in enumerate(csv_reader):
        pokemon = row["pokemon"].strip()
        original_id = row.get("id", "").strip()
        try:
            row["id"] = str(pokemonList.index(pokemon) + 1)
        except ValueError:
            if original_id.isdigit():
                row["id"] = original_id
            else:
                unmatched_pokemon.append({
                    "line": index + 2,
                    "pokemon": pokemon,
                })

        updated_data.append(row)

with open(input_file, 'w', newline='') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(updated_data)

if unmatched_pokemon:
    print(f"\n⚠️ {len(unmatched_pokemon)} unmatched Pokémon found:")
    for entry in unmatched_pokemon:
        print(f"- Line {entry['line']}: '{entry['pokemon']}' (ID was empty or invalid)")
else:
    print("\nAll Pokémon names or fallback IDs were valid!")