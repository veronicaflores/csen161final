document.addEventListener('DOMContentLoaded', function() {
  const likedPhotosContainer = document.getElementById('likedPhotos');
  const addGroupButton = document.getElementById('addGroupButton');

  // Retrieve liked images and groups from localStorage
  let likedData = JSON.parse(localStorage.getItem('likedData')) || { groups: [] };

  // Function to render liked images and groups
  function renderLikedData() {
      likedPhotosContainer.innerHTML = ''; // Clear previous content

      // Loop through each group and create HTML elements to display them
      likedData.groups.forEach((group, groupIndex) => {
          const groupContainer = document.createElement('div');
          groupContainer.classList.add('group-container');

          // Display group name as a link
          const groupNameLink = document.createElement('a');
          groupNameLink.textContent = group.name;
          groupNameLink.href = `template.html?groupIndex=${groupIndex}`; // Link to the HTML page with images
          groupNameLink.classList.add('group-name-link'); // Add the class here
          groupContainer.appendChild(groupNameLink);

          // Delete group button
          const deleteGroupButton = document.createElement('button');
          deleteGroupButton.textContent = 'Delete Group';
          deleteGroupButton.classList.add('delete-group-button');

          // Event listener for delete group button
          deleteGroupButton.addEventListener('click', function() {
              // Remove group from the liked data
              likedData.groups.splice(groupIndex, 1);
              // Update localStorage
              localStorage.setItem('likedData', JSON.stringify(likedData));
              // Re-render liked data
              renderLikedData();
          });

          // Append delete group button to the group container
          groupContainer.appendChild(deleteGroupButton);

          // Loop through each image in the group and create HTML elements to display them
          for (let imageIndex = 0; imageIndex < Math.min(group.images.length, 3); imageIndex++) {
              const image = group.images[imageIndex];

              const gridItem = document.createElement('div');
              gridItem.classList.add('grid-item');

              const imageElement = document.createElement('img');
              imageElement.src = image.imageUrl;
              imageElement.alt = image.title;

              // Apply the image styling class
              imageElement.classList.add('grid-item-image');

              // Delete button
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
              deleteButton.classList.add('delete-button');

              // Event listener for delete button
              deleteButton.addEventListener('click', function() {
                  // Remove image from the group
                  group.images.splice(imageIndex, 1);
                  // Update localStorage
                  localStorage.setItem('likedData', JSON.stringify(likedData));
                  // Remove image element from the page
                  gridItem.remove();
              });

              // Append the image to the grid item
              gridItem.appendChild(imageElement);

              // Append the delete button to the grid item
              gridItem.appendChild(deleteButton);

              // Append the grid item to the group container
              groupContainer.appendChild(gridItem);
          }

          // Append the "View All" button
          if (group.images.length > 3) {
              const viewAllButton = document.createElement('button');
              viewAllButton.textContent = 'View All';
              viewAllButton.classList.add('view-all-button');

              // Event listener for "View All" button
              viewAllButton.addEventListener('click', function() {
                  window.location.href = `template.html?groupIndex=${groupIndex}`;
              });

              groupContainer.appendChild(viewAllButton);
          }

          // Append the group container to the liked photos container
          likedPhotosContainer.appendChild(groupContainer);
      });
  }

  // Function to add a new group
  function addGroup() {
      const groupName = prompt('Enter the name of the group:');
      if (groupName) {
          const newGroup = {
              name: groupName,
              images: []
          };
          likedData.groups.push(newGroup);
          localStorage.setItem('likedData', JSON.stringify(likedData));
          renderLikedData();
      }
  }

  // Event listener for the Add Group button
  addGroupButton.addEventListener('click', addGroup);

  // Render liked images and groups initially
  renderLikedData();
});
