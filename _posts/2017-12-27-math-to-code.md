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

1. [Sequences](#sequences)
    - [Sequence Summation](#sequence-summation)
    - [Sequence Product](#sequence-product)
    - [Infinite Sequences](#infinite-sequences)
2. [Calculus](#calculus)
    - [Derivatives](#derivatives)
    - [Integrals](#integrals)
    - [Gradient](#gradient)
    - [Gradient Descent](#gradient-descent)
    - [Optimization](#optimization)
3. [Statistics](#statistics)
    - [Maximum Likelihood Estimators](#maximum-likelihood-estimators)
    - [Kolmogorov's Axioms](#kolmogorovs-axioms)
4. [Sets](#sets)
    - [Union](#union)
    - [Intersection](#intersection)
    - [Difference](#difference)
    - [Complement](#complement)
    - [Ordered n-Tuple](#ordered-n-tuple)
    - [Cartesian Product](#cartesian-product)
    - [Countably Infinite Sets](#countably-infinite-sets)
5. [Logic](#logic)
    - [Universal Quantifier](#universal-quantifier)
    - [Existential Quantifier](#universal-quantifier)
    - [Implication](#implication)
    - [Biconditional](#biconditional)
    - [Negation](#negation)
    - [De Morgan's Theorem](#de-morgans-theorem)


6. [Functions](#functions)
    - [Vector-Valued Functions](#vector-valued-functions)
    - [Anonymous Functions](#anonymous-functions)


## Sequences
### Sequence Summation
Sigma (Σ) represents summation:

$$ \sum_{i=1}^{10} 2*i = 90 $$

Because Python is indexed from 0, in order to count from 1 to n, we count from 1 to n + 1:
~~~python
total = 0
for i in range(1, 11):
    total += 2 * i
~~~

Sums can also be linked together. When both sums are finite, order doesn't matter. This is extremely close to the idea of a for loop:

$$
\sum_{i=1}^{10} \sum_{j=1}^{3} i*j-1
$$

### Sequence Product

### Infinite Sequences


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


## Sets
Some of these are more accuratelt described as logical connectives. However, I find them easier to understand in terms of explicit set operations.
### Union
    A U B = { x | x  A U x  B } 

### Intersection

### Difference

### Complement

### Ordered n-Tuple

### Cartesian Product

### Countably Infinite Set


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


