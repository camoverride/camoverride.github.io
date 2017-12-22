---
layout: post
title: Sound Similarity
categories: [blog]
comments: true
published: true
---

It is easy to implement an overlap function in Python:

~~~ python
def overlap(langA, langB):
    langA = set(langA)
    langB = set(langB)

    intersection = langA & langB
    union = langA | langB

    return 1 - (len(intersection) / len(union))
~~~

This uses Tanimoto