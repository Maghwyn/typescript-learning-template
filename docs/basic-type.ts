// The boolean type represent either true or false, they're mostly used for flag

import { randomInt } from "crypto";

// Does this stuff is active, is the user admin, do i have the right to execute something ect.
const isActive: boolean = true;

// The number type represent any postive or negative value as long as they don't exceed 2.3 billion something
const age: number = 30;

// The string type represent any amount of characters
const name: string = "John Doe";

// The array type represent a list of a specific type, example an array of number, an array of string
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["John", "Jane", "Bob"];

// The tuple type exists but is rarely used in most cases, it's an array of different types
const person: [string, number] = ["John Doe", 30];

// The enum is under the hood an object because it's the only type in typescript that is compiled in javascript
// All types in typescript are there to define what the value of a variable is, but the enum is a bit special
// It is mostly used for convenience, rather than using number 0 1 2, you would use A, B, C which have a visual meaning
enum Color {
	Red,
	Green,
	Blue,
}
const myColor: Color = Color.Green;

// The any type is dangerous type you want to avoid, in javascript it's omnipresent.
// The reason it's dangerous is because any means any developers can add whatever value they want to a variable.
// Making it change from string to number to boolean to array, pretty confusing.
let randomValue: any = 42;
randomValue = "Hello";
randomValue = true;

// The void type is especially used for the return of a function, it means "no return expected"
function sayHello(): void {
	console.log("Hello!");
}

// The null and undefined type are used to specify that a value is no set.
const undefinedVar: undefined = undefined;
const nullVar: null = null;

// The never type mostly means that nothing will be returned by either a value or a variable
// The most sincere representation would be a "dead end"
function throwError(message: string): never {
	throw new Error(message);
}

// The Aliases type is used a lot and i encourage you to use it as much as possible like the Enum type
// When a number means something, we create an alias type to say : Here's the Age of a user, but it's also a number
// In most case, i use it for id like : GroupId = string , ArticleId = string ect.
type Age = number;
const personAge: Age = 30;

// The interface type is used to defined the structure of an object
// But it is also possible to define the structure of an object with the type alias and it's the better approach in general
interface Person {
	name: string;
	age: number;
}
const john: Person = { name: "John Doe", age: 30 };

//!-------------------------------------------------------------------------------------
//!-------------------------------------------------------------------------------------
//!-------------------------------------------------------------------------------------

// Why does all these types matter you might wonder ?
// While they are not type safe to make sure your code cannot be another type due to the nature of javascript.
// They're used for the convenience of the developpers to know what they're working with and tell them where there's an issue with the data you're manipulating
// Let's take some example :

// The variable aNumber is of type number and is now binded to the number type
let aNumber: number = 10;
// Notice how typescript tells you, you cannot use a string for a variable that is binded to a number
aNumber = "bonjour";
// Here you don't have any issue, because you satisfied the constraint number by addig a number.
aNumber = 20;

// Let's take another example :

// We define the properties a, b and c, which define automatically the structure of the object
const anObject = {
	a: "bonjour",
	b: "welcome",
	c: 20,
}

// We tried to add the properties e, but it does not exist in the original structure
// While it's valid in javascript because we don't care about type, typescript tells you this isn't right.
anObject.e = 40;

// What you should have done is to define a type alias for that object.

// We define the structure of that object with the folloding properties, a, b,c and e.
type ExampleObject2 = {
	a: string;
	b: string;
	c: number;
	e: number;
}

// But what's this ? It's say e is missing and that's correct.
// The object structure needs the e properties to be implemented in the object otherwise
// Typescript will tells you it's not right.
// But what if we want to set the e properties later ? Introducing "optional constraint"
const anObject2: ExampleObject2 = {
	a: "bonjour",
	b: "welcome",
	c: 20,
}

// We define another type alias with the e properties under the "optional constraint"
type ExampleObject3 = {
	a: string;
	b: string;
	c: number;
	e?: number; // Notice the "?" which define the optional constraint of a properties
}

// Here, we don't have that issue anymore since the e properties is optional
const anObject3: ExampleObject3 = {
	a: "bonjour",
	b: "welcome",
	c: 20,
}

// And this time we don't have an error because the e properties "can exist" in the object.
anObject3.e = 50;

// Now let's talk about Enum shall we.
// An enum is basically an object A = 0, B = 1, C = 2;
// Let's remember the Pokemilton game where you had multiple world choice to make during a single day.
const choice: number = 4;
switch(choice) {
	case 0: {
		// This will try to heal a pokemilton
		break;
	}
	case 1: {
		// This will try to revive a pokemilton
		break;
	}
	case 2: {
		// This will release a pokemilton
		break;
	}
	case 3: {
		// This will rename a pokemilton
		break;
	}
	case 4: {
		// We will do nothing
		break;
	}
	default: {
		break;
	}
}

// While we can add comment to tell what number specify which action, if we don't add those comment...
// The developer needs to read what's happening inside each case to understand what's doing what
// Pretty inconvient in my opinion
// What you could do instead thanks to typescript, is defining an enum to visually tell what's up
// Let's take the same example with an enum then.

// This is my enum to specify the possible game action, it's already clear what we can do
enum GAME_ACTION {
	HEAL_POKEMILTON,
	REVIVE_POKEMILTON,
	RELEASE_POKEMILTON,
	RENAME_POKEMILTON,
	DO_NOTHING,
}

// Notice how easy it is to understand that we will do nothing ? And behind the scene
// GAME_ACTION.DO_NOTHING = 4
let choice2: GAME_ACTION = GAME_ACTION.DO_NOTHING;
// Don't mind this, it's to bypass typescript complaning that choice2 can only be GAME_ACTION.DO_NOTHING
choice2 = randomInt(4);

switch(choice2) {
	case GAME_ACTION.HEAL_POKEMILTON: {
		break;
	}
	case GAME_ACTION.REVIVE_POKEMILTON: {
		break;
	}
	case GAME_ACTION.RELEASE_POKEMILTON: {
		break;
	}
	case GAME_ACTION.RENAME_POKEMILTON: {
		break;
	}
	case GAME_ACTION.DO_NOTHING: {
		break;
	}
}

// Now tell me that isn't much much much more convenient to tell what's doing what.
// That is the only reason you should use Enum, be more specific about random 0,1,2,3 value that represent a setting

// Now the array, just for a simple example
const anArray: number[] = [1,2,3,4];
// If i were to try to push a string, typescript would tell me i'm doing something wrong
anArray.push("random")
// Since only the array is binded to a list of number, we can only push number to it
anArray.push(30);

// Now introducing optional variable.
// Let's say we wanted to define a variable that accept a string, but is undefined by default
// The type is string, but it's actually string or undefined (you just don't see it)
let aString: string;
aString = "hello";
// The "|" is called a pipe, and is there to say that a value can either be type A or type B.
let aString2: string | undefined;
aString2 = "hello";
// Notice the aString2 type is "string" and not "string | undefined", because (you just don't see it) :shrug:

// What if we wanted for a value to be either "string" or "number" ? We could do it like so :
let aStringOrNumber: string | number = 40;
aStringOrNumber = "bonjour"
// The type bind to the variable can only either be string or number, so a boolean doesn't work
aStringOrNumber = true;

// You can pipe as many as you want...
let aLotOfType: string | number | boolean | number[] = [1,2,3]
aLotOfType = "coucou"
aLotOfType = 20
aLotOfType = false
// But it's not because you can that you should do it, only use the pipe when it's necessary for you needs

// That conclude the basic of typescript types