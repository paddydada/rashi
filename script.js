// Assuming the HTML elements have the same IDs as mentioned in the code

document.addEventListener("DOMContentLoaded", function() {
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
    
    fileDropdown.addEventListener("change", function(event) {
        const selectedFile = event.target.value;
        
        localStorage.setItem("selectedFile", selectedFile);
        
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                keysDropdown.innerHTML = "";
                
                const defaultOption = document.createElement("option");
                defaultOption.text = "Select key";
                defaultOption.value = "";
                keysDropdown.appendChild(defaultOption);
                
                if (typeof data === 'object' && !Array.isArray(data)) {
                    Object.keys(data).forEach(key => {
                        const option = document.createElement("option");
                        option.text = key;
                        option.value = key;
                        keysDropdown.appendChild(option);
                    });
                    
                    keysDropdown.dispatchEvent(new Event("change"));
                } else {
                    console.error("Invalid JSON format. Expected an object.");
                }
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
    
    keysDropdown.addEventListener("change", function(event) {
        const selectedKey = event.target.value;
        const selectedFile = fileDropdown.value;
        
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                const selectedEntry = data[selectedKey];
                
                if (selectedEntry) {
                    localStorage.setItem("selectedKey", selectedKey);
                    localStorage.setItem("selectedData", JSON.stringify(selectedEntry));
                    
                    populateValuesDropdown(selectedEntry);
                } else {
                    console.error("Selected key not found in JSON data.");
                }
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
    
    function populateValuesDropdown(values) {
        valuesDropdown.innerHTML = "";
        
        for (const key in values) {
            const option = document.createElement("option");
            option.text = key;
            option.value = values[key];
            valuesDropdown.appendChild(option);
        }
        
        valuesDropdown.selectedIndex = 0;
        
        localStorage.setItem("selectedValue", valuesDropdown.value);
    }
    
    datesInput.addEventListener("change", function(event) {
        const selectedDate = new Date(event.target.value);
        const dayOfWeek = selectedDate.getDay();
        let selectedFile;
        
        if (dayOfWeek === 1) { // Monday
            selectedFile = "monday.json";
        } else {
            console.error("Invalid day selected.");
            return; // Exit early if the day is invalid
        }
        
        fileDropdown.value = selectedFile;
        fileDropdown.dispatchEvent(new Event("change"));
    });
});
