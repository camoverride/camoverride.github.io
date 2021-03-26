---
layout: post
title: Text Generation
excerpt: How do automatically generate text?
categories: [data]
comments: true
published: false
---

https://stackoverflow.com/questions/616292/is-it-possible-for-a-computer-to-learn-a-regular-expression-by-user-provided-e
https://www.import.io/post/neural-nets-how-regular-expressions-brought-about-deep-learning/

word vectors and representations (1-hot, tfidf)
    what is representation?
    Plato's Republic (metaphor for cognition)
    how do people represent the world around them? Examplars? small number of examples?
        attributes: apple = small, circular, red? Or apple is similar to apple_examplar (cognitive science)
    distributional hypothesis (for word vectors)
        where does meaning come from?



https://www.youtube.com/watch?v=224plb3bCog
BLOG POST: sentence generation
https://en.wikipedia.org/wiki/Stochastic_matrix

How do we have a computer generate sentences that sound like a human?
    randomly select words
    randomly select sentences
        not random enough!
    randomly select chunks of words
    Markov!
        examples:
            chess board -- all you need to make the next move is the current state of the board
            non-example -- fibonacci sequence: you need the previous two states
    Markov with bigrams
    another approach Markov with "frames" (madlibs)
    difference between markov process and finite state automaton
        FSA -> possible ways to pay 25cent parking meter
            "legal sentence" = 10 + 5 + 10
        ---> equivalent to, possible ways to make a sentence
            "legal sentence" = NP VP
        Markov transitions are random, FSA transitions are "you choose" (i.e. the speaker chooses)
            if you randomly choose transitions from a chomsky grammer, you get a "frame" you can fill in with words
        recursion in Markov is simple -> recursion in chomsky can be right-recursive or left-recursive
        http://arrow.cs.nott.ac.uk/computerphile/chomsky-handout.pdf
        analogous to different orders of logic: zeroth, first, second,
    what if every word in a sentence is "mad lib" -> generative grammar
    select random word from each noun type sounds bad
        markov property is a "proxy" for detecting grammar Rules
        for instance, if you know that in English: NP -> Det N, and "the" is a Det, then anything following "the" must be NP
    create a grammar
    back to context: RNN's