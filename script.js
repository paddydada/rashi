document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const fileDropdown = document.getElementById("files");
    const keysDropdown = document.getElementById("keys");
    const valuesDropdown = document.getElementById("values");
    const datesInput = document.getElementById("dates");
    
    // Event listener for file dropdown
    fileDropdown.addEventListener("change", function(event) {
        const selectedFile = event.target.value;
        
        // Check if the selected file exists in local storage
        const storedFile = localStorage.getItem("selectedFile");
        
        // If the selected file is different from the one stored, update local storage
        if (selectedFile !== storedFile) {
            localStorage.setItem("selectedFile", selectedFile);
            localStorage.removeItem("selectedKey");
            localStorage.removeItem("selectedData");
        }
        
        // Trigger change event on keys dropdown to clear its options
        keysDropdown.dispatchEvent(new Event("change"));
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
                const selectedEntry = data.find(entry => {
                    return Object.keys(entry)[0] === selectedKey;
                });
                
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
    
    // Event listener for values dropdown
    valuesDropdown.addEventListener("change", function(event) {
        // Store selected value in local storage
        localStorage.setItem("selectedValue", event.target.value);
    });
    
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
            
            // Alert the selected day
            alert("Selected day: Monday");
        } else {
            console.error("Invalid day selected.");
        }
    });
    
    // Function to populate the values dropdown
    function populateValuesDropdown(values) {
        // Clear previous options
        valuesDropdown.innerHTML = "";
        
        // Extract values from the object and populate the dropdown
        for (const key in values) {
            const option = document.createElement("option");
            option.text = values[key];
            option.value = values[key];
            valuesDropdown.appendChild(option);
        }
        
        // Select the stored value if it exists
        const storedValue = localStorage.getItem("selectedValue");
        if (storedValue && valuesDropdown.querySelector(`option[value="${storedValue}"]`)) {
            valuesDropdown.value = storedValue;
        }
    }
});
