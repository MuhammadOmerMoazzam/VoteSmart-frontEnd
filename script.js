document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;

    function setupCreatePoll() {
        document.getElementById("addOptionBtn").addEventListener("click", function() {
            const candidateSection = document.getElementById("candidatesSection");
            const candidateInfo = document.createElement("div");
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

            document.querySelectorAll(".remove-btn").forEach(button => {
                button.addEventListener("click", function() {
                    button.parentElement.remove();
                });
            });
        });
        document.getElementById('pollForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission to check conditions first
        
            const candidateCount = document.querySelectorAll('input[name="candidateName[]"]').length;
            const participantCount = parseInt(document.getElementById('participantCount').value);
        
            // Check if there are more than 2 candidates
            if (candidateCount > 2) {
                window.location.href = '/pages/pricing.html'; // Redirect to pricing page
                return;
            }
        
            // Check if more than 20 participants are entered
            if (participantCount > 20) {
                window.location.href = '/pages/pricing.html'; // Redirect to pricing page
                return;
            }
        
            // If all checks pass, submit the form
            this.submit();
        });
    }

    function setupIndex() {
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

        window.onscroll = function() {
            const scrollTopBtn = document.getElementById("scrollTopBtn");
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        document.getElementById("scrollTopBtn").addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (path.endsWith('/pages/createpoll.html')) {
        setupCreatePoll();
    }

    if (path === '/' || path.endsWith('/index.html')) {
        setupIndex();
    }
});
