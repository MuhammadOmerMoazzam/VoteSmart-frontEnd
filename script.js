document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  function setupCreatePoll() {
    document
      .getElementById("addOptionBtn")
      .addEventListener("click", function () {
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

        document.querySelectorAll(".remove-btn").forEach((button) => {
          button.addEventListener("click", function () {
            button.parentElement.remove();
          });
        });
      });

    document
      .getElementById("pollForm")
      .addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission to check conditions first

        // Add custom validations here if needed

        // Submit the form if all checks pass
        this.submit();
      });

      // Check if the user is authenticated
    function checkAuthStatus() {
      fetch("http://localhost:8080/api/auth/status", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const authButtons = document.getElementById("auth-buttons");
          const profileIcon = document.getElementById("profileIcon");
          const userId = data.userId;
          console.log(data);

          if (data.authenticated) {
            // Hide login/signup buttons and show profile icon
            authButtons.style.display = "none";
            profileIcon.style.display = "block";
            // Optionally, you can store the userId in a global variable or localStorage if needed
            localStorage.setItem("userId", userId);
          } else {
            // Show login/signup buttons and hide profile icon
            authButtons.style.display = "block";
            profileIcon.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error checking authentication status:", error);
        });
    }

    // Call the function when the page loads
    window.onload = checkAuthStatus;

    // Redirect to the user's profile page when the profile icon is clicked
    function redirectToProfile() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        window.location.href = `/profile/${userId}`; // Replace with the actual profile page URL
      }
    }
  }

  function setupIndex() {
    let currentIndex = 0;
    const images = document.querySelectorAll(".carousel-image");
    const overlayGroups = document.querySelectorAll(".overlay-group");
    const totalImages = images.length;

    function showNextImage() {
      images[currentIndex].classList.remove("active");
      overlayGroups[currentIndex].classList.remove("active");

      currentIndex = (currentIndex + 1) % totalImages;

      images[currentIndex].classList.add("active");
      overlayGroups[currentIndex].classList.add("active");
    }

    images[0].classList.add("active");
    overlayGroups[0].classList.add("active");
    setInterval(showNextImage, 3000);

    window.onscroll = function () {
      const scrollTopBtn = document.getElementById("scrollTopBtn");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    };

    document
      .getElementById("scrollTopBtn")
      .addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    // Check if the user is authenticated
    function checkAuthStatus() {
      fetch("http://localhost:8080/api/auth/status", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const authButtons = document.getElementById("auth-buttons");
          const profileIcon = document.getElementById("profileIcon");
          const userId = data.userId;
          console.log(data);

          if (data.authenticated) {
            // Hide login/signup buttons and show profile icon
            authButtons.style.display = "none";
            profileIcon.style.display = "block";
            // Optionally, you can store the userId in a global variable or localStorage if needed
            localStorage.setItem("userId", userId);
          } else {
            // Show login/signup buttons and hide profile icon
            authButtons.style.display = "block";
            profileIcon.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error checking authentication status:", error);
        });
    }

    // Call the function when the page loads
    window.onload = checkAuthStatus;

    // Redirect to the user's profile page when the profile icon is clicked
    function redirectToProfile() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        window.location.href = `/profile/${userId}`; // Replace with the actual profile page URL
      }
    }
  }

  if (path.endsWith("/pages/createpoll.html")) {
    setupCreatePoll();
  }

  if (path === "/" || path.endsWith("/index.html")) {
    setupIndex();
  }
});
