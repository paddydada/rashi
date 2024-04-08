document.addEventListener("DOMContentLoaded", function() {
    const filesSelect = document.getElementById('files');
    const keysSelect = document.getElementById('keys');
    const valuesSelect = document.getElementById('values');
    const datesInput = document.getElementById('dates');

    // Load file and keys on dropdown change
    filesSelect.addEventListener('change', function() {
        const selectedFile = filesSelect.value;
        localStorage.setItem('selectedFile', selectedFile);

        // Load keys for selected file
        fetch(selectedFile)
            .then(response => response.json())
            .then(data => {
                const keys = Object.keys(data);
                keysSelect.innerHTML = '';
                keys.forEach(key => {
                    const option = document.createElement('option');
                    option.text = key;
                    keysSelect.add(option);
                });
                // Store keys in local storage
                localStorage.setItem('keys', JSON.stringify(keys));

                // Set the selected key based on local storage
                const selectedKey = localStorage.getItem('selectedKey');
                if (selectedKey && keys.includes(selectedKey)) {
                    keysSelect.value = selectedKey;
                    // Trigger change event to load values
                    keysSelect.dispatchEvent(new Event('change'));
                }
            });
    });

    // Load values on key selection
// Load values on key selection
keysSelect.addEventListener('change', function() {
    const selectedKey = keysSelect.value;
    const keys = JSON.parse(localStorage.getItem('keys'));
    const values = data[selectedKey];

    valuesSelect.innerHTML = '';

    // Check if values is an array before iterating over it
    if (Array.isArray(values)) {
        values.forEach(value => {
            const option = document.createElement('option');
            option.text = value;
            valuesSelect.add(option);
        });
    } else {
        const option = document.createElement('option');
        option.text = values;
        valuesSelect.add(option);
    }

    // Store values in local storage
    localStorage.setItem('selectedValue', values[0]); // Default to the first value

    // Store selected key in local storage
    localStorage.setItem('selectedKey', selectedKey);
});

    // Handle date selection
    datesInput.addEventListener('change', function() {
        const selectedDate = new Date(datesInput.value);
        const dayOfWeek = selectedDate.toLocaleDateString('en', { weekday: 'long' }).toLowerCase(); // Get day of the week in lowercase

        // Load data for the selected day of the week
        const dayFile = dayOfWeek + '.json';
        fetch(dayFile)
            .then(response => response.json())
            .then(data => {
                // Display data for the selected key and value
                const selectedKey = keysSelect.value;
                const selectedValue = valuesSelect.value;
                const result = data[selectedKey][selectedValue];
                console.log(result); // You can do whatever you want with the result here
            });
    });

    // Initial loading
    const selectedFile = localStorage.getItem('selectedFile');
    if (selectedFile) {
        filesSelect.value = selectedFile;
        // Trigger change event to load keys
        filesSelect.dispatchEvent(new Event('change'));
    }
});
