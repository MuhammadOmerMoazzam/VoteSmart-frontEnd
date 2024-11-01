let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    const overlayGroups = document.querySelectorAll('.overlay-group');
    const totalImages = images.length;

    function showNextImage() {
        // Remove 'active' class from the current image and overlay group
        images[currentIndex].classList.remove('active');
        overlayGroups[currentIndex].classList.remove('active');
        
        // Update the index to the next image
        currentIndex = (currentIndex + 1) % totalImages;
        
        // Add 'active' class to the new image and overlay group
        images[currentIndex].classList.add('active');
        overlayGroups[currentIndex].classList.add('active');
    }

    // Set the first image and overlay group as active initially
    images[0].classList.add('active');
    overlayGroups[0].classList.add('active');

    // Change image and overlay every 3 seconds
    setInterval(showNextImage, 2500);


