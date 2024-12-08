const ladder = document.querySelector('.ladder');
const modal = document.getElementById('ratingModal');
const closeModal = document.querySelector('.close-btn');
const tableBody = document.getElementById('ratingTableBody');
function generateTable() {
    tableBody.innerHTML = '';
    const sortedData = [...data.rating].sort((a, b) => b.points - a.points);
    const friendIds = data.friends.map(friend => friend.id);
    sortedData.forEach((user, index) => {
        const isFriend = friendIds.includes(user.id);
        const row = document.createElement('tr');
        if (isFriend) {
            row.classList.add('friend-highlight');
        }
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="images/${user.img}" alt="avatar" style="width: 21px; height: 21px;"></td>
            <td>${user.name} ${user.lastName}</td>
            <td>${user.points}</td>
        `;
        tableBody.appendChild(row);
    });
}
ladder.addEventListener('click', () => {
    generateTable();
    modal.style.display = 'block';
});
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
