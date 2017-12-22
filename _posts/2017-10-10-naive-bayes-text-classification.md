---
layout: post
title: Text Classification from Scratch
categories: [data]
comments: true
published: false
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$
$$\alpha$$

<h1>header</h1>
In this article, I'm going to build a text classification application from scratch. This will involve (1) constructing a corpus, (2) creating a language classifier, and (3) deploying the application to the web. Along the way, I'll explore some of the interesting properties of Bayes Theorem, feature hashing, and database design.

## Building a Corpus




## Classification
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
