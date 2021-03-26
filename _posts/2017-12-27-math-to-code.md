---
layout: post
title: Math to Code
categories: [code]
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

This is not meant to be a reference manual or encyclopedia. Instead, this document is intended to give a general overview of mathematical concepts and their relationship with code. All code snippets were typed into the interpreter, so I am omitting the canonical `>>>`.

<!--more-->

## Table of Contents

1. [Sequences](#sequences)
    - [Finite Sequences](#finite-sequences)
    - [Infinite Sequences](#infinite-sequences)
2. [Series](#series)
    - [Series Summation](#series-summation)
    - [Series Product](#series-product)
3. [Sets](#sets)
    - [Union](#union)
    - [Intersection](#intersection)
    - [Difference](#difference)
    - [Complement](#complement)
    - [Ordered n-Tuple](#ordered-n-tuple)
    - [Cartesian Product](#cartesian-product)
4. [Logic](#logic)
    - [Universal Quantifier](#universal-quantifier)
    - [Existential Quantifier](#universal-quantifier)
    - [Implication](#implication)
    - [Biconditional](#biconditional)
    - [Negation](#negation)
    - [De Morgan's Theorem](#de-morgans-theorem)
5. [Calculus](#calculus)
    - [Integrals](#integrals)
    - [Gradients](#gradients)
    <!-- - [Gradient Descent](#gradient-descent)-->
<!--    - [Optimization](#optimization)-->
<!--6. [Statistics](#statistics)-->
<!--  [Kolmogorov's Axioms](#kolmogorovs-axioms)-->
<!--    - [Maximum Likelihood Estimators](#maximum-likelihood-estimators)-->
<!--7. [Functions](#functions)-->
<!--    - [Vector-Valued Functions](#vector-valued-functions)-->
<!--   - [Anonymous Functions](#anonymous-functions)-->


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

An infinite sequence is analogous to a stream in computer science. In Python, generators exhibit streaming behavior and can imitate the behavior of an infinite sequence. Unlike lists, generators do not store a collection of values. Instead, they generate their values only when needed. Because a computer's memory is not infinite, a list can never imitate the behavior of an infinite set. The generator below produces odd numbers:

~~~python
def odd_numbers():
    i = 1
    while True:
        yield i
        i += 2
~~~

In math, infinite sequences and series also have cardinality. For instance, the cardinality of the natural numbers is $$\aleph_0$$ and the cardinality of the real numbers is $$\mathfrak{c}$$. One of Georg Cantor's surprising discoveries was that the set of all positive odd numbers has the same cardinality as natural numbers (intuitively, it seems like there are twice as many natural numbers as there are odd numbers). This is because infinite sets are not measured by counting their elements -- after all, that would be futile, because you'd go on counting forever. Instead, infinite sets are measured by the functions that generate them. If a function can be lined-up 1:1 with the natural numbers, then it has the same cardinality as the natural numbers, $$\aleph_0$$, and is called "countably infinite". There are some sets that are *uncountably infinite* (more on that in a second).

Given a generator that produces the natural numbers, we can create a second function that gives us the odd numbers by chaining them together, demonstrating that these sets have the same cardinality:

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

I'm not a professional mathematician, but my failure to think of a function that gives us the real numbers seems to be evidence that the cardinality of the real numbers is strictly greater than the cardinality of the natural numbers. Apart from a before-the-fact specification of our accuracy (e.g., limiting numbers to 100 digits), it seems like this problem is intractable. In other words, you can translate countably infinite sequences from math to programming, but uncountable sets are trickier.

(If anyone has any insight into this problem, please send me an email, as I'm very curious to hear more.)


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


## Sets
### Union

Given a set A and a set B, the union of A and B is the set of items from either or both sets:

$$
A = \{1, 2, 3, 10, 11\} \\
B = \{1, 3, 7, 9\} \\
A \cup B = \{1, 2, 3, 7, 9, 10, 11\}
$$

The direct equivalent in Python is:

~~~python
A = {1, 2, 3, 10, 11}
B = {1, 3, 7, 9}
A | B # {1, 2, 3, 7, 9, 10, 11}
~~~

However, the above examples obscure union's relationship to logical OR:

$$
A \cup B = \{x : x \in A \hspace{1mm} or \hspace{1mm} x \in B \}
$$


### Intersection

The intersection of two sets is the set of items that belong to both sets. Using A and B from above:

$$
A \cap B = \{1, 3\}
$$

The Python equivalent is:

~~~python
A & B # {1, 3}
~~~

The set intersection is related to logical AND:

$$
A \cap B = \{x : x \in A \hspace{1mm} and \hspace{1mm} x \in B \}
$$

Which in Python is:

~~~python
{i for i in A if i in B} # {1, 3}
~~~


### Difference

The difference between set A = {1, 2, 3, 10, 11} and set B = {1, 3, 7, 9} are the items in A that are not in B:

$$
A - B = \{2, 10, 11\}
$$

The syntax in Python is very close to the set syntax:

~~~python
A - B # {2, 10, 11}
~~~

This can be expressed more verbosely as:

$$
A - B = \{x : x \in A \hspace{1mm} \cap \hspace{1mm} x \not\in B \}
$$

Which is equivalent to:

~~~python
{i for i in A if i not in B} # {2, 10, 11}
~~~


### Complement

The complement of A is everything in the universe, U, that is not in A. In our case, the universe will consist of $$U = \{1, 2, 3, 4\}$$, where $$A = \{1, 3\}$$:

$$
\bar{A} = \{2, 4\}
$$

Let's pretend that we don't know what the universe consists of, but instead we have access to sets which represent samples from that universe. Let those sets be A (above), $$B = \{1, 2\}$$ and $$C = \{4\}$$. The union of all those sets gets us as close to understanding the entire universe as we can get: $$ A \cup B \cup C = \{1, 2, 3, 4\}$$.

Assuming we have these sets set up in Python:

~~~python
U = A | B | C
complement_A = U - A # {2, 4}
~~~


### Ordered n-Tuple

An ordered n-tuple $$ <x_1, x_2, x_3, ... x_n> $$ is equivalent to a [list](#finite-sequences) in Python with n elements.


### Cartesian Product

For sets A and B, the Cartesian product is the set of all ordered pairs $$(a, b)$$ where $$a \in A$$ and $$b \in B$$. In set-builder notation, this is:

$$
A \times B = \{(a, b) \hspace{1mm} | \hspace{1mm} a \in \hspace{1mm} A \hspace{1mm} and \hspace{1mm} b \in B\}
$$

Let's say that $$A = \{a_1, a_2, a_3\}$$ and $$B = \{b_1, b_2\}$$, then $$A \times B$$ is:

$$
(a_1, b_1), (a_2, b_1), (a_3, b_1) \\
(a_1, b_2), (a_2, b_2), (a_3, b_2)
$$

In Python, this is:

~~~python
A = {'a1', 'a2', 'a3'}
B = {'b1', 'b2'}
{(a, b) for a in A for b in B} # {('a2', 'b2'), ('a3', 'b2'), ('a1', 'b2'), ('a1', 'b1'), ('a2', 'b1'), ('a3', 'b1')}
~~~


## Logic

Many of the symbols in logic are similar to those used when we talk about [sets](#sets). For instance, set [intersection](#intersection), $$\cap$$, is similar to the logical conjunction $$\wedge$$ (AND). And set [union](#union), $$\cup$$ is similar to the logical disjunction, $$\vee$$ (OR). These logical connectives are similar to what you see in sets.


### Universal Quantifier

The universal quantifier, $$\forall$$, means "for all." For instance, this formula:

$$
A = \{1,2,3,4,5\} \\
\forall x \in A \hspace{1mm} Q(x)
$$

When Q(x) is the statement "x is less than 50," this statement evaluates to True. If, on the other hand, Q(x) was "x is an odd number," this statement would be false, as 2 and 4 are not odd numbers.

This has a simple implementation in Python:

~~~python
A = {1,2,3,4,5}
def Q(i):
    assert i < 50

for i in A:
    Q(i) # nothing returns
~~~

But what if we change Q?

~~~python
def Q(i):
    # tests if the number is odd
    assert (i - 1) % 2 == 0
~~~

Now we get an `AssertionError`, indicating that the statement evaluates to False.


### Existential Quantifier

The existential quantifier symbol, $$ $$, means "there exists." For instance, the formula below means that there exists one number in the set $$A$$ such that condition $$Q$$ is met:

$$
A = \{1,2,3,4,5\} \\
\exists x \in A \hspace{1mm} Q(x)
$$

For instance, if $$Q(x)$$ is the statement $$x^2 = 25$$, then this is evidently true, as $$5 \times 5 = 25$$.

The Python translation of this would be to create a function, Q, that immediately returns true if it encounters any element that meets its criteria, otherwise it returns false:

~~~python
A = {1,2,3,4,5}

def Q(li):
    for i in li:
        if i**2 == 25:
            return True
    return False
Q(A) # True
~~~


### Implication

Arrows are used for implication. For the material implication (below), if A is true, then B is true too:

$$
A \Rightarrow B
$$

The Pythonic version of this is quite simple:

~~~python
A, B = True, True
if A:
    assert B

A, B = True, False
if A:
    assert B # AssertionError
~~~


### Biconditional

An arrow with two heads is the biconditional. $$A \iff B$$ means "A is true if and only if B is true." This is often written as "A iff B." The biconditional is equivalent to $$(A \Rightarrow B) \cap (B \Rightarrow A)$$.

In code, this would mean that before we evaluate A, we first need to check B:

~~~python
def biconditional(A, B):
    A = False
    if B == True:
        A = True
    return A
~~~

This function takes two arguments, A and B. A is returned as true if and only if B is true. This is done by first setting A to False before evaluating it.


### Negation

$$\neg A$$ means "not A" and is true only when A is false. This is easily understood in the context of an if-then statement:

~~~python
A = False
if not A:
    print('A was false') # A was false
~~~

Logical negation is similar to the set operation [complement](#complement).


### De Morgan's Theorem

De Morgan's Theorem relates the concepts of conjunction and disjunction (similar to [union](#union) and [intersection](#intersection), respectively) with [negation](#negation):

$$
\neg(A \vee B) = \neg A \wedge \neg B
$$

and

$$
\neg(A \wedge B) = \neg A \vee \neg B
$$

Logical negation is similar to the idea of a complement from set theory. If we consider the first statement, this means "everything not in A or B is equal to the intersection of everything not in A and everything not in B." If we have a universe, $$U$$, and two sets, $$A$$ and $$B$$, we can represent this in Python using the set operations listed in the [Sets](#sets) section:

~~~python
U = {1,2,3,4,5,6,7,8,9}
A = {1,2,3}
B = {3,4,5}
(U - A & U - B) == U - (A | B) # True
U - (A | B) # {8, 9, 6, 7}
~~~


## Calculus
### Integrals

Suppose we have a function, $$f(x) = sin(x)$$. The area under $$f(x)$$ from 0 to $$\pi$$ is represented by the blue region in this graph:

![sinx]({{ site.url }}/img/sinx.png){:height="36px" width="300px"}

Which can be written as an integral:

$$
\int_{0}^{\pi} f(x) = 2
$$

Integration in Python is simple:

~~~python
import scipy.integrate as integrate
from numpy import sin
pi = 3.14159
integrate.quad(lambda x: sin(x), 0, pi)
# (1.9999999999964795, 2.2204460492464044e-14)
~~~

In the tuple that gets returned, the first value is the integral and the second value is the upper bound on the possible error.

But what if we want to know the area under a graph with more than one dimension, like $$f(x, y) = sin(x) sin(y)$$?

![sinxy]({{ site.url }}/img/sinxy.png){:height="36px" width="400px"}

Let's say that we want to know the area under the curve of 0 to $$pi$$ on the y-axis and 0 to $$pi$$ on the x-axis. The solution is to take a double integral:

$$
\int_{0}^{\pi} \int_{0}^{\pi} f(x) \hspace{1mm} dy dx = 4
$$

In Python, you can use scipy's dblquad function. This takes as arguments a function to be integrated, a pair of bounds for the outer integral, and a pair of inner bounds wrapped in functions for the inner integral:

~~~python
from scipy.integrate import dblquad
def sines(x, y):
    return sin(x)*sin(y)
dblquad(lambda t, x: sines(t, x), 0, pi, lambda x: 0, lambda x: pi)
# (3.9999999999859175, 4.4408920984849916e-14)
~~~


### Gradients

I'm not going to cover single-valued derivatives here, because they're too simple. But what if you want to find the derivative of a vector-valued function with more than one argument? The gradient evaluated at a given point gives you some idea of a function's multivariable slope at that point. A gradient is a vector of a the partial derivatives of a function. Gradients are important in some Machine Learning algorithms. The gradient of a function, $$f$$, is written as $$\nabla f$$. The symbol $$\nabla$$ is called "nabla" or "del."

If we have a function $$f(x, y) = x^2 - xy$$, then:

$$
\nabla f
= \begin{bmatrix}  \frac{\partial}{\partial x} (x^2 - xy)  \\  \frac{\partial}{\partial y} (x^2 - xy)  \end{bmatrix}
= \begin{bmatrix}  2x - y \\ -x  \end{bmatrix}
$$

I recommend using the Python library [Theano](http://deeplearning.net/software/theano/index.html) for gradient operations:

~~~python
import numpy
import theano
import theano.tensor as T

x = T.dscalar('x')
y = T.dscalar('y')
z = x**2 - (x * y)
gy = T.grad(z, [x, y])
f = theano.function([x, y], gy)
# test out a value
f(1, 0) # [array(2.0), array(-1.0)]
~~~

This is congruent with the result:

$$
\nabla f(1, 0) = \begin{bmatrix} 2 \\ -1 \end{bmatrix}
$$


<!-- ### Gradient Descent -->

<!--### Optimization-->


<!--## Statistics
### Kolmogorov's Axioms
Consider a single coin-toss. $$(\Omega, F, P)$$ is a probability space, where $$\Omega$$ is the sample space, $$F$$ is the event space, and $$P$$ is the probability measure ($$P(\Omega) = 1$$).

$$
\Omega = \{H, T\} \\
F = \{ \emptyset, \{H\}, \{T\}, \{H, T\} \}
$$

$$\Omega$$ represents the possible outcomes of the coin-toss (Heads or Tails). $$F$$ represents all the possible events that can be defined on that space, e.g. $$\{T\}$$, which means "Tails was up," or $$\{H, T\}$$, which means "Heads or Tails was up." $$P(\{T\}) = 0.5$$ and $$P(\{H, T\}) = 1$$.

Let's say that instead of one coin toss, we toss the coin 4 times. The sample space will be all the possible sequences of results from flipping the coin. For instance, $$\Omega$$ will look like $$\Omega = \{HHHH, HHHT, HHTH, ...\}$$. What is the sizenew sample space?


What is the new event space?


log_2(x) = 4, solve for x, x = 16.

calculation of 2^n for events defined on outcome space-->

<!--### Maximum Likelihood Estimators

gaussian distribution, function input with semicolon-->


<!--## Functions
### Vector-Valued Functions

### Anonymous Functions-->
