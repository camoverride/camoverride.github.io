---
layout: post
title: Text Classification from Scratch
categories: [data]
comments: true
published: true
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>


In this article, I'm going to build a text classification application from scratch. This will involve (1) constructing a corpus, (2) creating a language classifier, and (3) deploying the application to the web. Along the way, I'll explore some of the interesting properties of Bayes Theorem, feature hashing, and database design. This application will let people enter blocks of text and will return the text's language.

## Building a Corpus
In order to perform language classification, a data source is needed. A good source will have a large amount of text and accurate category labels. Wikipedia seems like a great place to start. Not only do they have a well-documented API, but it allows for language-specific querying. I'm going to challenge myself by choosing two languages that machine learning algorithms will have trouble telling apart: English and [Scots](https://sco.wikipedia.org/wiki/Yird) (yes, it's a real language, and attempting to decipher it is quite fun).

The code 

~~~python

"""
This module creates an object that can be used to grab data from Wikipedia.
Because data sent from Wikipedia is not always consistent, you should
check the number of files that get downloaded.
"""
import re
import json
import requests


class GetArticles(object):
    """
    This is an object with the public method write_articles(language_id, number_of_articles,
    db_location). This writes sanitized articles to text files in a specified location.
    """
    def __init__(self):
        pass


    def _get_random_article_ids(self, language_id, number_of_articles):
        """
        Makes a request for random articles. "rnnamespace=0" means that only articles are chosen,
        as opposed to user-talk pages or category pages.
        """
        query = \
                        'https://' + language_id \
                        + '.wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit=' \
                        + str(number_of_articles) + '&rnnamespace=0'

        # reads the response into a json object that can be iterated over
        data = json.loads(requests.get(query).text)
        # print(data)

        # collects the ids from the json
        ids = []
        for article in data['query']['random']:
            ids.append(article['id'])

        return ids


    def _get_article_text(self, language_id, article_id_list):
        """
        This function takes a list of articles and yields a tuple (article_title, article_text).
        """
        for idx in article_id_list:
            idx = str(idx)
            query = \
                            'https://' + language_id \
                            + '.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&pageids=' \
                            + idx + '&redirects=true'

            data = json.loads(requests.get(query).text)

            try:
                title = data['query']['pages'][idx]['title']
                text_body = data['query']['pages'][idx]['extract']
            except KeyError as e:
                # if nothing is returned for the request, skip to the next item
                # if it is important to download a precise number of files
                # then this can be repeated for every error to get a new file
                # but I think this is an edge case
                print(e)
                continue

            def clean(text):
                """
                Removes HTML tags.
                """
                match_tag = re.compile(r'<[^>]+>')
                return match_tag.sub('', text)

            yield title, clean(text_body)


    def write_articles(self, language_id, number_of_articles, db_location):
        """
        This writes articles to the location specified.
        """
        articles = self._get_random_article_ids(language_id, number_of_articles)
        text_list = self._get_article_text(language_id, articles)

        for title, text in text_list:
            # slugify the title (make a valid UNIX filename)
            title = "".join(x for x in title if x.isalnum())
            with open(db_location + '/' + title + '.txt', 'w+') as f:
                f.write(text)

~~~

This module contains an object that can be used to download articles. For instance, if you have a directory called `data/sco` where you want to save your Scots data, you can download 80 files with the following command:

~~~python
from get_data import GetArticles
gd = GetArticles()
gd.write_articles('sco', 80, 'data/sco')
~~~




* bash script to add to one mega file



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

This removes the corpus' bias towards Scots: the division into documents was an artifact of data collection and has no meaning for the task of text classification. Notice that now the conditional probabilities are equivalent:

$$ P(Scots|auld) = P(auld|Scots) $$

If we think that having a prior will improve the model, one can always be introduced -- for instance, if network traffic shows that more people in Scotland are using the language classifier service, we might want to adjust the model in favor of Scots.
