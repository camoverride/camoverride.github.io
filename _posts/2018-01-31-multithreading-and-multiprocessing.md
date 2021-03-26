---
layout: post
title: Multi-threading and Multi-processing in Python
categories: [code]
comments: true
published: false
---

When I first encountered multi-threading and multi-processing, I wasn't able to distinguish the two. For me, both were some sort of magical way to make your programs run faster. However, understanding how multi-threading and multi-processing is critical for many medium- and large-sized software projects. In this post, I'll explain how each works.

<!--more-->

## Multi-threading

Let's say that we want to fetch some data from the web. A task like this will likely be I/O bound, meaning that the bottleneck in our program's speed will come from how fast data is accessed and written, not how fast the CPU does computations. This is because it's (relatively speaking) incredibly slow for a computer to make a request over a network. Accessing the computer's CPU is almost instantaneous, but it takes milliseconds to send data over a wire. 

If we have a list of webpages, a naive way to access them is to loop over the sites, making one request each time:

~~~python
import requests
from timeit import default_timer as timer

url_list = [
    'https://en.wikipedia.org/wiki/Main_Page',
    'https://en.wikipedia.org/wiki/Cape_sparrow',
    'https://en.wikipedia.org/wiki/Southern_Africa',
    'https://en.wikipedia.org/wiki/Continent',
    'https://en.wikipedia.org/wiki/Ural_River',
    'https://en.wikipedia.org/wiki/Albrecht_D%C3%BCrer',
    'https://en.wikipedia.org/wiki/Holy_Roman_Empire',
    'https://en.wikipedia.org/wiki/Translatio_imperii',
    'https://en.wikipedia.org/wiki/Lombards',
    'https://en.wikipedia.org/wiki/Austria'
]

def download(index, url):
    requests.get(url)
    print(index, url)

# Synchronous requests.
start = timer()
for index, url in enumerate(url_list):
    download(index, url)
end = timer()

print('  Synchronous request time: {}'.format(end - start))

# ...
# Synchronous request time: 9.43742299103178
~~~

For me, it took 9 seconds to make all of these requests. That doesn't seem like much time, but what if we wanted to access a million websites? We'd be waiting all day. So instead of just iterating through a list and waiting for one request to be finished before the next is made, what if we just stopped waiting? We still iterate through our list, but instead of pausing, we just push the current item to the background and start processing another. This is the idea behind multi-threading.

If you have any intuition about how computers work, that seems impossible. After all, the operations of a CPU are supposed to be executed serially - one at a time. So how can we have processes operating in "the background?" A simple way to conceptualize it is this: your computer is more than just a CPU. It also has parts responsible for performing network I/O. When a program uses multiple threads, execution of a thread can be hended off to the parts that perform network I/O. When those parts have finished their jobs, execution is returned to the program that initiated them.

Another way to think of things are cooks in a kitchen: a single-threaded pizza cook puts the pizza in the oven and waits for it to finish before starting to make the salad. A multi-threaded pizza cook puts the pizza in the oven and starts to make the salad while it's baking. A multi-processing pizza cook is actually two cooks (more on that later).

I've added an extra section to the script from above. This is a multi-threaded implementation of the same function. Because the time to make a network request is variable, not all of the url's are returned in the order that they were dispatched:

~~~python
import requests
from timeit import default_timer as timer
from multiprocessing import Pool as ThreadPool

url_list = [
    'https://en.wikipedia.org/wiki/Main_Page',
    'https://en.wikipedia.org/wiki/Cape_sparrow',
    'https://en.wikipedia.org/wiki/Southern_Africa',
    'https://en.wikipedia.org/wiki/Continent',
    'https://en.wikipedia.org/wiki/Ural_River',
    'https://en.wikipedia.org/wiki/Albrecht_D%C3%BCrer',
    'https://en.wikipedia.org/wiki/Holy_Roman_Empire',
    'https://en.wikipedia.org/wiki/Translatio_imperii',
    'https://en.wikipedia.org/wiki/Lombards',
    'https://en.wikipedia.org/wiki/Austria'
]

def download(index, url):
    requests.get(url)
    print(index, url)

# Synchronous requests.
start = timer()
for index, url in enumerate(url_list):
    download(index, url)
end = timer()

print('  Synchronous request time: {}'.format(end - start))

# Asynchronous requests.
enum = [(x, y) for (x, y) in enumerate(url_list)]
start = timer() 
pool = ThreadPool(15) 
pool.starmap(download, enum)
end = timer()

print('  Asynchronous request time: {}'.format(end - start))

# ...
# Synchronous request time: 8.583241935120896
# ...
# Asynchronous request time: 1.3029110548086464
~~~

That's a huge improvement. Instead of waiting for each item, we dispatch all of our network requests and handle them as they're returned to us. But not everything can be improved with multiple threads. Only tasks that are I/O bound will benefit from multi-threading.

## Multi-processing

When you run a Python script, typically only one of your computer's CPU cores is being used. But what if you wanted to make use of all of them? This is where multi-processing comes in.

Let's say that you have some huge text files (millions of lines) and you'd like to know the number of characters in each. This is the naive approach to solving this problem:

~~~python
from timeit import default_timer as timer

file_list = ['hugefile1.txt', 'hugefile2.txt', 'hugefile3.txt', 'hugefile4.txt', 'hugefile5.txt']

count_list = []

start = timer()

for file in file_list:
    count = 0
    with open(file) as f:
        for line in f:
            for char in line:
                count += 1
    count_list.append(count)

end = timer()

print(count_list)
print('Single process line counting: {}'.format(end - start))

# ...
# Single process line counting: 14.913661726051942
~~~

Let's distribute this work among all of our computer's cores. Python's multiprocessing library abstracts away the dirty-work and allows us to access our cores without too much overhead. In the function below, a `manager` wraps our process, which allows variables to be shared among our threads. The important variable that's being shared is `counts_list`. Multiple processes spawn independent forks of the program, which means that each independent process would have access to the `counts_list` variable, but it would never be returned to the original process.

For every file in the `file_list` a new process is spawned. These processes take a function, `count_lines`, and arguments. In order stop the program from terminating early, it's necessary to wait for each process to finish before printing the value of `counts_list`. This is that `proc.join()` is for: this blocks until each process has "rejoined" the original process.

~~~python
from timeit import default_timer as timer
from multiprocessing import Process, Manager

file_list = ['hugefile1.txt', 'hugefile2.txt', 'hugefile3.txt', 'hugefile4.txt', 'hugefile5.txt']

def count_lines(counts_list, file):
    count = 0
    with open(file) as f:
        for line in f:
            for char in line:
                count += 1

    counts_list.append(count)

start = timer()

with Manager() as manager:
    counts_list = manager.list()
    processes = []
    for file in file_list:
        proc = Process(target=count_lines, args=(counts_list, file))
        proc.start()
        processes.append(proc)
    for proc in processes:
        proc.join()

    print(counts_list)

end = timer()
print('Multi-processing line counting: {}'.format(end - start))

# ...
# Multi-processing line counting: 2.4305348589550704
~~~

Our multi-processing program has finished the work in a fraction of the time -- just two seconds.

## Different Tools for Different Problems

Notice that multi-processing and multi-threading were used in different situations. A multi-threaded approach approach was effective when making requests over a network, and a multi-threaded approach was useful when counting lines in a file. The first task was I/O bound, because the speed of the network was the bottleneck. The second task was CPU bound, because the computer's CPU is counting every character in each large file. Multiple threads solve I/O problems, and multiple processes solve CPU problems.
