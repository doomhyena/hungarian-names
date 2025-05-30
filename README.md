# Hungarian names

A lightweight Node.js utility for reading and accessing Hungarian names from structured JSON files.  

---

## 📦 Installation

```bash
npm install hungarian-names
```

Or clone directly from GitHub:

```bash
git clone https://github.com/doomhyena/hungarian-names.git
```

---

## 📁 Directory Structure

```
hungarian-names/
├── index.js
├── names/
│   ├── csaladnevek.json
│   ├── ferfinevek.json
│   └── noinevek.json
└── package.json
```

- `csaladnevek.json`: JSON file containing Hungarian family names.
- `ferfinevek.json`: JSON file containing Hungarian male given names.
- `noinevek.json`: JSON file containing Hungarian female given names.

Each JSON file should follow this structure:

```json
{
  "names": ["Name1", "Name2", "Name3"]
}
```

---

## 🛠 Usage

### Import the module

```js
const hungarianNames = require('hungarian-names');
```

### Get all names

Returns an array containing **all names** from all JSON files.

```js
const allNames = hungarianNames.getAllNames();
console.log(allNames);
```

### Get a name by index

Fetch a specific name by its index from the combined list of all names.

```js
const name = hungarianNames.getNameByIndex(5);
console.log(name);
```

---

## 🧠 How It Works

The package uses a custom `JsonHandler` class that:

1. Loads predefined JSON files (`csaladnevek.json`, `ferfinevek.json`, `noinevek.json`).
2. Checks if each file exists before reading.
3. Parses each file safely and validates the structure (expects a `"names"` array).
4. Logs any issues to the console without crashing the program.
5. Combines the names from all valid files into one array.
6. Provides utility methods to retrieve the full list or access a specific item by index.

---

## ⚠ Robust Error Handling

This package is designed to be resilient and developer-friendly. It handles common error cases gracefully:

- **Missing files**: If a file doesn't exist, a warning is logged.
- **Malformed JSON**: JSON parse errors are caught and logged.
- **Invalid structure**: If a file is missing the `"names"` array or it's not an array, it will be skipped with a warning.
- **Index out of bounds**: If you try to access a name by an invalid index, a warning will be shown and `null` is returned.

The app continues to work even if one or more JSON files are invalid or missing.

---

## 📌 Requirements

- Node.js v12 or higher
- JSON files in UTF-8 format with a top-level `"names"` array

---

## 🧑‍💻 Author

**Csontos Kincső**  
GitHub: [@doomhyena](https://github.com/doomhyena)

---

## 📝 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 🐞 Issues

Found a bug or want to request a feature?  
Open an issue here:  
[https://github.com/doomhyena/hungarian-names/issues](https://github.com/doomhyena/hungarian-names/issues)
