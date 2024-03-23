// Function to fetch and populate the grid with images
async function populateGrid() {
  const gridContainer = document.getElementById('gridContainer');

  try {
    const response = await fetch('data.json'); // Assuming data.json is in the same directory
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    data.forEach(item => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      const image = document.createElement('img');
      image.src = item.imageUrl;
      image.alt = item.title;

      const saveButton = document.createElement('div');
      saveButton.classList.add('save-button');
      saveButton.innerHTML = '&#x1F4BE;'; // Unicode character for floppy disk

      // Event listener for the save button
      saveButton.addEventListener('click', function() {
        downloadImage(item.imageUrl);
      });
      
      const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = 'Like';

        // Set up event listener for the like button
        likeButton.addEventListener('click', function() {
          // Implement your like functionality here, e.g., incrementing a like counter
          // For demonstration, let's just alert that the image is liked
          //alert(`You liked "${item.title}"`);
        });

      gridItem.appendChild(image);
      gridItem.appendChild(saveButton);
      //added this line 46
      gridItem.appendChild(likeButton);
      gridContainer.appendChild(gridItem);
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}


//Function to download the image
function downloadImage(url) {
  // Create a new anchor element
  const link = document.createElement('a');
  link.href = url;
  
  // Set the download attribute to specify the filename
  link.setAttribute('download', 'image.png');

  // Trigger click event to initiate download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// // Call the populateGrid function when the page loads
window.addEventListener('load', populateGrid);

function saveLikedImage(imageUrl, title) {
  // Retrieve existing liked images or initialize an empty array
  const likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
  // Add the new liked image
  likedImages.push({ imageUrl, title });
  // Save the updated liked images back to localStorage
  localStorage.setItem('likedImages', JSON.stringify(likedImages));
}

