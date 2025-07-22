---
title: "The objective best way to learn programming"
description: "A look into project based learning, along with just harsh reality checks"
pubDate: "July 22 2025"
updatedDate: "July 22 2025"
imgDesc: "My very first github profile"
heroImage: "/blogs/post4-hero.png"
---

I get asked a lot _"How do I start programming?"_ and more often than not, the question is just funny to me. How am I, a guy who is more or less your age, who is also figuring his shit out supposed to guide you into learning something that he himself hasn't fully mastered?

But since I am in a position where people put me on a pedestal, I may as well answer the question once and for all.

**Here is the objective best way to learn programming**

---

## The fallacy

let me make this clear before everything. **Not everyone should learn how to code.**

I don't mean to be harsh, it is just the reality. Ask yourself first about why you even came to the conclusion that you have to learn programming.

Ask yourself

- Am I only learning how to code because I wish to get a high paying job?
- Am I only doing this because of peer pressure?
- Am I only doing this because I was pushed into Comp Sci?

Programming is hard work. It is the countless hours and midnight sessions and high pressure bug fixes that makes programming what it is. More often than not what you code wouldn't even give any realistic output till months later. It is survivor ship bias if you think your next big **micro saas** will take over.

Sticking with computer science means having to completely relearn how you think and do things. It means never being able to watch a tech movie again because all you will see is _"oh hey, they hacked nasa using HTML?"_.

In my mind there are two big approaches to learning programming.

**The first**

This is the simplest approach, millions of AI tools exist like _chatGPT, claude, deepseek etc_ or even full blown builders like _lovable, v0, bolt_ and more.

Learn the basics of coding, the loops, the conditions, variables, data structures, functions etc and just superimpose your knowledge via AI tools.

There is nothing bad about going with this approach, if anything under time pressure this is probably the best option that one may have. I respect the people who can comfortably say they can't code without AI. I personally also can't now, the dependence is crazy.

But would I call them real developers? **no**

---

## How to become a real developer

I am not saying that if you follow what I write here you will become some genius. I can only talk about what worked for me.

Programming is a **language agnostic** concept. What that means is that at the end of the day it doesn't matter if you use _python, Java, c/c++_ or punch code for that matter, as the core concepts remain the same through out.

The only reason why I say **understand** the basics and not **learn** is because it literally doesn't matter if you know the syntax of a `for loop` or a `function` till you actually know where and how to utilise them.

**Understanding comes with practice and practice comes with doing**

---

## The beauty that is TicTacToe

TicTacToe is a game that has been in play since stone age (don't fact check me). Super simple but quite addicting. In my opinion a good implementation of TicTacToe can take you quite a far way in your journey of learning how to program.

### The rules

There are not many rules, hence why it isn't the most complex. Let us write them down for our sake.

- Two players exist `x` and `o`
- A player wins if a `row`, `column` or `diagonal` is filled with the same piece
- The game is called a draw if no move can be played to win

And that is it, three rules that defined a game played over generations. Over the course of reading you would be shocked at how similar it is to a more complicated game.

### The implementation

I will be breaking this game into multiple smaller chunks, each chunk aimed to teach you something different and at the end all of them come together to give you a full game that you can play with other people.

**Note:** This entire guide is not meant to hold your hand and give you the code and tell you to copy paste it and run it and feel good about yourself. This guide will only give you an overview on what you can do to learn what, how to actually learn and implement it is on you

**Note:** I will be providing _keywords_ throughout the course of this guide, so as to give your googling a better direction

**Before starting be ready to be left questioning a lot of things in this guide, as it is made to be that way. A lot of questions are left unanswered or skipped over in order to encourage self research**

---

#### Part One

**Aim:** Making a two player console based TicTacToe game

Before beginning I would encourage you to play a game of TicTacToe and try to fully breakdown step by step how the game is played, notice what you were doing and try to think how you will translate all of this to a computer.

A standard TicTacToe board looks something like this

```
    |    |
---------------
    |    |
---------------
    |    |
```

to a program thinking of this as a nested array makes more sense

```
[
	[" ", " ", " "],
	[" ", " ", " "],
	[" ", " ", " "]
]
```

and now displaying pieces is as simple as indexing into a nested array, for example `array[1][1] = "x"` will make the center piece `x`

_keyword: array, nested array, array indexing_

But are you supposed to manually make this grid yourself everytime you want to update something? I personally wouldn't and would try to figure out a programmatic way where I can _iterate_ or _loop_ over a set of instructions to make my life easier.

```
define array = []
loop i 3 times
	define row = []
	loop j 3 times
		row[j] = " "
	array[i] = row
```

(pseudocode, not actual code)

would allow me recreate the board as many times as I want without having to copy paste the `3x3` grid everytime I want to display something

_keywords: for loops, iteration, array operations_

Now, I actually need to allow for human input in this game to actually make changes to the game and progress further.

_keywords: user input_

We can now, take user input, have the user input affect the board and also dynamically display the board. So we can basically play this. But there exist no win conditions... _yet_

like I talked about in the **rules** section, there really isn't much to check here. All you need to see is if three of anything exist in one line. For example for the top most row, if I had to check whether `x` had won or not, I would do something like

```
if array[0][0] == "x" and array[0][1] == "x" and array[0][2] == "x"
```

and like this I would check for all columns and rows and diagonals, for both `x` and `o`. Sounds daunting but it really is a simple task considering our knowledge right now.

take an `array` of all indicies for diagonals, rows and columns, something like `[(0, 0), (0, 1), (0, 2)...`, `iterate` through it and just have `if statements` checking against the player token

_keywords: if statements_

You can make your life simpler by putting all of this inside of a `function` to increase reusability of code along with just make your life a lot more easier

_keywords: functions, code reuseability, DRY principle_

Great this should lay the core of our **console based TicTacToe game** and while building it we learnt about the most basic elements of programming, those being

- control statements: `if`, `else if`, `else`
- iteration: `for loop`, `while loop`
- taking user input
- storing data
- array manipulation
- creation of functions and reusing code

and probably more that I can't think about. But we don't stop here. I would now highly encourage googling the same project and looking at how other people have made the same project and trying to learn from it and understand what differences were made.

---

#### Part Two

**Aim:** Make it so that if you dont have any friends you can _play against an ai_

AI, the word itself sounds super daunting. "Artificial Intelligence", how can I a simple human being make something smarter than me? Well under the hood it is just one big algorithm and we as computer science students, its our job to crack these algorithms.

You would be surprised to know that both **TicTacToe** and **Chess** more or less follow the same algorithm to automate their games, and it is frankly quite simple in theory.

**Min Max Algorithm**

The Min Max algorithm is like a super smart robot that helps you play a game by thinking ahead, ie, it looks at all the possible moves you and your opponent could make, one after the other.

When it's your turn, it picks the move that gives you the _best chance to win_ (that's the "max"), and when it's your opponent's turn, it assumes they'll try to _mess you up_ as much as possible (that's the "min").

It keeps doing this, switching between max and min until it reaches the end of the game (like someone winning or a draw), and then works backwards to figure out which move you should make now to get the best outcome.

Sounds complex?

It is just two checks

- **Max**: When it's your turn, the robot tries to **maximize** your score .
- **Min**: When it's your friend's turn, the robot tries to **minimize** your score.

You can understand this algorithm better if you watch -> https://www.youtube.com/watch?v=l-hh51ncgDI&t=31s

_keywords: min max algorithm, recursion, algorithmic programming_

After you implement this on your own is when you will start to actually **think like a programmer**. Programming is not about just writing lines of code on a screen, rather it is about **solving a problem**. Take a problem, break it into smaller chunks, check if any of them is fixable, if not break it down smaller. At the end of the day you will reach a point where you realize that, hey a lot of these problems look familiar to me.

And that is when you fall down the rabbit hole of **programming**

---

#### Part Three

**Aim:** Build a GUI for this game

Be honest, if you were to play this game, wouldn't you want a proper looking GUI for it? How long can you keep inputting `x` and `y` coordinates when you have a mouse (or trackpad) attached to your desktop.

How you build a GUI is in of itself quite a long process that I can't cover each and every step of in this guide, rather what I can do is talk about a general roadmap that I would follow.

_keywords: GUI, graphics programming_

My first goal would be to render my **console** based board onto a window. At the end of the day what happens in the background remains the same, with player turns and min max algo and everything. Only what changed is that now it got a new look.

I would try to keep my window logic as separate from my actual game logic (small segregation between the **frontend** and the **backend**)

_keywords: render a 2d array onto a window_

My next goal would be to figure out how to capture mouse press. In programming anything that happens is called an **event** and what is supposed to react to it is called an **event listener**. I would want to find the event listener tied to the **mouse click** action in the graphics library of my choice.

_keywords: events, event listeners, reacting to mouse events_

The next thing I would do is to figure out how to keep re-rendering the board every time something changes.

_keywords: refreshing a window_

And that is about it. While making a GUI, you would have been exposed to **Object Oriented Programming**, as most if not all graphics libraries depends on **classes** and **inheritance** and other core concepts.

_keywords: object oriented programming_

---

#### There is no part four

And that is it. If you actually understood what you were doing throughout the above three parts then you would have reached a comfortable spot where you can now go ahead and independently work on other projects.

**remember learning doesn't just stop with one project**

You can take this project further by asking yourself one big question, **How can I play this game over the internet in real time** which will go ahead and teach you things like socket programming and web based applications etc.

If you think building one project will be enough to teach you everything then you are very wrong. I can with surety say that you are probably left confused in some parts even if you followed through the entire thing.

Practice and building more things, solving problems and implementing solutions is the **only way to learn how to program**.

---

## Conclusion

In the end all I can say is that, **passion** and **curiosity** can't be taught. You will yourself have to take the step ahead and actually say to the world that _I will do this no matter what_ and actually learn this.

You didn't half ass learning how to read, don't half ass learning how to code either. Keep building and keep fucking around and finding out.

Everyone starts out somewhere, keep pushing through the struggles and you will be great.

Good luck

reach out to talk -> aj.adityajyoti@gmail.com
