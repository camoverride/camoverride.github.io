---
layout: post
title: Question answering with BERT
categories: [code]
comments: true
published: true
---

Now that [BERT](https://en.wikipedia.org/wiki/BERT_(language_model)) is available to the public through libraries like [transformers](https://huggingface.co/transformers/), it's super easy to build question answering (QA) and dialogue systems. In this blog post I'll introduce you to a simple QA system I built and show you how to use it. Enjoy 🥰

<!--more-->

You can check out the code [here](https://github.com/camoverride/question_answering).


## How question answering systems work

QA systems start with a _query_ such as _what's the capital of France?_ and return an answer like _Paris_. QA systems generally have two steps: there's a __search engine__ that locates relevant documents and a __reading comprehension__ algorithm that looks through them.

There are numerous different kinds of search engines. A very simple way to find relevant documents is go through every document in your database and return all the documents containing any of the words that appear in the query. Then you rank the returned documents with an algorithm like [pagerank](https://en.wikipedia.org/wiki/PageRank). This is approximately how Google works. In the QA system I built, I used Wikipedia's built-in [elasticsearch](https://en.wikipedia.org/wiki/Elasticsearch) engine, which does a really good job.

Once you have some relevant documents, a reading comprehension algorithm selects the span of text containing the answer. For instance, the simple document "the capital of France is __Paris__" contains the answer we're looking for. For my QA system I used BERT fine-tuned on the SQuAD dataset to locate the answers. More about that in the next section.


## The SQuAD dataset

The [Stanford Question Answering Dataset](https://rajpurkar.github.io/SQuAD-explorer/) is a large dataset derived from Wikipedia. Each row in this dataset contains a wikipedia article chunk, a question derived from it, and the correct answer. We call these the Query, Context, and Answer. For example:

~~~shell
Q: What is the capital of France?
C: The capital of France has been Paris since the 15th century. Previously ...
A: Paris
~~~

You can train BERT to accept embeddings of the question plus the context conditioned on the correct answer span. For instance, you feed BERT a combined embedding of `Q` + `A` (see above) and try to get it to correctly predict the span `A[5:6] == "Paris"`. You do this by adding two embedding vectors to the output of BERT - these vectors are the same length as the number of tokens in the answer, and correspond to indexes in the answer. One token corresponds to the beginning of the answer and the other to its end. The span that begins at the argmax of the start vector and ends at the argmax of the stop vector is you answer.

I used a BERT QA model that had been finetuned on the SQuAD dataset courtesy of [huggingface](https://huggingface.co/).


## Putting it all together

In my repo, I have [a module](https://github.com/camoverride/question_answering/blob/main/document_retrieval.py) that performs document retrieval and [another](https://github.com/camoverride/question_answering/blob/main/reading_comprehension.py) that does reading comprehension. These are combined in an `Answerer` class that looks like this:

~~~python
from answer_question import Answerer

question = "what is the population of France?"

answerer = Answerer(model_server_address="http://localhost:8080/v1/models/bert_qa_squad:predict")

ans = answerer.answer_question(question)["answer"]["answer"] # 67 . 4 million
~~~

This system is able to answer _Wikipedia-style_ questions - things you think might be found somewhere on Wikipedia. If you want an in-depth introduction to this topic, check out [the code](https://github.com/camoverride/question_answering) which is heavily documented.

Thanks 😇
