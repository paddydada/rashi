// Load JSON data from the file
fetch('dhanu.json')
    .then(response => response.json())
    .then(data => {
        const keysDropdown = document.getElementById('keys');

        // Populate dropdown with keys
        data.forEach(item => {
            const key = Object.keys(item)[0];
            const option = document.createElement('option');
            option.text = key;
            keysDropdown.add(option);
        });

        // Event listener for dropdown change
        keysDropdown.addEventListener('change', function() {
            const selectedKey = this.value;
            const selectedItem = data.find(item => Object.keys(item)[0] === selectedKey);
            const selectedData = selectedItem[selectedKey];

            // Display selected data in alert
            alert(JSON.stringify(selectedData, null, 2));
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));
