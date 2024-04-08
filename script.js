document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const fileDropdown = document.getElementById("files");
    const keysDropdown = document.getElementById("keys");
    const valuesDropdown = document.getElementById("values");
    const datesInput = document.getElementById("dates");
    
    // Retrieve selected file, key, and value from local storage, if they exist
    const storedFile = localStorage.getItem("selectedFile");
    const storedKey = localStorage.getItem("selectedKey");
    const storedValue = localStorage.getItem("selectedValue");
    
    // Set dropdown values from local storage
    if (storedFile) {
        fileDropdown.value = storedFile;
    }
    if (storedKey) {
        keysDropdown.value = storedKey;
    }
    if (storedValue) {
        valuesDropdown.value = storedValue;
    }
    
    // Trigger change events if stored values exist
    if (storedFile) {
        fileDropdown.dispatchEvent(new Event("change"));
    }
    if (storedKey) {
        keysDropdown.dispatchEvent(new Event("change"));
    }
    if (storedValue) {
        valuesDropdown.dispatchEvent(new Event("change"));
    }
    
    // Event listener for file dropdown
    fileDropdown.addEventListener("change", function(event) {
        const selectedFile = event.target.value;
        
        // Save selected file in local storage
        localStorage.setItem("selectedFile", selectedFile);
        
        // Fetch JSON data from the selected file
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                // Clear previous options
                keysDropdown.innerHTML = "";
                
                // Add default option to keys dropdown
                const defaultOption = document.createElement("option");
                defaultOption.text = "Select key";
                defaultOption.value = "";
                keysDropdown.appendChild(defaultOption);
                
                // Check if the data is an object
                if (typeof data === 'object' && !Array.isArray(data)) {
                    // Populate keys dropdown with keys from loaded JSON data
                    Object.keys(data).forEach(key => {
                        const option = document.createElement("option");
                        option.text = key;
                        option.value = key;
                        keysDropdown.appendChild(option);
                    });
                    
                    // Trigger change event on keys dropdown to load data for the first key
                    keysDropdown.dispatchEvent(new Event("change"));
                } else {
                    console.error("Invalid JSON format. Expected an object.");
                }
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
    
    // Event listener for keys dropdown
    keysDropdown.addEventListener("change", function(event) {
        const selectedKey = event.target.value;
        const selectedFile = fileDropdown.value;
        
        // Fetch JSON data from the selected file
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                // Find the entry with the selected key
                const selectedEntry = data[selectedKey];
                
                if (selectedEntry) {
                    // Store selected key and its corresponding data in local storage
                    localStorage.setItem("selectedKey", selectedKey);
                    localStorage.setItem("selectedData", JSON.stringify(selectedEntry));
                    
                    // Populate values dropdown with values from the selected key's data
                    populateValuesDropdown(selectedEntry);
                } else {
                    console.error("Selected key not found in JSON data.");
                }
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
    
    // Function to populate the values dropdown
    function populateValuesDropdown(values) {
        // Clear previous options
        valuesDropdown.innerHTML = "";
        
        // Extract values from the object and populate the dropdown
        for (const key in values) {
            const option = document.createElement("option");
            option.text = key;
            option.value = values[key];
            valuesDropdown.appendChild(option);
        }
        
        // Select the first value by default
        valuesDropdown.selectedIndex = 0;
        
        // Save selected value in local storage
        localStorage.setItem("selectedValue", valuesDropdown.value);
    }
    
    // Event listener for dates input
    datesInput.addEventListener("change", function(event) {
        const selectedDate = new Date(event.target.value);
        const dayOfWeek = selectedDate.getDay();
        let selectedFile;
        
        // Determine the file based on the day of the week
        if (dayOfWeek === 1) { // Monday
            selectedFile = "monday.json";
            
            // Trigger change event on file dropdown to load data for the selected file
            fileDropdown.value = selectedFile;
            fileDropdown.dispatchEvent(new Event("change"));
        } else {
            console.error("Invalid day selected.");
        }
    });
});
