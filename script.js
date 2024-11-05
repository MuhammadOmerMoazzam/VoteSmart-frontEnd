let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    const overlayGroups = document.querySelectorAll('.overlay-group');
    const totalImages = images.length;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        overlayGroups[currentIndex].classList.remove('active');
        
        
        currentIndex = (currentIndex + 1) % totalImages;
        
        images[currentIndex].classList.add('active');
        overlayGroups[currentIndex].classList.add('active');
    }
    images[0].classList.add('active');
    overlayGroups[0].classList.add('active');
    setInterval(showNextImage, 3000);


