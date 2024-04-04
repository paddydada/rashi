document.addEventListener("DOMContentLoaded", function() {
    const fileDropdown = document.getElementById("files");
    const keysDropdown = document.getElementById("keys");
    
    // Trigger change event on file dropdown to load JSON data when the page loads
    fileDropdown.value = "kark.json";
    fileDropdown.dispatchEvent(new Event("change"));
    
    // Add event listener to file dropdown
    fileDropdown.addEventListener("change", function(event) {
        const selectedFile = event.target.value;
        
        // Fetch JSON data from the selected file
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                // Clear previous options
                keysDropdown.innerHTML = "";
                
                // Populate keys dropdown with keys from loaded JSON data
                data.forEach(entry => {
                    const key = Object.keys(entry)[0];
                    const option = document.createElement("option");
                    option.text = key;
                    option.value = key;
                    keysDropdown.add(option);
                });
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
                
                // Store selected key and its corresponding data in local storage
                localStorage.setItem("selectedKey", selectedKey);
                localStorage.setItem("selectedData", JSON.stringify(selectedEntry[selectedKey]));
                
                // Display an alert with the selected key's data
                alert(JSON.stringify(selectedEntry[selectedKey]));
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
});
