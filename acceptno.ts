// Function that accepts only numbers 1 to 5
function acceptNumber(num: 1 | 2 | 3 | 4 | 5): void {
    console.log("Accepted number:", num);
}

// Valid calls
acceptNumber(1);
acceptNumber(3);
acceptNumber(5);

// Invalid calls (will give error)
// acceptNumber(6); ❌
// acceptNumber(0); ❌