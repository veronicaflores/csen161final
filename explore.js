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
        // Prompt the user to select a group
        const selectedGroup = prompt('Please select a group to add the image to:');
        if (selectedGroup) {
          // Save the liked image to localStorage
          saveLikedImage(item.imageUrl, item.title, selectedGroup);
          // Redirect to liked.html
          window.location.href = 'liked.html';
        }
      });

      gridItem.appendChild(image);
      gridItem.appendChild(saveButton);
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

// Call the populateGrid function when the page loads
window.addEventListener('load', populateGrid);

// Function to save the liked image to localStorage
function saveLikedImage(imageUrl, title, group) {
  // Retrieve existing liked data or initialize an empty object
  const likedData = JSON.parse(localStorage.getItem('likedData')) || { groups: [] };

  // Find the group or create a new one if it doesn't exist
  let groupIndex = likedData.groups.findIndex(g => g.name === group);
  if (groupIndex === -1) {
    groupIndex = likedData.groups.length;
    likedData.groups.push({ name: group, images: [] });
  }

  // Add the new liked image to the selected group
  likedData.groups[groupIndex].images.push({ imageUrl, title });

  // Save the updated liked data back to localStorage
  localStorage.setItem('likedData', JSON.stringify(likedData));
}
