document.addEventListener('DOMContentLoaded', function() {
    const tutorListElement = document.getElementById('tutorList');
    const searchBar = document.getElementById('searchBar');

    if (tutorListElement) {
        // Fetch list of tutors from the backend
        fetch('http://localhost:3000/api/class/tutors')
            .then(response => response.json())
            .then(data => {
                const tutors = data.tutors;
                displayTutors(tutors);

                // Add search functionality
                if (searchBar) {
                    searchBar.addEventListener('input', function() {
                        const searchTerm = searchBar.value.toLowerCase();
                        const filteredTutors = tutors.filter(tutor =>
                            `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(searchTerm)
                        );
                        displayTutors(filteredTutors);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching tutors:', error);
                alert('Error fetching tutors. Please try again later.');
            });
    }

    function displayTutors(tutors) {
        tutorListElement.innerHTML = ''; // Clear the list
        tutors.forEach(tutor => {
            const tutorItem = document.createElement('div');
            tutorItem.classList.add('tutor-item');

            tutorItem.innerHTML = `
                <div class="tutor-info">
                    <h3>${tutor.firstName} ${tutor.lastName}</h3>
                    <p>Subjects: ${tutor.subjects ? tutor.subjects.join(', ') : 'N/A'}</p>
                </div>
                <button class="btn-view-classes" data-tutor-id="${tutor._id}">View Classes</button>
            `;

            tutorListElement.appendChild(tutorItem);
        });

        // Add event listeners to "View Classes" buttons
        document.querySelectorAll('.btn-view-classes').forEach(button => {
            button.addEventListener('click', function() {
                const tutorId = this.getAttribute('data-tutor-id');
                window.location.href = `tutor-classes.html?tutorId=${tutorId}`;
            });
        });
    }
});