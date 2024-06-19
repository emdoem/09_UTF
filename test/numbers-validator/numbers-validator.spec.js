// Importing the 'expect' function from the 'chai' library to perform assertions
import { expect } from 'chai';

// Importing functions 'describe', 'beforeEach', 'afterEach' and 'it' from 'mocha' which is a test framework.
import {
	describe, beforeEach, afterEach, it,
} from 'mocha';

// Importing the NumbersValidator class from the relative path '../app/numbers-validator'
// so we can test its methods.
import NumbersValidator from '../../app/numbers-validator.js';

// Declaring a variable 'validator' outside of the 'beforeEach' and 'it' blocks
// to make it accessible throughout this describe block.
let validator;

const setupAndCleanup = () => {
	// 'beforeEach' is a hook that runs before each test ('it' block) within this 'describe' block.
	// It's usually used for setting up the test environment.
	beforeEach(() => {
		// Instantiates a new NumbersValidator object before each test and assigns it to 'validator'
		validator = new NumbersValidator();
	});

	// 'afterEach' is a hook that runs after each test. It is often used for cleanup activities.
	afterEach(() => {
		// Sets the validator variable to null to clean up memory after each test
		validator = null;
	});
};

// 'describe' is used to group related tests together into a test suite.
// Here, it describes a suite of tests for the 'isNumberEven' method of NumbersValidator class.
describe('isNumberEven', () => {
	setupAndCleanup();

	// positive test cases here
	[
		{
			title: 'should return true if number is even',
			input: 4,
			expectedOutput: true
		},
		{
			title: 'should return false if number is odd',
			input: 5,
			expectedOutput: false
		}
	].forEach(test => {
		it(test.title, ()=> {
			expect(validator.isNumberEven(test.input)).to.be.equal(test.expectedOutput);
		})
	});
	
	it('should throw an error if provided with a string', () => {
		expect(() => {
			validator.isNumberEven('4');
		}).to.throw('[4] is not of type "Number" it is of type "string"');
	});
});

describe('getEvenNumbersFromArray', () => {
	setupAndCleanup();

	// negative test cases here
	[
		{
			title: 'should throw an error if provided not an array',
			input: { a: 1, b: 2, c: 3 }
		},
		{
			title: 'should throw an error if provided an array consisting not only of numbers',
			input: [1, 2, '3', 4]
		},

	].forEach(test => {
		it(test.title, () => {
			expect(() => {
				validator.getEvenNumbersFromArray(test.input);
			}).to.throw(`[${test.input}] is not an array of "Numbers"`);
		})
	});

	// positive test cases here
	[
		{
			title: 'should return [2] if provided [1, 2, 3, 5]',
			input: [1, 2, 3, 5],
			expectedOutput: [2]
		}
	].forEach(test => {
		it(test.title, () => {
			const output = validator.getEvenNumbersFromArray(test.input);
			expect(output).to.be.deep.equal(test.expectedOutput);
		})
	});
});

describe('isAllNumbers', () => {
	setupAndCleanup();

	it('should return true if every element in the array is of type number', () => {
		const input = [1, 2, 3];
		const output = validator.isAllNumbers(input);

		expect(output).to.be.equal(true);
	});

	it('should return false if not every element in the array is of type number', () => {
		const input = [1, '2', 3];
		const output = validator.isAllNumbers(input);

		expect(output).to.be.equal(false);
	});

	it('should throw an error if not provided with an array', () => {
		const input = { a: 1, b: 2, c: 3 };

		expect(() => {
			validator.isAllNumbers(input);
		}).to.throw(`[${input}] is not an array`);
	});
});

describe('isInteger', () => {
	setupAndCleanup();

	it('should throw an error if not provided with a number', () => {
		const input = 'two';

		expect(() => {
			validator.isInteger(input);
		}).to.throw(`[${input}] is not a number`);
	});

	it('should return true if provided with an integer', () => {
		const input = 2;
		const output = validator.isInteger(input);

		expect(output).to.be.equal(true);
	});

	it('should return false if provided with a number that is not integer', () => {
		const input = 2.5;
		const output = validator.isInteger(input);

		expect(output).to.be.equal(false);
	});
});
