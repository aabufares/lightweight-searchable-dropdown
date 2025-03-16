/*! lightweight_searchable_dropdown v1.0 | https://github.com/aabufares/lightweight-searchable-dropdown */
class SearchableDropdown {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.options = config.options || []; // Default to an empty array if no options are provided
        this.placeholder = config.placeholder || "Search..."; // Default placeholder
        this.defaultValue = config.defaultValue || null; // Optional default value
        this.selectedOption = null; // Keep track of the selected option
        this.required = config.required || false; // Whether the field is required
        this.disabled = config.disabled || false; // Whether the dropdown is disabled
        this.onchangeCallback = config.onchange || null; // Callback for onchange event
        this.inputId = `${containerId}-input`; // Use the div id with a prefix for input id
        this.inputName = `${containerId}-name`; // Use the div id with a prefix for input name
        this.init();
    }

    init() {
        // Add the base HTML structure
        this.container.innerHTML = `
            <div class="custom-dropdown-container">
                <div class="custom-dropdown-wrapper">
                    <input type="text" 
                           class="form-control custom-search-box" 
                           id="${this.inputId}" 
                           name="${this.inputName}" 
                           placeholder="${this.placeholder}" 
                           ${this.required ? 'required' : ''} 
                           ${this.disabled ? 'disabled' : ''} 
                           autocomplete="off">
                    <span class="dropdown-arrow">▼</span>
                </div>
                <div class="custom-dropdown-list" style="display: none;"></div>
            </div>
        `;

        this.searchBox = this.container.querySelector(".custom-search-box");
        this.dropdownList = this.container.querySelector(".custom-dropdown-list");
        this.dropdownArrow = this.container.querySelector(".dropdown-arrow");

        // Render dropdown options or no items message
        this.renderOptions();

        // Set the default value if provided
        if (this.defaultValue) {
            this.setDefaultValue();
        }

        // Attach event listeners if the dropdown is not disabled
        if (!this.disabled) {
            this.attachEventListeners();
        }
    }

    renderOptions(filter = "") {
        // Filter the options based on the input value
        const filteredOptions = this.options.filter(option =>
            option.label.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredOptions.length === 0) {
            // Show "No items available" or "No item found" message
            this.dropdownList.innerHTML = `
                <div class="dropdown-item no-item" style="text-align: center; color: #999;">
                    ${this.options.length === 0 ? "No items available" : "No item found"}
                </div>
            `;
            return;
        }

        // Populate the dropdown list with the filtered options
        this.dropdownList.innerHTML = filteredOptions
            .map(option => `
                <div class="dropdown-item ${!option.isActive ? 'disabled-item' : ''} ${this.defaultValue === option.value ? 'selected-item' : ''}" 
                     data-value="${option.value}" 
                     ${!option.isActive ? 'disabled' : ''}>
                    ${option.label.trim()}
                </div>
            `)
            .join("");
    }

    setDefaultValue() {
        // Find the default option
        const defaultOption = this.options.find(option => option.value === this.defaultValue);

        if (defaultOption && defaultOption.isActive) {
            this.selectedOption = defaultOption; // Save the default option as selected
            this.searchBox.value = defaultOption.label.trim(); // Set input field to default value
            this.searchBox.dataset.value = defaultOption.value; // Store the default value
        }
    }

    attachEventListeners() {
        // Show dropdown when the input is focused
        this.searchBox.addEventListener("focus", () => {
            this.dropdownList.style.display = "block";
            this.dropdownArrow.classList.add("open"); // Add 'open' class to rotate the arrow
            this.renderOptions(); // Render all options on focus
        });

        // Filter options dynamically as the user types
        this.searchBox.addEventListener("input", () => {
            const filter = this.searchBox.value;
            this.renderOptions(filter); // Render filtered options on input
        });

        // Handle option selection
        this.dropdownList.addEventListener("click", (event) => {
            if (event.target.classList.contains("dropdown-item") &&
                !event.target.classList.contains("disabled-item") &&
                !event.target.classList.contains("no-item")) {
                // Remove 'selected-item' from previously selected option
                const previouslySelected = this.dropdownList.querySelector(".selected-item");
                if (previouslySelected) {
                    previouslySelected.classList.remove("selected-item");
                }

                // Mark the clicked item as selected
                this.selectedOption = event.target;
                this.selectedOption.classList.add("selected-item");

                // Update the input value and trim whitespace
                this.searchBox.value = this.selectedOption.textContent.trim(); // Trim unnecessary spaces
                this.searchBox.dataset.value = this.selectedOption.getAttribute("data-value"); // Store the selected value
                this.dropdownList.style.display = "none";
                this.dropdownArrow.classList.remove("open"); // Reset the arrow direction

                // Trigger onchange callback if provided
                if (this.onchangeCallback) {
                    this.onchangeCallback({
                        value: this.searchBox.dataset.value,
                        label: this.selectedOption.textContent.trim() // Pass trimmed label
                    });
                }
            }
        });

        // Close the dropdown when clicking outside
        document.addEventListener("click", (event) => {
            if (!this.container.contains(event.target)) {
                this.dropdownList.style.display = "none";
                this.dropdownArrow.classList.remove("open"); // Reset the arrow direction
            }
        });
    }

    // Dynamically update the dropdown options
    updateOptions(newOptions) {
        // Preprocess options to trim spaces and reset state
        this.options = newOptions.map(option => ({
            ...option,
            label: option.label.trim() // Trim unnecessary spaces
        }));
        this.disabled = this.options.length === 0;
        this.renderOptions(); // Re-render the options dynamically
    }

    // Get the selected item
    getSelectedItem() {
        if (this.selectedOption) {
            return {
                value: this.searchBox.dataset.value,
                label: this.selectedOption.textContent.trim() // Ensure trimmed label
            };
        }
        return null;
    }
}
