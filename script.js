document.addEventListener("DOMContentLoaded", function() {
    const fileDropdown = document.getElementById("files");
    const keysDropdown = document.getElementById("keys");
    
    // Add event listener to file dropdown
    fileDropdown.addEventListener("change", function(event) {
        const selectedFile = event.target.value;
        
        // Fetch JSON data from the selected file
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                // Clear previous options
                keysDropdown.innerHTML = "";
                
                // Check if the data is an array
                if (Array.isArray(data)) {
                    // Populate keys dropdown with keys from loaded JSON data
                    data.forEach(entry => {
                        const key = Object.keys(entry)[0];
                        const option = document.createElement("option");
                        option.text = key;
                        option.value = key;
                        keysDropdown.appendChild(option); // Append the option to the dropdown
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
                    
                    // Display an alert with the selected key's data
                    alert(JSON.stringify(selectedEntry[selectedKey]));
                } else {
                    console.error("Selected key not found in JSON data.");
                }
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
});
