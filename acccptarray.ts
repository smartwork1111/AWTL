// Function to get length of each string
function getStringLengths(arr: string[]): number[] {
    return arr.map(str => str.length);
}

// Example usage
const words: string[] = ["apple", "banana", "kiwi", "grape"];

const lengths = getStringLengths(words);

console.log(lengths);