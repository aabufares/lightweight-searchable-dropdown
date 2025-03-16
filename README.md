# Searchable Dropdown Component
A lightweight and customizable searchable dropdown component with support for active/inactive options, trimming spaces, highlighting selected items, and arrow indicators.

## Features
![Searchable Dropdown Example](img/dropdown-example.gif)

- Search functionality for filtering options dynamically.
- Highlighting the selected option.
- Support for enabling/disabling options with an `isActive` flag.
- Dynamic updates to options at runtime.
- Visual arrow indicators for dropdown state.
- Fully customizable styles using CSS.

## Installation
1. Clone the repository: git clone https://github.com/aabufares/lightweight-searchable-dropdown.git
2. Include the `dropdown.js` and `style.css` files in your project.
   ### Usage
```html
<div id="dropdown"></div>
<script src="dropdown.js"></script>
<script>
 const dropdown = new SearchableDropdown("dropdown", {
     options: [
         { value: "option1", label: "Option 1", isActive: true },
         { value: "option2", label: "Option 2", isActive: false },
         { value: "option3", label: "Option 3", isActive: true }
     ],
     placeholder: "Type to search...",
     required: true,
     onchange: (selectedItem) => console.log("Selected:", selectedItem)
 });
</script>
```
## Options Configuration
When initializing the SearchableDropdown component, you can provide various options to customize its behavior and appearance. Here's a detailed description of all supported options:
### 1. options (Required) :
   An array of dropdown options. Each option should be an object with the following properties:
   - value (string): A unique identifier for the option.
   - label (string): The text displayed in the dropdown.
   - isActive (boolean): Whether the option is selectable. Default is true.
Example
```javascript
options: [
    { value: "option1", label: "Option 1", isActive: true },
    { value: "option2", label: "Option 2", isActive: false }, // Disabled
    { value: "option3", label: "Option 3", isActive: true }
]
```
### 2. placeholder (optional) :
Specifies the placeholder text displayed in the search input when no value is selected. Defaults to "Search...".
```javascript
placeholder: "Type to search..."
```

### 3. defaultValue (optional) :
Sets the preselected default value in the dropdown. Should match the value property of an existing option.
```javascript
defaultValue: "option3" // Preselects "Option 3"
```

### 4. required (optional) :
Marks the dropdown as a required field in forms. If set to true, the form will require the dropdown to have a value before submission.
```javascript
required: true // Makes the dropdown required in forms
```

### 5. disabled (optional) :
Disables the dropdown entirely, preventing user interaction.
```javascript
disabled: true // Renders a readonly dropdown
```

### 6. onchange (optional) :
A callback function triggered whenever the user selects an option. Returns the selected item's value and label.
```javascript
onchange: (selectedItem) => {
    console.log("Selected item:", selectedItem);
}
```
## Examples 
Examples Folder Include basic, advanced, and dynamic usage scenarios as separate .html files:

- basic-example.html: A simple implementation with static options.
- advanced-example.html: Show features like inactive options, arrow toggling, and highlighting.
- dynamic-update.html: Demonstrate how to dynamically update options.
- casecade.html: Demonstrate how to dynamically update options.

Also, Check out the below examples for various implementations:

### 1. Basic Example : A dropdown with static options:
```javascript
const dropdown = new SearchableDropdown("basicDropdown", {
    options: [
        { value: "option1", label: "Option 1", isActive: true },
        { value: "option2", label: "Option 2", isActive: true },
        { value: "option3", label: "Option 3", isActive: true }
    ]
});
```

### 2. Dynamic Updates : Demonstrates adding or updating options dynamically:
```javascript
dropdown.updateOptions([
    { value: "newOption1", label: "New Option 1", isActive: true },
    { value: "newOption2", label: "New Option 2", isActive: true },
    { value: "newOption3", label: "New Option 3", isActive: false } // Disabled
]);
```
### 3. Advanced Example : Includes features like default value, enabling/disabling options, change the default placeholder and the onchange event:
```javascript
const dropdown = new SearchableDropdown("advancedDropdown", {
    options: [
        { value: "advanced1", label: "Advanced Option 1", isActive: true },
        { value: "advanced2", label: "Advanced Option 2", isActive: false }, // Disabled
        { value: "advanced3", label: "Advanced Option 3", isActive: true }
    ],
    placeholder: "Choose an advanced option...",
    defaultValue : "advanced3",
    onchange: (selectedItem) => console.log("You selected:", selectedItem)
});

```
### 4. Disabled/Readonly Dropdown Example : Prevent the selection of the dropdown
```javascript
const dropdown = new SearchableDropdown("basicDropdown", {
    options: [
        { value: "option1", label: "Option 1", isActive: true },
        { value: "option2", label: "Option 2", isActive: true },
        { value: "option3", label: "Option 3", isActive: true }
    ],
    disabled: true
});
```

## Folder Structure
```html
lightweight-searchable-dropdown/
│
├── README.md                # Main documentation file
├── index.html               # HTML documentation file
├── js/
│   └── dropdown.js          # JavaScript for the dropdown component
├── css/
│   └── dropdown.css         # CSS for styling the dropdown
└── examples/
    ├── basic-example.html   # Basic usage example
    ├── advanced-example.html # Advanced features example
    ├── casecade-example.html # two dropdown list cascading example
    ├── disabled-example.html # disabled/readonly example
    └── dynamic-update-example.html  # Demonstrates dynamic updates
```
## Contributing
Contributions are welcome! Here's how you can help:

- Report bugs or request features by opening an issue.
- Fork the repository and make improvements or additions.
- Submit a pull request with your changes.
  
## License
This project is licensed under the MIT License. This means you are free to use, copy, modify, merge, publish and distribute.

## Author
This project is developed and maintained by Ahmed ABUFARES.

- GitHub: https://github.com/aabufares
- LinkedIn: https://www.linkedin.com/in/a-abufares/
- Email: a.abufares@outlook.com

If you have any questions, feedback, or ideas for improvements, feel free to reach out or contribute to the project. Contributions are always welcome!
