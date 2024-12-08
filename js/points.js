const points = [
    { path: [
        { x: 435, y: 440 },
        { x: 403, y: 422 },
        { x: 373, y: 392 },
        { x: 340, y: 405 }
    ] },
    { path: [
        { x: 340, y: 405 },
        { x: 300, y: 428 },
        { x: 263, y: 449 }
    ] },
    { path: [
        { x: 263, y: 449 },
        { x: 221, y: 467 },
        { x: 176, y: 467 }
    ] },
    { path: [
        { x: 176, y: 467 },
        { x: 128, y: 456 },
        { x: 98, y: 439 }
    ] },
    { path: [
        { x: 98, y: 439 },
        { x: 70, y: 420 },
        { x: 70, y: 404 },
        { x: 111, y: 375 }
    ] }
];

const character = document.getElementById('character');
let currentPointIndex = 0;
const speed = 0.1;
function calculateAngle(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const maxAngle = 10;
    const minAngle = -10; 
    angle = Math.min(maxAngle, Math.max(minAngle, angle));
    return angle;
}
function moveCharacter(start, end) {
    return new Promise((resolve) => {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = distance / speed;
        let t = 0;
        const intervalDuration = 50;
        const angleStepCount = 6;
        const angleUpdateInterval = duration / angleStepCount;
        const interval = setInterval(() => {
            t += intervalDuration / duration;
            if (t >= 1) {
                clearInterval(interval);
                t = 1;
                character.style.left = `${end.x}px`;
                character.style.top = `${end.y}px`;
                character.style.transform = `rotate(0deg)`;
                character.classList.remove('walking'); 
                resolve();
            }
            const x = start.x + dx * t;
            const y = start.y + dy * t;
            character.style.left = `${x}px`;
            character.style.top = `${y}px`;
            if (Math.floor((t * duration) / angleUpdateInterval) % 1 === 0) {
                const currentAngle = calculateAngle({ x, y }, end); 
                character.style.transform = `rotate(${currentAngle}deg)`; 
            }
        }, intervalDuration);
    });
}
async function moveThroughPath(path) {
    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        character.classList.add('walking'); 
        await moveCharacter(start, end);
    }
}
document.getElementById('nextPoint').addEventListener('click', async () => {
    if (currentPointIndex < points.length) {
        const path = points[currentPointIndex].path;
        await moveThroughPath(path);
        currentPointIndex++;
    } else {
        alert('Все точки пройдены!');
    }
});
const firstPoint = points[0].path[0];
character.style.left = `${firstPoint.x}px`;
character.style.top = `${firstPoint.y}px`;
character.style.transform = `rotate(0deg)`; 