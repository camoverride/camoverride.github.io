---
layout: post
title: Math to Code
categories: [blog]
comments: true
published: true
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        displayAlign: "left"
    });
</script>

When I'm trying to decipher some hairy math formula, I find it helpful to translate the equation into code. In my experience, it's often easier to follow the logical flow of a programming function than an equivalent function written in mathematical notation. This guide is intended for programmers who want to gain a deeper understanding of both mathematical notations and concepts. I decided to use Python as it's closer to pseudo-code than any other language I'm familiar with.

## Table of Contents

1. [Series](#series)
    - [Series Summation](#series-summation)
    - [Series Product](#series-product)
2. [Sequences](#sequences)
    - [Finite Sequences](#finite-sequences)
    - [Infinite Sequences](#infinite-sequences)
3. [Sets](#sets)
    - [Union](#union)
    - [Intersection](#intersection)
    - [Difference](#difference)
    - [Complement](#complement)
    - [Ordered n-Tuple](#ordered-n-tuple)
    - [Cartesian Product](#cartesian-product)
    - [Countably Infinite Sets](#countably-infinite-sets)
4. [Calculus](#calculus)
    - [Derivatives](#derivatives)
    - [Integrals](#integrals)
    - [Gradient](#gradient)
    - [Gradient Descent](#gradient-descent)
    - [Optimization](#optimization)
5. [Statistics](#statistics)
    - [Maximum Likelihood Estimators](#maximum-likelihood-estimators)
    - [Kolmogorov's Axioms](#kolmogorovs-axioms)
6. [Logic](#logic)
    - [Universal Quantifier](#universal-quantifier)
    - [Existential Quantifier](#universal-quantifier)
    - [Implication](#implication)
    - [Biconditional](#biconditional)
    - [Negation](#negation)
    - [De Morgan's Theorem](#de-morgans-theorem)
7. [Functions](#functions)
    - [Vector-Valued Functions](#vector-valued-functions)
    - [Anonymous Functions](#anonymous-functions)


## Series
### Series Summation
Sigma `Σ` represents summation:

$$ \sum_{i=1}^{10} 2i = 90 $$

Because Python is indexed from 0, in order to count from 1 to n, we count from 1 to n + 1:

~~~python
total = 0
for i in range(1, 11):
    total += 2 * i
~~~

Sums can also be linked together. When both sums are finite, order doesn't matter. This is extremely close to the idea of a for loop:

$$ \sum_{i=1}^{4} \sum_{j=1}^{2} ij^2 = 50 $$

Sums are evaluated from right to left. This means that the left-most sigma is the top-most nested loop:

~~~python
total = 0
for i in range(1, 5):
    for j in range(1, 3):
        total += i * j**2
~~~


### Series Product

The product of a series is represented by a capital letter pi `Π`:

$$ \prod_{i=1}^{4} i = 24 $$

This is similar to the code for summation, except that we initialize the total at one and multiply it by the expression currently being evaluated:

~~~python
total = 1
for i in range(1, 5):
    total *= i
~~~

Notice that this particular instance of summation is equal to $$ 4! $$

## Sequences
### Finite Sequences

A finite sequence is also called an n-tuple, where n is the length of the tuple:

$$
A = (1, 5, 10, 25, 50)
$$

The elements of a sequence can repeat and can be of any data type. Order is important in a sequence, and every element has an index. This is similar to a list in Python:

~~~python
A = [1, 5, 10, 25, 50]
~~~

Because a sequence is ordered, every element in the sequence has an index. For instance, the second element of the list is $$a_2$$, which is the same as `A[1]` in Python (remember, elements are indexed differently in math and computer science).

Let's say that we want to [sum](#series-summation) every element in a sequence:

$$
\sum_{i=1}^{n} a_i = 1 + 5 + 10 + 25 + 50 = 91
$$

To do this, we count from 1 to n, where 1 is the first list index and n is the final list index (=5).

The length of a sequence is also called its cardinality, which is often written as:

$$
|A| = 5
$$

And is equivalent to:

~~~python
len(A)
~~~

### Infinite Sequences

An example of an infinite sequence are the odd numbers:

$$
(1, 3, 5, 7,...)
$$

It's often more useful to specify a function that generates an infinite sequence than simply implying a function using $$...$$ (more on that at the end of this section):

$$
Odd = \{ 2k + 1 : k \in \mathbb{Z} \}
$$

In computer science, an infinite sequence is analogous to a stream. In Python, generators exhibit streaming behavior and can imitate the behavior of an infinite sequence. Unlike lists, generators do not store a collection of values. Instead, they generate their values only when needed. Because a computer's memory is not infinite, a list can never imitate the behavior of an infinite set. The generator below produces odd numbers:

~~~python
def odd_numbers():
    i = 1
    while True:
        yield i
        i += 2
~~~

In math, infinite sequences and series also have cardinality. For instance, the cardinality of the natural numbers is $$\aleph_0$$ and the cardinality of the real numbers is $$\mathfrak{c}$$. One of Georg Cantor's surprising discoveries was that the set of all positive odd numbers has the same cardinality as natural numbers (intuitively, it seems like there are twice as many natural numbers as there are odd numbers). This is because infinite sets are not measured by counting their elements -- after all, this would be futile, because you'd go on counting forever. Instead, infinite sets are measured by the functions that generate them. If a function can be lined-up 1:1 with the natural numbers, then it has the same cardinality as the natural numbers, $$\aleph_0$$.

Given a generator that produces the natural numbers, we can create a second function that gives us the odd numbers, demonstrating that these sets have the same cardinality:

~~~python
def natural_numbers():
    i = 1
    while True:
        yield i
        i += 1

def odds():
    for k in natural_numbers():
        yield 2 * k + 1

# if we iterate through odds(), we get odd numbers
for i in odds():
    print(i)
~~~

However, we cannot use our natural number generator to produce the set of real numbers. Think about it. Let's say that we start counting from 1. What is the first real number that comes after 1? It's got to be something very close to 1, like 1.01. Well, this isn't close enough, because 1.0001 is even closer. In fact, we can keep adding 0's and never stop (well, actually, our computer will eventually run out of memory and crash).

I'm not a professional mathematician, but my failure to think of a function that gives us the real numbers seems to be evidence that the cardinality of the real numbers is strictly greater than the cardinality of the natural numbers. Apart from a before-the-fact specification of our accuracy (e.g., we will have numbers with at most 100 digits), it seems like this problem is intractable. In other words, you can translate countably infinite sequences from math to programming, but uncountable sets get trickier.

(If anyone has any insight into this problem, please send me an email, as I'm very curious to hear more.)

<!--more-->

## Sets
Some of these are more accuratelt described as logical connectives. However, I find them easier to understand in terms of explicit set operations.
give example of element to test  {i | i elem k}

### Union
    A U B = { x | x  A U x  B } 

### Intersection

### Difference

### Complement

### Ordered n-Tuple

### Cartesian Product

### Countably Infinite Set










## Calculus
### Derivatives
second derivative, third, etc.

### Integrals
double integral...

### Gradient

### Gradient Descent

### Optimization


## Statistics
### Maximum Likelihood Estimators

### Kolmogorov's Axioms
calculation of 2^n for events defined on outcome space




## Logic
### Universal Quantifier

### Existential Quantifier

### Implication

### Biconditional

### Negation

### De Morgan's Theorem


## Functions
### Vector-Valued Functions

### Anonymous Functions


