/**
 * This is computationally intensive algorithm, it will be very slow for large inputs.
 * Because we are generating all possible permutations and subsequences, that makes the time complexity O(n!).
 * For large inputs, we can consider implementing Trie data structure and implement depth-first search on top on Trie algorithm.
 * and using Trie algorithm can reduce the time complexity O(n^2).
 * The choice of algorithm greatly depends on the expected size of the input
 */

const findWords = (inputString: string, WORDS: string[]): string[] => {
  let wordsObj: { [key: string]: boolean } = WORDS.reduce(
    (acc: { [key: string]: boolean }, word: string) => {
      acc[word] = true;
      return acc;
    },
    {}
  ); // convert the array to object to make the search easy O(1)
  let validWords: { [key: string]: boolean } = {};

  // Helper function to generate all permutations
  function permute(prefix, input) {
    let length = input.length;

    if (length === 0) {
      // find words that are subsets of the given string
      for (let i = 0; i < prefix.length; i++) {
        for (let j = i + 1; j <= prefix.length; j++) {
          let substring = prefix.slice(i, j);
          if (wordsObj[substring]) {
            // check if the substring is valid.
            validWords[substring] = true;
          }
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        permute(
          `${prefix}${input[i]}`,
          `${input.slice(0, i)}${input.slice(i + 1, length)}`
        );
      }
    }
  }

  permute("", inputString);
  return Object.keys(validWords);
};

// Usage
const WORDS: string[] = ["good", "god", "dog", "goo", "do", "go", "og", "d"];
const inputString: string = "oogd";
console.log(findWords(inputString, WORDS));
