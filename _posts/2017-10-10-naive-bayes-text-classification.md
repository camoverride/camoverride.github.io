---
layout: post
title: Text Classification from Scratch
categories: [data]
comments: true
published: false
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>


In this article, I'm going to build a text classification application from scratch. This will involve (1) constructing a corpus, (2) creating a language classifier, and (3) deploying the application to the web. Along the way, I'll explore some of the interesting properties of Bayes Theorem, feature hashing, and database design.

## Building a Corpus
...



## Classification
Naive Bayes classifiers are a family of classifiers that take inspiration from Bayes' Theorem. Most people like to memorize Bayes' theorem and go from there, but I find that it's more useful to derive Bayes' theorem instead, as it sheds some light on how all the pieces fit together. This is especially important when we need to remove the prior probability from the equation (which we'll have to do to make out model more valid).

We can think of the probability of A given be as being equivalent to the probability of the intersection of A and B divided by the probability of B:

$$
P(A | B) = P(A \cap B)/P(B)
$$












///////
Bayes is a Generative algorithm
Discriminative = looking at everything, fitting a line between things
Generative = looking at one category, modeling that category first

no need to divide into texts, as the class prior isn't relevent here, p(y) = p(english)


## issues
how to reduce dimensions?
    - use hashing trick

how to store data?
    - in memory? database?

what features to look at?
    - bigrams?
    - unicode representation?

double hash?
