// Event listener for file dropdown
fileDropdown.addEventListener("change", function(event) {
    const selectedFile = event.target.value;
    
    // Save selected file in local storage
    localStorage.setItem("selectedFile", selectedFile);
    
    // Fetch JSON data from the selected file
    if (selectedFile) {
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
                if (typeof data === "object" && data !== null) {
                    // Populate keys dropdown with keys from loaded JSON data
                    Object.keys(data).forEach(key => {
                        // Create an option element
                        const option = document.createElement("option");
                        
                        // Split the key string and join the relevant parts
                        const keyParts = key.split("-");
                        const dropdownValue = `${keyParts[0]}-${keyParts[1]}-${keyParts[2]}`;
                        
                        option.text = dropdownValue;
                        option.value = key;
                        
                        // Append option to the dropdown
                        keysDropdown.appendChild(option);
                    });
                    
                    // Trigger change event on keys dropdown to load data for the first key
                    keysDropdown.dispatchEvent(new Event("change"));
                } else {
                    console.error("Invalid JSON format. Expected an object.");
                }
            })
            .catch(error => console.error("Error loading JSON data:", error))
            .finally(() => {
                // Trigger change event on keys dropdown after fetching data
                keysDropdown.dispatchEvent(new Event("change"));
            });
    } else {
        console.error("No file selected.");
    }
});
