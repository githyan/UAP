function previewImage(event) {
    const previewContainer = document.getElementById('previewContainer');
    const preview = document.getElementById('preview');

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            previewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        previewContainer.classList.add('hidden');
    }
}

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const accuracyLabel = document.getElementById('accuracyLabel');

    // Show progress bar
    progressContainer.classList.remove('hidden');
    progressBar.style.width = '0%';

    // Start simulating the progress
    let progress = 0;
    let interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
        } else {
            progress += 5;
            progressBar.style.width = progress + '%';
        }
    }, 200);

    // Upload image and get accuracy
    fetch('/home', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update accuracy after processing
                const accuracy = (data.accuracy * 100).toFixed(2);
                accuracyLabel.textContent = `Accuracy: ${accuracy}%`; z
            } else {
                accuracyLabel.textContent = 'Error: No file uploaded.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            accuracyLabel.textContent = 'Error during upload.';
        });
});