document.addEventListener("DOMContentLoaded", function() {
    const fileDropdown = document.getElementById("files");
    const keysDropdown = document.getElementById("keys");
    const valuesDropdown = document.getElementById("values");
    const datesInput = document.getElementById("dates");
    
    // Retrieve selected file and key from local storage, if exists
    const storedFile = localStorage.getItem("selectedFile");
    const storedKey = localStorage.getItem("selectedKey");
    if (storedFile) {
        fileDropdown.value = storedFile;
        fileDropdown.dispatchEvent(new Event("change"));
    }
    if (storedKey) {
        keysDropdown.value = storedKey;
        keysDropdown.dispatchEvent(new Event("change"));
    }
    
    // Add event listener to file dropdown
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
                
                // Check if the data is an array
                if (Array.isArray(data)) {
                    // Populate keys dropdown with keys from loaded JSON data
                    data.forEach(entry => {
                        const key = Object.keys(entry)[0];
                        const option = document.createElement("option");
                        option.text = key;
                        option.value = key;
                        keysDropdown.appendChild(option);
                    });
                    
                    // Trigger change event on keys dropdown to load data for the first key
                    keysDropdown.dispatchEvent(new Event("change"));
                } else {
                    console.error("Invalid JSON format. Expected an array.");
                }
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
    
    // Add event listener to keys dropdown
    keysDropdown.addEventListener("change", function(event) {
        const selectedKey = event.target.value;
        const selectedFile = fileDropdown.value;
        
        // Fetch JSON data from the selected file
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                // Find the entry with the selected key
                const selectedEntry = data.find(entry => Object.keys(entry)[0] === selectedKey);
                
                if (selectedEntry) {
                    // Store selected key and its corresponding data in local storage
                    localStorage.setItem("selectedKey", selectedKey);
                    localStorage.setItem("selectedData", JSON.stringify(selectedEntry[selectedKey]));
                    
                    // Populate values dropdown with values from the selected key's data
                    populateValuesDropdown(selectedEntry[selectedKey]);
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
        for (const value in values) {
            const option = document.createElement("option");
            option.text = values[value];
            option.value = values[value];
            valuesDropdown.appendChild(option);
        }
        
        // Select the first value by default
        valuesDropdown.selectedIndex = 0;
    }
});
