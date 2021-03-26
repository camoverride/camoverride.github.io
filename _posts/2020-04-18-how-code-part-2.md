---
layout: post
title: How to Code (Part 2)
excerpt: A beginner's guide to learning how to program with Python.
categories: [code]
comments: true
published: true
---

> "The idea behind digital computers may be explained by saying that these machines are intended to carry out any operations which could be done by a human computer."

Alan Turing, Computing Machinery and Intelligence

> "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them."

Frank Herbert, Dune

The science fiction novel _Dune_ occurs thousands of years after a cybernetic revolt led to the near-extinction of the human race. In the wake of this disaster, a religious cult has permeated a dogma across the galaxy, proclaiming that _Thou shalt not make a machine in the likeness of a man's mind_: a permanent ban in Artificial Intelligence and computers. In order to compensate for the absence of this technology, _mentats_ have been trained to mimic the abilities of digital computers. But there's a problem with this: digital computers themselves mimic the same logical reasoning that humans perform. The only difference between a computer and a human is that the computer is capable of holding a larger sequence of logical events in memory and can act faster. There are only a small number of fundamental building blocks that software is made out of: concepts like _variables_, _data types_, _loops_, and _conditional statements_ -- all of which are easily comprehensible to humans: you can memorize a program, write it on a piece of paper, or run it in a computer. This chapter will explore some of these fundamental building blocks in the Python language, leaving you with a strong foundation to build upon.

<!-- more -->

## What is a Programming Language?

In the last chapter I gave a rough sketch of a what a programming language is: a formal system that takes some input, performs some _logical_ operations, and gives some output. The zsh commands I introduced in the last chapter do most of this: they process input and give output. But zsh is missing a key ingredient that makes it a _comamnd language_ and not a _programming language_: it's lacking logic. I also told you in the last chapter that I'm going to teach you by showing, but just bt telling, so hold tight while I define the basic syntax of Python in the next few sections as we build up to the formal logic: conditionals, loops, and data types.


## The Programming Environment

Let's create an environment to get started. Inside your terminal, create a folder called `learn_python` and navigate inside it. If you've installed [VS Code](https://code.visualstudio.com/), you can start a new project by typing `code .`. This opens a VS Code Editor window and lists all the files in the current directory. Create a new Python file and open it in VS Code: `touch hello.py`. The `.py` extension will tell Python that `hello.py` is a Python _module_ -- a file where some code lives. Inside this file enter the following line of Python code:

~~~python
print("Hello world!")
~~~

To run this module, return to your terminal and type `python hello.py`. You should see `Hello world!` get printed to the standard output of your terminal.

Congratulations! You've successfully run your first Python program. However, Python can do more than just print blocks of text to the terminal. In the next few sections, we'll learn the basic structure and logic of programming languages, giving you a foundation that will let you become an expert coder.


## The Structure of a Program

In `hello.py`, let's add another line that prints out a thank you note to the former Vice President often credited with inventing the internet:

~~~python
print("Hello world!")
print("Thanks, Al Gore!")
~~~

Try running this program again. You'll see that each of these `print` statements was triggered in order, and printed its text to your terminal.

But what if something goes wrong? Let's say that you have a _syntax error_ in your code. Try modifying your program to look like this (notice the lack of the final quote after _Gore!_):

~~~python
print("Hello world!")
print("Thanks, Al Gore!)
~~~

Instead of printing the text you wanted, your terminal will print this:

~~~python
File "<stdin>", line 2
  print("Al Gore!)
                    ^
SyntaxError: EOL while scanning string literal
~~~

This is Python telling that you forgot the quote: your _syntax_ is bad. Because Python is a _formal language_ you're required to follow certain rules: one of these rules is that a block of text has to be wrapped by quotes. Python is very good at complaining when things go wrong and will give you informative error messages when things break. If your code doesn't run, don't freak out. The error messages are useful: copy them into Google and see if other people have had the same issue (they have).

In the next few sections, we'll explore Python’s ability to do math, logic, and repetitive work.


## Math

Programming languages can do lots of things, and one very important thing they can do is math. But don't worry, the sort of mathematics that gets used in code is very basic. Even though Computer Science students are required to take advanced math classes like linear algebra, most will rarely (if ever) use any math more advanced than division (I'm __not__ kidding). However, even though the math is basic, it's important to know how to actually do it, which I'll explain in this section.
Instead of printing `Hello world!` to the terminal, you can print numbers instead.

Make a new module called `math.py` and enter the below line into it. Then run it on your terminal using `python math.py`:

~~~python
print(2 * 5)
~~~

The terminal output will be `10`. The asterisk stands for multiplication. Division is done with a slash: `10 / 2` and subtraction with, well, a minus sign: `11 - 9`. Exponentiation is performed with two asterisks: five squared is 5**2.

You might have seen an annoying meme like this one floating around on the internet: _whats the answer to 10 * 2 - 10 / 5?_ The trick to solving this is to remember that mathematical expressions have a certain [order of operations](https://en.wikipedia.org/wiki/Order_of_operations) -- exponents come before multiplication, that comes before division, something, something -- I forget! But guess what hasn't forgotten the order of operations: Python. Plug this expression into your Python program and see what the output is -- no need to memorize anything, have your computer do it for you:

~~~python
print(10 * 2 - 10 / 5)
~~~

However, in practice, a program like the one above is confusing. Nobody actually remembers that multiplication comes before division or addition comes before subtraction. So when another person looks at the math, it's hard for them to interpret what your intent was. Even though you get the correct answer by printing this to the terminal, it helps to add some extra parentheses to make things look less confusing:

~~~python
print( (10 * 2) - (10 / 5) )
~~~

A slightly more exotic mathematical function is the remainder function. This gives the remainder after division. For instance, when you divide _10_ by _5_, the answer is _2 remainder 0_ (it divides evenly), but _10_ divided by _3_ is _3.3333..._ If this was expressed in whole numbers, it would be _3_ remainder _1_. The percent symbol is called the [modulo operator](https://en.wikipedia.org/wiki/Modulo_operation) and gives you the remainder. `10 % 2` is `0`, and `10 % 3` is `1`.

Delete the contents of `math.py` and enter this instead. Can you guess what the output will be before you run it?

~~~python
print(5 + 2)
print(5 - 2)
print(5 * 2)
print(5 / 2)
print(5 % 2)
print(5**2)
~~~


## Variables

Mathematics with just numbers is boring. What if the numbers actually mean something, like the number of skeletons in your closet, and amount of wood a woodchuck can chuck, or the temperature in Celsius? Variables can be used to represent these numbers (as well as strings of text and other types of data). Make a new module called `variables.py` and enter the following:

~~~python
x = 5
y = 2
z = "hello world"
print(x + y)
~~~

When you run this program, the number `7` is printed to the terminal. The variables `x` and `y` stand for the numbers `5` and `2`, respectively, and can be reused as many times as needed. Variable names can be any combination of letters and numbers, but it's usually good to give your variables short and descriptive names.

For instance, let's say that you're a myopic American like myself, with no understanding of the metric system. Given some temperature in Celsius, I can use this formula to convert it to Fahrenheit: _Temp(F) = Temp(C) * 9/5 + 32_. This is what it would look like in Python:

~~~python
temp_cel = 21
temp_fah = (temp_cel * 9/5) + 32
print(temp_fah)
~~~

Here's a line-by-line description of how the program works:
- In line 1, the variable `temp_cel` is set to some Celsius temperature that we want to convert (in this case it's `21`, but it could be any number).
- In line 2, the variable `temp_fah` is set to be equal to the value of `temp_cel` times `9/5` plus `32`, which can be _expanded out_ into `21 * 9/5 + 32`.
- In the third line, `temp_fah` is printed to the terminal.

Technically, this could all be compressed down to just one or two lines:

~~~python
temp_fah = 21 * 9/5 + 32
print(temp_fah)
~~~

Or:

~~~python
print(21 * 9/5 + 32)
~~~

These programs do the same work, but aren't equally easy to understand. In the two-line version, it's not obvious that `21` corresponds to the temperature in Celsius. And in the one line version, I don't even know what sort of data the print statement is supposed to be producing (is it a temperature, a highway number, or the answer to how much money is in your savings account?). Variable names help us understand understand what the data they represent actually means. Also, the values of variables can change; this topic will be explored in greater detail later in the chapter.


## Comments

But wait, if we look at a program and don't understand how something works, can't a programmer just add comments? Glad you asked. The answer is yes! There are two types of comments in Python: inline comments and block comments.

An inline comment starts with a hash mark and everything after the hashmark is ignored by Python.

~~~python
# Program to convert Celsius to Fahrenheit.
temp_cel = 21 # the C temp you want to convert.
temp_fah = (temp_cel * 9/5) + 32
print(temp_fah) # prints to the terminal
~~~

Block comments are used for longer comments that span multiple lines. They start and end with three quotes:

~~~python
"""
This is my program to convert temperatures in Celsius to Fahrenheit.
Americans like myself are incapable of understanding the metric system,
so this program is very important.
"""
temp_cel = 21
temp_fah = (temp_cel * 9/5) + 32
print(temp_fah) # prints to the terminal
~~~

Often, it's useful to _comment out_ certain pieces of a program. Let's say that you're experimenting with the print function but don't want to print everything from your program. Just comment out the parts you don't want. In the program below, lines 3 and 4 won't get executed.

~~~python
print("Hello world!")
print("Thanks, Al Gore!")
#print("here is a line")
#print("here is another line")
print("Hello world again!")
~~~

Comments are critically important when writing code. They let both other people and yourself understand how your programs work and disambiguate potentially confusing areas. They can also be used for temporarily removing bits of code and testing for bugs.


## More About Printing

What if you want to create a program that will print a personalized greeting? Something like _Hello NAME, welcome home!_ Instead of NAME, you can simply include a variable. Strings of text can be concatenated together using the plus sign:

~~~python
name = "Cameron"
print("Hello " + name + ", welcome home!")
~~~

`Hello Cameron, welcome home` gets printed to the terminal.

Each snippet of text in the program above is called a string. A string is a type of data that contains text information. There are three strings in the program: `"Cameron"`, `"Hello "`, and `", welcome home!"`. Why don't we combine them together and print that instead. Run the program below and see that it has the same output as above:

~~~python
name = "Cameron"
output = "Hello " + name + ", welcome home!"
print(output)
~~~

While the program above is completely valid, it's a bit ugly. That's where _f-strings_ come in handy. They are special kinds of strings you can insert variables into. An f-string has to start with the character `f` outside the quotes, and variable names are wrapped by special angle bracket characters:

~~~python
# Insert the variable `name` into the f-string `output` and print it.
name = "Cameron"
output = f"Hello {name}, welcome home"
print(output)
~~~


## Strings

I've been using the technical term _string_ a lot but haven't really defined it other other than saying that a string is something wrapped by quotes. Technically, a string is some text data, and the quotes are just a way of telling Python that this is text data and not a number or some other kind of data. But what happens when you want to include a quote inside of a string, like the sentence `Cameron said "I love math," sarcastically?` At first glance this seems impossible: after all, don't quotes begin and end strings? This program will yield an error:

~~~python
print("Cameron said "I love math," sarcastically")
~~~

One way of solving this is to wrap the string in single quotes instead of double quotes. But that only solves this specific instance: what if we have a long text with a mixture of single and double quotes?

his can be resolved by forcing Python to interpret the quotes literally, instead of as Python syntax that usually means the things that wrap strings. To make Python interpret a quote literally, it needs to be _escaped_, which is done by putting a backslash before it.

~~~python
print("Cameron said \"I love math,\" sarcastically")
~~~

This prints out `Cameron said "I love math," sarcastically`, just as we'd hoped for.


## String methods

Strings have _methods_ associated with them. Methods are small functions that apply to the string itself. To convert the following string to all lowercase letters, you can use the `.lower()` method:

~~~python
myString = "This Is My String!"
lower_string = myString.lower()
print(lower_string)
~~~

This is equivalent to the more succinct program:

~~~python
lower_string = "This Is My String!".lower()
print(lower_string)
~~~

Or ultra succinct:

~~~python
print("This Is My String!".lower())
~~~

These programs all have the same output, which is `this is my string!`.

Another useful string method is `strip` which removes any leading or trailing whitespace. Create a new python module called `string_methods.py` and enter the following lines. Notice how the strings are printed differently:

~~~python
string1 = "   hello     "
string2 = "   world   "
print(string1 + string2)
print((string1 + string2).strip()) # keep an eye on the parentheses!
print(string1.strip() + string2.strip())
print(string1.strip() + " " + string2.strip())
~~~

Notice that in the first print statement none of the white space has been stripped. In the second `print`, `strip` wasn't triggered until after both strings were already combined, meaning that the whitespace in the middle isn't removed (strip only deletes leading and trailing whitespace). Whitespace is completely deleted in the third print statement, meaning that both words run up against each other. In the fourth, an extra space is added inside `print`.

A string is a data type that has specific methods associated with it, like `strip` and `lower`. Can you guess what the result of `.capitalize()` does?


## Data Types

In Python, a number like `1` or `46065` is a type of data called an _integer_. Fractional numbers, like `3.14159`, are a different data type, called a _float+. An even more distinct data type is a _string_, like `"Hello world!"`. These data types have different properties and are used differently by different functions.

For instance, the `print` function can accept an integer, float, or string (as well as other data types) as its input. But what about the division operator? This program works as expected:

~~~python
x = 5
y = 2
z = "Hello world!" # unused variable
print(x / y)
~~~

But what happens if you run this program, where `x`, which is set to the number `5`, is being divided by a string (try it!):

~~~python
x = 5
y = 2 # unused variable
z = "Hello world!"
print(x / z)
~~~

This gets printed to the terminal: `TypeError: unsupported operand type(s) for +: 'int' and 'str'`. Scary! What does that mean? Well, try reading the error message: you tried adding a number to a string of text, which doesn't make any sense. It's like asking "what color is freedom?" or trying to divide by zero (which gets its own error, `ZeroDivisionError`). Errors like this will stop your program from running, so it's good to avoid them.

Strings are a type of data that have a large number of methods associated with them, like `lower` and `capitalize` that we saw in the last section. Python can search strings for particular words or phrases, can chop them up into individual sentences, and add them together. The string method `replace` substitutes one part of a string with something else: `"Cameron is great".replace("Cameron", "David")`

The next section will introduce another important data type, called a _list_. Strings, ints, floats, lists, and _dicts_ (introduced later) are the basic data types in Python, and have equivalents in almost all other languages.


## Lists

A list (called an _array_ in other programming languages) is simply an ordered list of data. The items in a list can be of different types: floats, strings, and even other lists can all be included. Declaring a list in Python is easy:

~~~python
animals = ["pig", "horse", "dog", "cow"]
~~~

Each item in a list has a particular index. Python is a zero-indexed language, meaning that the first item in the list has index _0_. We select a particular item in a list by adding square brackets after the list with the item's index inside the brackets. Try creating this program and running it from your terminal:

~~~python
animals = ["pig", "horse", "dog", "cow", "cat"]
print(animals)
print(animals[0]) # print the first item in the list
~~~

You will see that two lines are printed to the terminal. The first line contains a list of all the animals. The second line contains just the zero-th animal, "pig".

In addition to accessing one item of a list, a larger slice of a list can be selected as well. For instance, `animals[2:]` selects all the animals including and after the index 2. Run the following code:

~~~python
animals =  ["pig", "horse", "dog", "cow", "cat"]
print(animals[2:])
~~~

This will print the last three animals in the list: `["dog", "cow", "cat"]`. To get the first three items of the list, put the colon before the index: `animals[:3]`.

A slice can also be a subset of the list. For instance `animals[1:3]` will select `["horse", "dog"]`.

List indexes can also be accessed in reverse. `animals[-1]` selects the last item in the list (`"cat"`) and `animals[-2:]` selects the last two items in the list.

Lists can contain different types of data. The list `myList` below is completely valid in Python:

~~~python
animals =  ["pig", "horse", "dog", "cow", "cat"]
myList = ["lasagna", 23, 24, 666, animals, animals[2], "lasagna"]
~~~

Lists can also be added to automatically. `append` is a method applied to lists that adds an item to the end of the list. Here's how you can add `"chicken"`:

~~~python
animals =  ["pig", "horse", "dog", "cow", "cat"]
animals.append("chicken") # list method
print(animals)
~~~

You'll see that animals now contains `"chicken"`.

If you want to delete the last item from a list, you can use the list method `pop()`. However, you'll find in practice that it's easier to create new lists that are conveniently missing the items you don't want than it is to delete items from a list, so I won't go into too many details there.

If you have two lists, you can combine them into a larger list:

~~~python
mammals = ["pig", "horse", "cow"]
birds = ["pigeon", "crow", "sand piper"]

animals = mammals + birds
print(animals)
~~~

Lists also have a length associated with them. The function `len` takes a list or string as input, and tells you its length:

~~~python
print(len(animals))
~~~


## Tuples

Tuples are another data structure in Python that are similar to lists except they aren't _mutable_-- that means you can't add or remove anything from them. Tuples are declared by using parentheses:

~~~python
my_tuple = ("golden retriever", 3)
~~~

Tuples are useful for storing data because of their immutability -- you don't have to worry about some other function you've written accidentally editing your data! `zip` is a function that takes two equal-length lists and zips them together into a list of tuples that associate the values in the first list with the values in the second:

~~~python
dogs = ["Fido", "Copper", "Mikey", "Sam"]
ages = [3, 6, 4.6, 11]

dog_ages = list(zip(dogs, ages))
~~~

When you print out `dog_ages` you'll get the following list of tuples: `[('Fido', 3), ('Copper', 6), ('Mikey', 4.6), ('Sam', 11)]`.


## Conditionals

So far, all the programs we've written have flowed continuously without interruption (except when we hit an error!). But often we want to interrupt the flow of our program when certain conditions are met. Let's say that we have a program, like the one from the __More About Printing__ section; this program prints a greeting when given a name. But let's say that you only want to print the greeting when the name of the person is part of an approved list of people. You would do this by testing whether the name variable is part of the `approved_people` list, and continue if that's true:

~~~python
approved_people = ["Amanda", "Connie", "Cameron", "Jen"]
name = "Cameron"

# Check to see if the name is approved
if name in approved_people:
	print("Hello {name}, you're approved!")
~~~

This is how the flow of a conditional statement works: if the condition is true, _do something_; otherwise, skip it. Python's syntax requires that the _do something_ part of a conditional gets indented. Indents (which are tabs or four spaces) are meaningful in Python. Python also requires that a `:` come at the end of the conditional statement. The code below is wrong! Try replacing the last two lines from the code above with this and running it -- see what error you get

~~~python
if name in approved_people:
print("Hello {name}, you're approved!")
~~~

In the conditional above, we are testing whether the string `"Cameron"` is part of the list approved_people (which it is!). An if statement only continues through to the indented part if the conditional evaluates to _True_.

In this case, _True_ means something akin to the dictionary definition of true: that which is the case. But technically, the definition of True in Python means "logically true." The next section is a slight detour to introduce the _interpreter_. After that we'll return to learning about how Python deals with logic, which is how Python knows whether something is __True__ or __False__.


## The Interpreter

So far all the Python code you've been writing or copying has been saved to a Python module like `hello.py` and been executed in the terminal. However, you can also execute your code instantaneously using the Python interpreter. In your terminal, type `python` to start up the interpreter. You'll immediately notice that your command prompt has changed to look like this: `>>>`. This means that whatever you type is going to be interpreted as Python code. Try typing `print("Hello world")` and see what happens. In fact, you don't need print statements for things to be printed from the interpreter: just type it in and it's printed immediately! If you ever want to exit the interpreted, just type `quit()`.

![]({{ site.url }}/img/interpreter.png)

Try out adding some of the other programming concepts inside the interpreter. The interpreter is often very useful when testing out smaller functions or writing small programs you only have to use once. When you create code to share with other people or to make software, it'll be saved in modules instead.

The purpose of this detour was to allow you to use the interpreter for the following sections about logic, where it will be convenient.


## Testing for Truth

In the __Conditionals__ section we learned that a conditional statement only executes the indented code below it if the conditional statement evaluates to True. But how do we know that something is true? Is 3 ever greater than 4? Does "lasagna" really equal "lasagna"? Is `"Cameron"` always part of the list `["Cameron", "tuna", 57]`? We have intuitive ideas about truth: no, three isn’t greater than four; yes, lasagna equals lasagna; and "Cameron" is certainly a member of that list. Boolean logic takes our intuition about "truthiness" and defines it precisely, letting each of these statements be evaluated to either `True` or `False`.

Try executing this simple statement in the interpreter:

~~~python
3 > 4
~~~

The output is `False`. That's because `3 > 4` is asking Python _is three greater than 4?_ and Python is saying _nope!_. `4 > 3`, on the other hand, will print `True`!

There are only a small number of basic logical tests that can be done: _equality_, _non-equality_, _greater/less than_, and _set membership_. In the remainder of this section I'll introduce all of those.

Equality simply asks whether two things are the same. Nnotice that there are __two__ equals signs, not one! If there were one equals sign, Python would think that the number on the left was the name of a variable, and the number on the right is its value. Keep this in mind! It's a big source of errors:

~~~python
3 == 3
3 == 2
"lasagna" == "lasagna"
"lasagna" == "disgusting"
~~~

This is what Python prints:

~~~python
True
False
True
False
~~~

(For the remainder of this chapter, I'll add the terminal output as a comment next to the corresponding line.)

_Inequality_ asks the opposite question: are two things not the same? ("not equals"):

~~~python
3 != 3 # False
3 != 2 # True
"lasagna" != "lasagna" # False
"lasagna" != "disgusting" # True
~~~

_Strict inequality_ asks whether something is greater or smaller than something else:

~~~python
3 > 2 # True
3 < 2 # False
len("lasagna") > len("the") # True
len("lasagna") < len("the") # False
~~~

_Non-strict inequality_: is something greater/less than or equal to something else:

~~~python
3 >= 2 # True
3 <= 2 # False
~~~

_Set membership_ asks whether something is part of a group.

~~~python
animals = ["cat", "dog", "fish"]
cat in animals # True
lion in animals # False
~~~

These are all of the basic logical comparisons in Python. They all have two possible outcomes: True or False. But certain objects in Python also have inherent truth values that aren't the result of making a logical comparison. The integer `0` evaluates to `False`. An empty list, `[]`, (along with all empty collections, including empty _tuples_ `()` and dicts `{}`, which will be introduced later in the chapter) are always `False`. The special data type `None` is also False.

The value `True` is much more widespread in Python. Anything that exists is `True`. A non-empty list, any number other than `0`, a function, object, or anything else is `True`.

Let's try this out in a conditional statement:

~~~python
a = True
if a:
    print("the condition was true!!!")

print("end of the program!")
~~~

This program prints the statement in the conditional because `a` is `True`. As explained above, `a` is also `True` if it exists:

~~~python
a = "cat"
if a:
	print("the condition was true!!")

print("end of the program!")
~~~

`"cat"` is a string, and it exists, therefore the condition is `True` and the conditional triggers. Try modifying the code above to make the value `False`. Notice that the program completes without printing the indented code.

In the next section, we'll take these basic ideas about truthiness and find ways to combine them into more interesting expressions.


## Boolean Logic

The logical tests in the previous section all acted on some textual or mathematical objects, like `3 > 4`, and gave a truth value as an output (`False` in this case). But there is an abstract kind of logic that takes _True's_ and _False's_ as inputs and produces `True` or `False` as an output. This is called _Boolean logic_, and has only three basic operators: `and` (also written `&&`), `or` (also written `||`), and `not`. A _Boolean_ is one of the two expressions `True` or `False`; a _Boolean statement_ is a statement like `3 > 4` that evaluates to `True` or `False`; and the _Boolean operators_ are `and`, `or`, and `not`.

Let's see what they look like in action:

~~~python
True and True  # True
True and False # False
True or True   # True
True or False  # True
not True       # False
not False      # True
~~~

These statements make intuitive sense when you think of them in terms of English. Let's say that a corner store is selling apples and oranges, but not grapefruit. If you walk up to ask the cashier and ask "do you sell oranges?" her reply will be __True__. If we ask her "do you sell apples and oranges? her reply will also be __True__. If you ask "do you sell apples or grapefruit?" her reply will be __True__, because while she doesn't have any grapefruit, she does have apples. If you ask "do you have apples and grapefruit?" the answer will be __False__, as will be her answer to the question "do you have grapefruit or tangerines?"

In other words, `and` is `True` if both of its inputs are `True` (and is `False` otherwise). `or` is `True` if at least one of its inputs is `True` (and `False` otherwise).

Both `and` and `or` are _binary operators_, meaning that they take two objects as input and produce another object as output. The type of objects they accept as input are Booleans, and their output is always one Boolean. Everyone is already familiar with other binary operators: the addition operator (the plus sign) takes two numbers as input, `1 + 1`, and produces a third number as output: `2`.

`not` is a _unary operator_, meaning that it takes one input and produces one output. Another unary operator that everyone has used is the negation operator. This operator takes a number and flips its sign: 3 becomes -3, -15 becomes 15, etc.

Let's reprsent the above store interaction in Python:

~~~python
apples = True
oranges = True
grapefruit = False
tangerines = False

apples and oranges # True
apples and grapefruit # False
grapefruit and tangerines # False

apples or oranges # True
apples or grapefruit # True
grapefruit or tangerines # False
~~~

But there's no need to assign Boolean values to variables (such as `apples = True`). As was stated above, Boolean logic is more abstract than this: it operates on `True` and `False` without having to reference objects in the real world (just like how you can add `3 + 7` without having to answer the question _three of what?_).

This lets us produce a convenient summary of the simply binary logical operators in Python. Below is the truth table for `and` and `or`:

| input 1 | input 2 | and    | or     |
|---------|---------|--------|--------|
| True    | True    | True   | True   |
| True    | False   | False  | True   |
| False   | True    | False  | True   |
| False   | False   | False  | False  |

Now that we understand the basics of Boolean logic, we can begin chaining things together to ask more complicated questions.

What’s the result of the Boolean statement `(False and False) and False`? First evaluate the statement inside the parentheses: `(False and False)`. And then evaluate the remaining statement: `False`. Below are some more complicated Boolean statements. Before you run this code, try to guess what the outputs are:

~~~python
animals = ["frog", "bird", "pterodactyl"]

3 > 4 or "frog" in animals
3 > 4 and "frog" in animals
True or ("bird" in animals)
False or ("lizard" not in animals)
(not True) or ("bird" in animals)
not not True
(True or False) and (not False and animals)
(animals and animals) or (not animals or (not "lasagna" in animals))
not (True and False)
(animals or (True or False)) and (animals and not not animals)
~~~

In the next section, we'll apply our knowledge of logic to conditional statements and create a simple program.

### More on Conditionals

Let's say that you're a particularly vindictive person and like to keep lists of the friends and family members who annoy you. But let's also pretend that you have a terrible memory, and have trouble remembering who these people are. If you're feeling lonely and want to hang out with someone, you need to be able to make sure that the person you're considering spending time with isn't annoying... unless you're feeling excessively bored, in which case you'll make an exception for family members. How might Python help you out? When you're a programmer, your entire job is to translare scenarios like this into code, using the logical building blocks we've been introducing as raw ingredients.

We can start by creating two lists, one of friends and another of family members. Make a new module called `hangout.py` and enter the below code. Then we can test whether a given person belongs to one of these lists:

~~~python
# The person we are considering hanging out with
person = "James"

# Annoying friends and family members
friends = ["Sandy", "Ravi", "Ivan"]
family = ["Dad", "Amanda", "Uncle Bob"]

# Test to see if the person is annoying
if person not in friends or family:
    print(f"You should hang out with {person}.")
else: # if `if` didn't trigger, this will
    print(f"{person} is annoying... don't hang out with them...")
~~~

This program will print `You should hang out with James`, because `"James"` isn’t in either of the lists. If `name` was changed to `"Ivan"`, then `Ivan is annoying... don't hang out with them...` would be printed instead.

But wait a second, I snuck something new in there: an `else` statement! `if` and `else` are complements: if `if` triggers, `else` won't. And if the `if` statement _doesn't_ trigger, then `else` will. This is the pseudocode for if/else statements:

We can add an additional layer to our if/else statements (notice the `elif` (else-if) and the modified print statements below):

~~~python
# The person we are considering hanging out with
person = "James"

# Annoying friends and family members
friends = ["Sandy", "Ravi", "Ivan"]
family = ["Dad", "Amanda", "Uncle Bob"]

# Test to see if the person is annoying
if person in family: # if this doesn't trigger, move on to `elif`
    print(f"{person} is an annoying family member.")
elif person in friends: # if `if` didn't trigger, check to see if this will
    print(f"{person} is an annoying friend.")
else: # if the `elif` doesn't trigger, this will
    print(f"{person} is OK. You can hang out.")
~~~

This program is first testing whether `"James"` is in family (`if`). If James isn't in `family`, then it's testing whether `"James"` is in `friends` (`elif`). Finally, if James isn't in either of those, it's printing the third print statement (`else`).

But wait -- at the beginning of this section, I said that if we're in a good mood, we want to ignore our list of banned family members and hang out with them anyway. How might we do that? One approach is to add a variable at the very top called `in_a_good_mood` which can be either `True` or `False`. Then we can change our if/elif/else block to first check whether `in_a_good_mood` is `True` before proceeding:

~~~python
# My mood today
in_a_good_mood = True

# The person we are considering hanging out with
person = "James"

# Annoying friends and family members
friends = ["Sandy", "Ravi", "Ivan"]
family = ["Dad", "Amanda", "Uncle Bob"]

# Test to see if the person is annoying
if in_a_good_mood and person in family:
    print(f"You're happy today. Hang out with {person}.")
elif person in family:
    print(f"{person} is an annoying family member.")
elif person in friends:
    print(f"{person} is an annoying friend.")
else:
    print(f"{person} is OK. You can hang out")
~~~

Notice that we added _another_ `elif`. This continues the flow of our program, but first checks whether we are in a good mood with the first `if` statement.

Testing for logical conditions inside of `if` statements is an important part of controlling how your program flows. Having variables with useful names, like `in_a_good_mood` is an essential part of programming because variables are often tested for their truth values inside of conditionals. In the following section, we will take this to the next level by learning a new way to introduce data and functions to your programs.


## Imports

The functions we've learned about so far, like `print` and `len` are part of Python's _standard library_. The standard library also has other modules available to it that have more specific uses -- but how to we access them? We can `import` them.

Let's say that we want to know the value of the mathematical constant [Pi]()? Let's just import it:

~~~python
from math import pi

print(pi) # 3.141592653589793
~~~

The syntax is pretty straightforward: `from <module> import <thing>`. Instead of importing just `pi`, we can import the entire module and then make reference to different functions and variables in that module using dot `.` syntax:

~~~python
import math

print(math.pi) # 3.141592653589793
~~~

The problem with importing the entire module is that we have to redundantly add `math.` before all the things from the `math` module we're using... but this can also be useful because we're making it explicit where `pi` is coming from. I'm not going to tell you which approach is better (that's more of a _style_ choice and is outside the scope of an introductory text), but you should be aware that this distinction exists.

Modules like `math`, `re`, and `os` come packaged with Python when it's installed. But you can also import things from modules you've created yourself. Create two new files, called `some_data.py` and `new_module.py`:

~~~python
# some_data.py
food = ["cake", "quinoa", "peas", "barley", "naan"]
planets = ["saturn", "mercury", "mars", "earth", "venus", "jupyter", "neptune"]
~~~

This module is importing data from the other:

~~~python
# new_module.py
from some_data import food, planets # to import multiple things, put commas between them

print(food)
print(planets)
~~~

See what happens when you run `new_module.py`.

Now let's try a different example: in the __More on Conditionals__ section you defined lists of `friends` and `family` in a module called `hangout.py` -- let's import them into a new module and run it:

~~~python
# new_module_2.py
from hangout import friends

print(friends)
~~~

You might have expected Python to simply print the list of friends, but it actually printed this:

~~~shell
You should hang out with James.
['Sandy', 'Ravi', 'Ivan']
~~~

Why did it do this? The answer has to do with how Python handles imports. When you import some function or list, the entire module actually gets import and all its code is run, but only the actual data that's been imported sticks around. However, because the functions stil get called, `You should hang out with James.` still gets printed to the terminal. If you want to prevent this from happening, you'll have to add some special Python syntax. At the bottom of `hangout.py` add the following line:

~~~python
if __name__ == "__main__":
    print("This module was called!")
else:
    print("This module was imported!")
~~~

Now when you run `new_module_2.py` you'll see `This module was imported!` be printed to the terminal. What's happening here is that the special `if __name__ == "__main__"` line is checking to see whether the module is being run directly (with `python hangout.py`) or if it's being importe from elsewhere. If the module is being run directly, the code under `if` gets run; otherwise the `else` code is triggered. If you remove the `else` block entirely, then nothing will be printed when the module is imported. Try it for yourself.

Later on I'll introduce `pip`, which is Python's _package manager_ and lets you install libraries that aren't even part of the standard library, like `requests` and `Flask`. But for now, let's explore another way to introduce data to our programs by parsing inpit directly.


## Parsing Input

So far all the data we've worked with has been _hard coded_ meaning that the values of variables, like `animals` are written in the code itself. But this isn't usually how software is written. If you write a program to convert Calsius to Fahrenheit, like we did in the __Variables__ section, you'll want new data (temperatures) to be added dynamically: you don't want to hard code the values into the program.

If you want to introduce new data to your program, one way of doing it is directly from the command line. Import the `sys` library in a new module called `arguments.py`:

~~~python
# arguments.py
from sys import argv

print(argv)
~~~

When you run this function, Python prints `['arguments.py']` to the terminal. What's happening here is that `arv` is a list of everything after `python` that you're typing in the command line. Instead of running this module in the normal way, try typing `python arguments.py apple` instead. Notice that `['arguments.py', 'apple']` now gets printed to the terminal. If you want to use this `'apple'` data somewhere in your code, you can parse the `argv` list and select the index of the data you care about:

~~~python
# arguments.py
from sys import argv

module_name = argv[0]
fruit = argv[1]

print(fruit)
~~~

When you run this program, `apple` gets printed to the terminal. Cool, right? But Python can do more than just read data from the command line, it can also read data from files, which brings us to the next section.


## Parsing Files

Another way to access data is by importing it. Let's say that we want to work with the text of _Invisible Cities_ in Python. First download it and write it to a file: `curl https://raw.githubusercontent.com/camoverride/get_into_tech/master/chapter_1/invisible_cities.txt > invisible_cities.txt`. Then create the below module in Python, which prints the first, third, and fourth lines from the book and then the number of lines:

~~~python
# Open a text file.
with open("invisible_cities.txt") as f:
    invisi_book = f.read() # Read the file as a long string

# Split the string into a list.
book_lines = invisi_book.split("\n")

# Print lines.
print(book_lines[0])
print(book_lines[3])
print(book_lines[4])
print(len(book_lines))
~~~

Two new concepts are being introduced here: the first is _reading from a file_ which is accomplished by the `with open` syntax, which is telling Python which file to open. This file is then being given a name as a Python variable, `f`. Then the file is being `read` as text.

`invisi_book` is a long string, with the newline character, `\n` being used to represent line-breaks in the text. The string method `split` converts the string to a list, where the list is split by the newline characters.

When you encounter some code like this, it helps to play with each part individually and `print` out things to see how they work. For instance, try printing out `f` and `invisi_book` to see what they look like: `invisi_book` will be a gigantic string that takes up most of your terminal screen.

To test your understanding, try to define a variable called `book_words` that is all the words from the book.


## For Loops

Our programs are ultimately text: symbols on our computer screens. The output of the programs we'll create in this chapter are also going to be text: things printed to the terminal or written to files. But so far the amount of text we've output hasn't been any greater than the amount of text we've put in: short programs producing small amounts of text. But the whole point of programming is that you can write a little and represent a lot. Instead of writing ten print statements to print ten things, can't we just write one print statement and ask our computer to execute that command? Absolutely! When we repeat something over and over, it’s called a loop, and the next sections cover the two types of loops that appear in Python: _for loops_ and _while loops_.

A for loop takes a set of data (like a list) and does something to every member of that set. In the code below, the for loop iterates over all the pooches in the list of dogs, printing each one:

~~~python
dogs = ["husky", "poodle", "corgi", "blood hound"]

for dog in dogs:
    print(dog)
~~~

You might be wondering where the variable `dog` came from? `dogs` is the name of the list, but we never declared a variable called `dog` anywhere. Maybe Python is super smart, and knows that dogs is the plural version of dog... but don't overestimate your computer. The variable `dog` is an arbitrary variable name declared inside the for loop (you could give this variable any name you want to), and every item that gets looped over is referred to as `dog`. That's right: `dog` is different every time the loop executes: on the first loop `dog` equals `"husky"`, on the second it's `"poodle".`

This loop executes four times. Let's walk through the first two steps of this four-animal loop together:

- First, on line 1, Python sees that `dogs` is a variable and that it refers to a list of four things.
- Next, on line 3, Python sees that there is a for loop, and that it will be looping over the list `dogs` and that each of the items in this list will be called `dog`.
- The first item in the list is `"husky"`. Python sets `dog` equal to `"husky"`. Now the indented part of the code fires: `print(dog)`, which prints `husky` to the terminal.
- Then Python does a quick check to see whether `"husky"` is the last item in the list `dogs`. It isn't, so Python moves on to the next item, `"poodle"`.
- Python sets `dog` equal to `"poodle"`, and executes the indented code: `print(dog)`, which prints `poodle`.
- Then Python does a quick check to see whether `"poodle"` is the last item in the list `dogs`. It isn't, so python moves on to `"corgi"`... etc. until the entire list is exhausted.

This is how Python iterates over the entire list, running the `print` function on every item. But the variable `dog` doesn't need to be referenced. We can do some task for every item in the list, but we don’t necessarily need to interact with the item itself. For instance, for every bug in my apartment, I can chase it down and kill it `kill(bug)`. But I can also do something that doesn't involve bugs, such as: for each bug in my apartment, hide under my blankets. Let's just print out the phrase I love dogs for every dog in the list:

~~~python
for lovely_dog in dogs:
    print("I love dogs")
~~~

What if instead of iterating over a list of data, you just want to run some task a certain number of times? `range` is a function that automatically produces a list of numbers. For instance, `range(5)` is very similar to `[0, 1, 2, 3, 4]` (the difference is that the items in range can't be accessed like they can in a list, but you can easily convert it to a list: `list(range(5))`).

How do we print the first twenty numbers? It's easy:

~~~python
for num in range(20):
    print(num)
~~~

Great! Now we can iterate over lists (like `dogs`) and `range`. Let's throw some flow control into the mix. In the below example, we import _Invisible Cities_, turn it into a list of lines, and iterate over the list, printing every line that contains the phrase "Kublai Khan":

~~~python
with open("invisible_cities.txt") as f:
    book_file = f.read()

book_lines = book_file.split("\n")

# Iterate over every item in `book_lines`, printing the lines with "Kublai Khan"
for line in book_lines:
    if "Kublai Khan" in line:
        print(line)
~~~

Do you know what this function reminds me of... `grep`! That's right, Python can search and edit text as well. But it can do a lot more. Let's do some math.

What if we want to identify which numbers are even or odd. How do we do that? Remember that special remainder function from the math section, `%`? This operator gives us the remainder when we divide two numbers. When we divide a number by `2`, its remainder will be `0` if the number is even, and `1` if the number is odd. Let's try to put that in code.

~~~python
for num in range(1, 14):
    if num % 2 == 0:
        print(f"{num} is even")
    else:
        print(f"{num} is odd")
~~~

In the section on lists, we learned that a list can contain different types of data. But let's say that we have a list of numbers and want to find the largest number in the list. How would we do that? One approach might be to set some very small value like `greatest = -99999` and check whether each number in the list is greater than greatest. If it is, that number becomes the new greatest until a larger number is encountered:

~~~python
numbers = [1, 9, -443, 15.3, 1950389, -9, 17.343, 0.45451]

greatest = -99999

for num in list:
    if num > greatest:
        greatest = num

print(greatest)
~~~

There’s a problem with this approach though. If the largest number is smaller than `-99999`, it will give the wrong answer. A better approach is to set greatest to the first item in the list: greatest = `numbers[0]`.

But conditional statements aren't always the answer to everything. An even better approach is to use the built-in sorted function to sort from least to greatest and then take the last number in the sorted list:

~~~python
print(sorted(numbers[-1]))
~~~

However, the best approach is to simply use the built-in `max` function, which returns the largest number from a list:

~~~python
print(max(numbers))
~~~

Now that we've learned about for loops, let's do something practical with them.


## Fizzbuzz

Let me set the scene for you: you're in a small office overlooking downtown San Francisco with an awkwardly-dressed man in his late 20's. He’s chewing the end of a pencil, not entirely sure how he should interview you. He's sweating a little bit, but you're not sure if that’s because the AC is broken or whether he's just as nervous as you are. You're nervous because it's your first technical interview ever, but you're also really excited about the _junior full-stack developer_ job you're interviewing for. After a couple minutes of smalltalk during which he asks you about your favorite programming language (Python), your educational background (B.A. in Biology), and why you're interested in the role (some bullshit neither of you will remember), he pulls out a computer with Sublime text editor open (ick, you prefer VS Code) and asks you've ever heard of _Fizzbuzz_.

_No, you've never heard of Fizzbuzz_, and you ask him to explain what that means (always ask for explanations!). Fizzbuzz, he tells you, is a test he likes to give all junior developers to see whether they can do basic coding. It doesn't help distinguish between the amazing programmers and the crappy programmers, but it does distinguish between non-programmers and people who've learned the basics. After getting this far in the book, you're ready for Fizzbuzz.

Here's how it works: print out all the numbers between one and one hundred. If the number is divisible by 3, print the number along with the word _fizz_. If the number is divisible by 5, print the number along with _buzz_. If the number if divisible by both 3 and 5, print the number along with _fizzbuzz_.

This simple problem ties together some of the important concepts we've learned in this chapter: looping, flow control, printing, and math. Can you think of how you'd solve this problem? Don;t look at the code below until you've given it a little thought. Maybe even take out a pencil and paper and write down the gist of the program. Once you've done all that, you can peek at the solution:

~~~python
for num in range(1, 100):
    if num % 3 == 0 and num % 5 == 0:
        print(num, "fizzbuzz")
    elif num % 3 == 0:
        print(num, "fizz")
    elif num % 5 == 0:
        print(num, "buzz")
    else:
        print(num)
~~~

If you were able to produce this code (or something close to it) or are able to fully understand this code, then congrats, you're no longer a non-programmer! Even though we haven't even finished the basics (_while loops_, _dicts_, _function declarations_, etc.), you're well on your way to becoming a coder.

In the next section we'll explore _while loops_, which are a different approach to looping.


## While Loops

A while loop executes as long as a condition is true. This is very different from a for loop which loops over some data like a list until it's exhausted. For instance, in the _fizzbuzz_ example, we know that the for loop will only execute 100 times. In the section before last, when our for loop iterated over `dogs`, we knew that it would stop when the last `dog` was accessed. But a while loop isn't guaranteed to stop. Try executing this problematic piece of code:

~~~python
sentinel = 1
while sentinel < 10:
    print("looping")
~~~

Oh no! I tricked you. Your Python program is stuck in an infinite loop! An infinite loop is what happens when a loop executes and will never end (_Infinite Loop_ is also the name of Apple's former corporate headquarters, perhaps an ill-advised name for a technology company). `sentinel` is equal to `1`, and `1` is always less than `10`, which means that the program will print `looping` forever!

To exit this infinite loop, you'll have to kill the Python script from the terminal. You can do that by pressing _CTRL + C_. If that doesn't work, you'll have to close your Terminal program.

After you're done extricating yourself from that dilemma, you'll want to learn how to avoid infinite loops in the future. One way to avoid infinite loops is to favor for loops over while loops. But sometimes while loops are more useful.

Generally, you avoid infinite loops by incrementing some value each time Python enters the loop. In this case, we can simply increment sentinel each time by changing its value to its previous value plus `1`:

~~~python
sentinel = 1
while sentinel < 10:
    sentinel = sentinel + 1
    print("looping")
~~~

This will print `looping` exactly 9 times. The syntax `sentinel = sentinel + 1` is a bit clunky -- all we want to do is add `1` to the value of sentinel. This can be rewritten as `sentinel += 1`.

Let's say that you have a long list of animals that you really love. But love is finite -- you only have time to love the first three animals in your list. How would you print the names of the first three animals from a list of animals that is of variable length (three or longer)?

~~~python
animals = ["turkey", "coyote", "duck", "ostrich", "snake"] # list could be longer

num_animals_to_love = 3

i = 0
while i < num_animals_to_love:
    print(f"I love {animals[i]}")
    i += 1
~~~

Remember, items in a list can be accessed by their index, which is a number starting at 0 and ending at the length of the list (minus 1). When this loop is first entered, `i` is equal to 0, meaning that `animals[0]` is accessed, which is `"turkey"`. The second time through the loop, `animals[1]` is accessed (`"coyote"`). The third time through `animals[2]` is accessed (`"duck"`). At the start of the fourth iteration through the loop, `i` is compared with `3`. Because `i` is no longer smaller than `3`, the conditional statement isn't true, and the loop exits.

_Python style suggestion_: the example above illustrates how while loops can function, but there's actually a better way to iterate through the first 3 items in the `animals` list, and it involves selecting a _slice_ of the list and then using a for loop. Try to see if you can make that work. Once you've tried that, take a look at the solution, below:

~~~python
animals = ["turkey", "coyote", "duck", "ostrich", "snake"]

num_animals_to_love = 3

for animal in animals[:num_animals_to_love]:
    print(f"I love {animal}")
~~~


## Loops Inside of Loops

In this short section I want to make sure you fully understand how for loops work by showing you that it's possible to loop over two datasets at the same time:

~~~python
nums_1 = [1, 3, 5]
nums_2 = [4, 6, 1, 5]

for num_1 in nums_1:
    for num_2 in nums_2:
        print(num_1, num_2)
~~~

When you have a loop inside a loop, you're essentially pairing together every combination of points from the two lists. If your first list has a length of 3 and your second list has a length of 4 (like above) you're making _3 * 4 = 12_ comparisons. Study the output from this function and make sure you understand how it's similar to the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product).


## Functions

In the section __Variables__ we learned how to convert the _Celsius to Fahrenheit_ function into a Python program. In mathematical notation, this function was named _Temp(F)_ and was defined as being _Temp(C) * 9/5 + 32_:

~~~python
# Program to convert Celsius to Fahrenheit.
temp_cel = 21
temp_fah = (temp_cel * 9/5) + 32
print(temp_fah)
~~~

But ideally we don't want our programs to look like this. We want a function that simply accepts a number in Celsius and spits out a number in Fahrenheit. Its inner workings don't need to be exposed to the world. In Python, we define a function with the special word `def`, and follow it by the name of the function and then parentheses with the names of variables that it accepts. This is how you would define the _Celsius to Fahrenheit_ function in Python and then execute it:

~~~python
def cel_to_f(temp_cel):
	print((temp_cel * 9/5) + 32)

cel_to_f(21) # prints 69.8
~~~

In line 1, the name of the function and its arguments are defined. These names can be anything you want. For instance, you could decide to call the function the more verbose `celsius_to_fahrenheit` and name its single input variable `temp_in_celsius`. In line two the function is told to do something: `print` the result of our _Celsius to Fahrenheit_ equation to the terminal. However, because this function is merely being defined -- not executed -- it doesn't actually print anything. This is the difference between making a toaster and making toast in a toaster. In line 4 the function is actually executed (making toast!) and it's given the argument `21`. When the function is executed, the variable `temp_cel` is set as `21`, and then plugged into the equation before being printed.

Functions should have _documentation strings_ (doc strings) that tell you what they do and how they work. The amount of text in a docstring is often longer than the code in the function itself, so don't worry about feeling verbose. In Python, block quotes are often used for docstrings:

~~~python
def cel_to_f(temp_cel):
    """
    This function accepts a temperature in Fahrenheit, `temp_cel`, as input.
    It converts the input to Celsius and prints the result to the terminal.
    Input: temp_cel, a float or an integer.
    Output: prints to the terminal.
    """
	print((temp_cel * 9/5) + 32)
~~~

If I want to run this function a few times with different values of `temp_cel` to see the output, I can put this function into a loop:

~~~python
values_to_convert = [21, 34.5, 11.5, -0.4, -33.2, 19.09]

for temp in values_to_convert:
    cel_to_f(temp)
~~~

Functions can accept more than one variable. Let's see how that works by defining a function called `multi_add_2` which accepts two numbers, multiplies them together, adds 2, and prints the result. Run this function with different values to make sure you understand how it works:

~~~python
def multi_add_2(a, b):
    multi = a * b
    print(multi + 2)
~~~

Instead of printing some output, functions can _return_ some value. When a function returns something, that means that the function actually becomes that value. Let's edit our temperature converting function so that it uses the `return` statement instead of printing:

~~~python
def cel_to_f(temp_cel):
    """
    This function accepts a temperature in Fahrenheit, `temp_cel`, as input.
    It converts the input to Celsius and returns it
    Input: temp_cel, a float or an integer.
    Output: a float.
    """
	return (temp_cel * 9/5) + 32

converted_temp_1 = cel_to_f(21.05)

print(converted_temp_1)
~~~

Notice that on line 10 `converted_temp_1` is being assigned the value `cel_to_f(21.05)` -- this works because the result of running `cel_to_f` on some number is another number (check out how the docstring has changed as well).

If you don't believe what's happening here, we can always sanity-check ourselves using Boolean logic like we learned in the __Testing for Truth__ section:

~~~python
cel_to_f(21.05) == 69.89 # prints True
~~~

In high school math, you probably learned that functions are supposed to return numbers. For instance, the function _f(x)_ where _f(x) = mx + b_ accepts _x_ and outputs some value. (In more complicated math, you might have learned that functions can also return lists of numbers (linear algebra) or other functions (calculus)). Anything that isn't returned by a function is called a _side-effect_ of the function. For instance, we can add a `print` statement to our `cel_to_f` function that gets printed whenever the function is run:

~~~python
def cel_to_f(temp_cel):
    """
    This function accepts a temperature in Fahrenheit, `temp_cel`, as input.
    It converts the input to Celsius and returns it
    Input: temp_cel, a float or an integer.
    Output: a float.
    """
    print("The function was executed!")
	return (temp_cel * 9/5) + 32

converted_temp_1 = cel_to_f(21.05)

print(converted_temp_1)
~~~

Enter the above code in a module and execute it. This is what should show up on your terminal:

~~~shell
The function was executed!
69.89
~~~

Our `print` statement and the converted temperature are both output. But what happens if we add this line to the end of the program: `converted_temp_2 = cel_to_f(7.37)`? This is the output:

~~~shell
The function was executed!
69.89
The function was executed!
~~~

Why doesn't the value of the function get printed as well? That's because the statement `The function was executed!` is produced whenever the function is run -- but nowhere in the function definition does it say to print the converted temperature value: for that you have to print the result of running the function.

Let's return to our `multi_add_2` function. What happens when we declare some variable to be equal to the execution of this function, and then print that result?

~~~python
def multi_add_2(a, b):
    multi = a * b
    print(multi + 2)

answer = multi_add_2(3, 5)

print(answer)
~~~

What gets printed to your terminal are the lines `17` and `None`. We know where `17` came from: it was printed from the function when `answer = multi_add_2(3, 5)` was declared. But how about `None`? Well, functions all have to return _something_, and when you don't explicitly give a function a `return` statement, then `None` gets returned. That's right, in the above code block `answer` equals `None`.

Remember from the __Math__ section, where I mentioned that dividing by zero in Python throws a `ZeroDivisionError`? If we want to avoid throwing errors when we divide by zero we can define a new function:

~~~python
def zero_division(a, b):
    """
    This function divides a by b, returning 0 if b equals 0. This helps us handle ZeroDivisionError.
    Inputs:
        a, a float or integer.
        b, a flaot or integer.
    Output:
        A float, or the integer 0 in the case of zero division.
    """
    if b == 0:
        return 0
    else:
        return a / b
~~~

But what if we want to be able to specify an alternative value to return when we divide by zero? We can add another argument that has a default value:

~~~python
def zero_division(a, b, zero_val=99999):
    if b == 0:
        return zero_val
    else:
        return a / b

print(zero_division(5, 0)) # Leaves the default value at 99999

print(zero_division(5, 0, 100)) # Changes the default value to 100

print(zero_division(5, 0, zero_val=100)) # Changes the default value to 100, explicitly naming the argument.
~~~

Default values for argument variables allow our programs to have added flexibility: we can let `zero_division` keep its normal `zero_val`, or we can pass in another default value if we have some kind of special case.

Now that we understand how to write functions, we’'ll introduce one more important data structure before ending the chapter.


## Dicts

A dict (dictionary) is a data structure that maps a list of keys to a list of values. For instance, in a mapping between countries and populations, the key might be the name of the country, and the value might be the population in millions. You can also visualize this as a spreadsheet with two columns: the keys as the left column and the values as the column on the right. A `dict` in Python is wrapped in curly brackets and has a colon separating the keys (on the left) from the values (on the right):

~~~python
population_data = {"USA": 326, "Canada": 37, "China": 1386, "Germany": 83}
~~~

To make this easier to read, we can spread this dict across a few lines:

~~~python
population_data = {
    "USA": 326,
    "Canada": 37,
    "China": 1386,
    "Germany": 83
}
~~~

If we want to get the value for a specific key, we give it to the dict inside of square brackets. Try printing this out yourself:

~~~python
population_data["USA"]
~~~

Unlike a list, dicts have no inherent order. It makes no sense to ask for the first item in `population_data` -- a query like `population_data[0] `raises an error (unless `0` is the name of a key).

To add something to a dict, we just need to set a new key with its corresponding value:

~~~python
population_data["Japan"] = 127
~~~

If we want to see all the keys or values of a dict, we can use the two dict methods, `keys()` and `values()`:

~~~python
population_data.keys()
population_data.values()
~~~

As you might have guessed from the examples above, dicts are extremely useful for storing data.

Just like lists, you can iterate over the _keys_ in a dict. The program below iterates over the keys in `population_data` and prints each value. It does this by inserting the key into `population_data` at every step:

~~~python
for k in population_data:
    print( population_data[k] )
~~~

We can modify this program to make it a little bit more informative. Below, the program prints both the key (the name of the country) and its corresponding value (population):

~~~python
for country in population_data:
	print(f"The population of {country} is {population_data[country]} million.")
~~~

Dicts are an extremely useful data structure. Unlike a list which is simply an ordered array of data, each value in a dict has a corresponding key. Dict-like structures appear in almost all programming languages, where they are usually called hash tables or hash maps.

Let's end this chapter by writing a program that incorporates some of the core programming techniques we've learned so far: lists, dicts, functions, loops, and logic. If you've paid attention so far, you should be able to understand how this program works!

~~~python
# A list of countries and a list of those countries populations in millions.
countries = ["USA", "Free City of Danzig", "Spain", "Kyrgyzstan", "Burkina Faso", "Monaco", "Abkhazia"]
populations = [328.2, 0.36, 46.94, 6.32, 19.75, 0.038, 0.245]

# Read the populations into a dict data structure.
country_pops = {}
for country, population in zip(countries, populations):
    country_pops[country] = population

# Define a function to print certain country information.
def filter_country_data(country_data, pop_minimum=15.00):
    """
    This function accepts a dict of country population data and returns a dict where
    the populations of the countries are all above `pop_minimum`.
    Inputs:
        country_data, a dict of data where keys are country names and values are floats/ints.
        pop_minimum, a float
    Outputs:
        a dict
    """
    filtered_countries = {}
    for country in country_data:
        if country_data[country] > pop_minimum:
            filtered_countries[country] = country_data[country]
    
    return filtered_countries

countries_over_15_million = filter_country_data(country_pops)

print("Let's learn about the world's most populous countries...")
for nation in countries_over_15_million:
    print(f"There are {countries_over_15_million[nation]} million people in {nation}")
~~~

And that's it! You know how to code!


## The Big Picture

This chapter covered all the basic building blocks of the Python programming language. When you think about how to solve programming problems, you will have to think in terms of _lists_, _dicts_, _conditionals_, _loops_, and _logic_. These are the raw ingredients that you'll use to build your programming tools, and those will solve real world problems.

If you've understood all of the concepts in this chapter you can safely claim that __you know how to code__. Congrats! However, knowing how to code is very different from actually building software. Building software will usually require working with multiple Python modules, reading and writing data, handling errors, importing useful libraries of tools, version control, and creating numerous functions that get applied at different points in your code. The concepts you learned in this chapter were like learning how to spell. But learning how to spell alone isn't enough to write a book. However, now that you have a strong foundation in coding fundamentals, you're free to go and explore the world of tech!
