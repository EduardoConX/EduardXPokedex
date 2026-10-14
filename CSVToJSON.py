import sys
import csv 
import json
import firebase_admin
from firebase_admin import credentials, db

with open('pokemonList.json', 'r') as file:
   pokemonList = json.load(file)

with open('pokemon.csv', 'r') as csv_file:
  csv_reader = csv.DictReader(csv_file)
  data = [row for row in csv_reader]

with open('positions.json', 'w') as json_file:
  json.dump(data, json_file, indent=4)

try:
    with open('positions.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("Error: 'positions.json' file not found.")
    sys.exit(1)
except json.JSONDecodeError:
    print("Error: Failed to decode JSON.")
    sys.exit(1)
 
pokemon = []
last_pokemon = int(sys.argv[1])

for x in range(1025):
  new_info = {
        "pokemon": pokemonList[x],
        "pokedex": x < last_pokemon,
        "occurrences": len([p for p in data if int(p["id"]) == x + 1]),
        "position": x + 1
    }
  
  pokemon.append(new_info)
 
with open("pokemon.json", "w") as json_file:
    json.dump(pokemon, json_file, indent=4)

cred = credentials.Certificate('eduardxpokedex-firebase.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://eduardxpokedex-default-rtdb.firebaseio.com'  
})

with open('pokemon.json', 'r') as file:
    json_data = json.load(file)

ref = db.reference('/pokemon')
ref.set(json_data)

with open('positions.json', 'r') as file:
    json_data = json.load(file)

ref = db.reference('/positions')
ref.set(json_data)