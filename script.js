document.addEventListener("DOMContentLoaded", function() {
    const fileDropdown = document.getElementById("files");
    const keysDropdown = document.getElementById("keys");
    const valuesDropdown = document.getElementById("values");
    const datesInput = document.getElementById("dates");
    
    // Add event listener to file dropdown
    fileDropdown.addEventListener("change", function(event) {
        const selectedFile = event.target.value;
        
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
                if (typeof data === "object" && !Array.isArray(data)) {
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
    
    // Add event listener to keys dropdown
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
        for (const value in values) {
            const option = document.createElement("option");
            option.text = value;
            option.value = values[value];
            valuesDropdown.appendChild(option);
        }
        
        // Select the first value by default
        valuesDropdown.selectedIndex = 0;
    }
    
    // Add event listener to dates input
    datesInput.addEventListener("change", function(event) {
        const selectedDate = new Date(event.target.value);
        const dayOfWeek = selectedDate.getDay();
        let selectedFile;
        
        // Determine the file based on the day of the week
        if (dayOfWeek === 1) { // Monday
            selectedFile = "monday.json";
        } else if (dayOfWeek === 0) { // Sunday
            selectedFile = "sunday.json";
        } else {
            console.error("Invalid day selected.");
            return;
        }
        
        // Trigger change event on file dropdown to load data for the selected file
        fileDropdown.value = selectedFile;
        fileDropdown.dispatchEvent(new Event("change"));
        
        // Calculate and store the sum of values from the selected file, if it's kumbha.json
        if (selectedFile === "kumbha.json") {
            calculateAndStoreSum(selectedFile);
        }
    });
    
    // Function to calculate the sum of values for kumbhamn and kumbhapl from kumbha.json
    function calculateAndStoreSum(selectedFile) {
        // Fetch JSON data from the selected file
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                // Extract kumbhamn and kumbhapl values
                const kumbhamn = data["KUNBHAMN"];
                const kumbhapl = data["KUNBHAPL"];
                
                // Calculate the sum of kumbhamn and kumbhapl
                const sumKumbhamn = kumbhamn.reduce((acc, val) => acc + val, 0);
                const sumKumbhapl = kumbhapl.reduce((acc, val) => acc + val, 0);
                
                // Display alert with the sum
                alert("Sum of Kumbhamn: " + sumKumbhamn + "\nSum of Kumbhapl: " + sumKumbhapl);
                
                // Store the sum in local storage
                localStorage.setItem("sumKumbhamn", sumKumbhamn);
                localStorage.setItem("sumKumbhapl", sumKumbhapl);
            })
            .catch(error => console.error("Error calculating sum:", error));
    }
});
