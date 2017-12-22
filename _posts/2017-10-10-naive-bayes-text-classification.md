---
layout: post
title: Text Classification from Scratch
categories: [data, verbose]
comments: true
published: true
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>


In this article, I'm going to build a text classification application from scratch. This will involve (1) constructing a corpus, (2) creating a language classifier, and (3) deploying the application to the web. Along the way, I'll explore some of the interesting properties of Bayes Theorem, feature hashing, and database design.

## Building a Corpus
...



## Classification
Naive Bayes classifiers are a family of classifiers that take inspiration from Bayes' Theorem. Most people like to memorize Bayes' theorem and go from there, but I find that it's more useful to derive Bayes' theorem instead, as it sheds some light on how the pieces fit together. This is especially important when we need to fiddle with the prior probability (which the nature of our corpus will force us to do).

We can think of the probability of A given B as being equivalent to the probability of the intersection of [A and B](https://en.wikipedia.org/wiki/Logical_conjunction#/media/File:Venn0001.svg) divided by the probability of B, where the probability of B is further equivalent to the intersection of A and B plus the intersection of [B and not A](https://en.wikipedia.org/wiki/Boolean_algebra#/media/File:Vennandornot.svg) (I've linked Venn Diagram illustrations of these logical functions):

$$ P(A | B) = {\dfrac{P(A \cap B)}{P(B)}} = {\dfrac{P(A \cap B)}{P(A \cap B) + P(B \cap ¬A)}} $$

The formula above is implemented with logic, but it's more useful to convert this to math so that we can play around with specific quantities. The intersection of two sets, A and B, is the same as the probability of B given A multiplied by the probability of A. The middle section below is the canonical form of Bayes' Theorem:

$$
P(A | B) = {\dfrac{P(B|A) \cdot P(A)}{P(B)}} = {\dfrac{P(B|A) \cdot P(A)}{ P(B|A) \cdot P(A) + P(B|¬A) \cdot P(¬A)  }}
$$

The intuition behind Naive Bayes is quite simple. Let's say we have three documents, one is English and contains \["auld", "man", "girl"\] and the other two are Scots and are \["the", "auld"\] and \["auld", "auld"\] (Not the most realistic data, but it'll suit our purposes.) If we are judging the input sentence \["auld"\] (a vector of words containing only one element), then the probability of this belonging to Scots is:

$$
P(Scots|auld) = {\dfrac{P(auld|Scots) \cdot P(Scots)}{P(auld)}} = 
\cfrac{3/4 \cdot 2/3}{3/4 \cdot 2/3 + 1/4 \cdot 1/3} = \cfrac{6}{7}
$$

Intuitively, this result makes sense. Three out of four times, the word "auld" appears in Scots, and documents labeled "Scots" occur more frequently than documents in the "English" category.

If you paid attention to the way that the data was collected, you might think that the division of text into different documents was a bit arbitrary. When filtering emails, it makes sense to keep track of what proportion of incoming mail was labeled spam. This is because the spam model and the spam corpus exist in the same environment. In our case, the environments won't match. We are not randomly selecting a Wikipedia article and guessing the language. Instead, users will input snippets of text to learn what language it is in. There are 5,535,380 English Wikipedia articles at the time of this writing, but only 48,228 in Scots. If we were to take the prior probabilities of an article being in English vs Scots, we would be more than a hundred times more likely to identify it as English, all other things being equal. Because of that, we might want to rethink our prior.

Because there are two Scots articles in our toy corpus and only one in English, this means that the prior for Scots is 2/3. We can relax the prior that word the number of documents is meaningful, which is equivalent to collapsing all the Scots documents in one mega-document (and likewise for English):

$$ \cfrac{3/4 \cdot 1}{3/4 \cdot 1 + 1/4 \cdot 1} = \cfrac{3}{4} $$

Notice that now our conditional probabilities are equivalent:

$$ P(Scots|auld) = P(auld|Scots) $$

This is convenient






prior = P(Scots)


If we want to know the likelihood that a specific word belongs to a specific category,


mention generative, category first







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
