// Function to display liked images on the Liked page
function displayLikedImages() {
  const likedPhotosContainer = document.getElementById('likedPhotos');

  // Retrieve liked images from localStorage
  const likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];

  // Loop through liked images and create HTML elements to display them
  likedImages.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.imageUrl;
    imgElement.alt = image.title;
    
    likedPhotosContainer.appendChild(imgElement);
  });
}

// Call the displayLikedImages function when the page loads
window.addEventListener('load', displayLikedImages);