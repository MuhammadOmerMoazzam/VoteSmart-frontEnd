document.addEventListener("DOMContentLoaded", function() {
    // Check for the path and execute corresponding script
    const path = window.location.pathname;

    if (path.endsWith('/pages/createpoll.html')) {
        // Code specific to createpoll.html
        document.getElementById("addOptionBtn").addEventListener("click", function() {
            var candidateSection = document.getElementById("candidatesSection");
            var candidateInfo = document.createElement("div");
            candidateInfo.className = "candidate-info";

            candidateInfo.innerHTML = `
                <div class="form-group">
                    <label for="candidateName">Name:</label>
                    <input type="text" name="candidateName[]" required>
                </div>
                <div class="form-group">
                    <label for="candidateAge">Age:</label>
                    <input type="number" name="candidateAge[]" required>
                </div>
                <div class="form-group">
                    <label for="candidateDescription">Description:</label>
                    <textarea name="candidateDescription[]" rows="2" required></textarea>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;

            candidateSection.appendChild(candidateInfo);

            var removeButtons = document.querySelectorAll(".remove-btn");
            removeButtons.forEach(function(button) {
                button.addEventListener("click", function() {
                    button.parentElement.remove();
                });
            });
        });
    }

    if (path.endsWith('/index.html')) {
        // Code specific to index.html
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

        // Show button when user scrolls down
        window.onscroll = function() {
            const scrollTopBtn = document.getElementById("scrollTopBtn");
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        // Smooth scroll-to-top function
        document.getElementById("scrollTopBtn").addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
