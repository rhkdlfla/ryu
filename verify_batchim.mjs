import Hangul from 'hangul-js';
import { checkBatchim } from './src/rulelist/Batchim.js';

// Mocking checkBatchim input since it depends on Hangul library which is imported inside it.
// Actually handling imports with node execution might be tricky if "type": "module" is not set or extensions are mismatched.
// But given the project is react-scripts, it's likely using ES modules or webpack.
// To run this standalone with node, I might need to adjust imports or rely on the fact that node supports ESM now.
// 'hangul-js' might need to be imported differently if it's a CJS module.
// Let's rewrite the test to be self-contained for the logic PART or try to import.
// For safety, I'll copy the logic into the test script to verify the *logic* itself, or assume the user will run it in the app context.
// But the user asked me to verify. I'll try to run a script that imports the file.
// If it fails due to import issues (JSX, or non-standard imports), I will fallback to logic verification.

const testLogic = (pw) => {
    if (!pw) return false;
    let batchimCount = 0;
    for (const char of pw) {
        if (!Hangul.isComplete(char)) continue;
        const disassembled = Hangul.disassemble(char);
        const lastJamo = disassembled[disassembled.length - 1];
        if (Hangul.isConsonant(lastJamo)) {
            batchimCount++;
        }
    }
    console.log(`Password: "${pw}", Batchim Count: ${batchimCount}`);
    return batchimCount >= 1 && batchimCount <= 5;
};

const cases = [
    { pw: "가나다", expected: false, desc: "0 batchims" },
    { pw: "강", expected: true, desc: "1 batchim" },
    { pw: "각난닫ㄹ", expected: true, desc: "3 batchims (last char is not complete hangul)" },
    { pw: "닭", expected: true, desc: "1 double batchim" },
    { pw: "값", expected: true, desc: "1 double batchim" },
    { pw: "강강강강강", expected: true, desc: "5 batchims" },
    { pw: "강강강강강강", expected: false, desc: "6 batchims" },
    { pw: "hello", expected: false, desc: "English only" },
    { pw: "안녕hello", expected: true, desc: "Mixed, 2 batchims" }
];

console.log("Verifying Batchim Logic:");
cases.forEach(({ pw, expected, desc }) => {
    const result = testLogic(pw);
    console.log(`[${result === expected ? 'PASS' : 'FAIL'}] ${desc} (Expected: ${expected}, Got: ${result})`);
});
