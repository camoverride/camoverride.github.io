---
layout: post
title: User Studies with Amazon Mechanical Turk
categories: [blog]
comments: true
---

[Amazon Mechanical Turk](https://www.mturk.com/mturk/welcome) is an extremely useful resource for conducting basic human research. It allows researchers to quickly gather data from large numbers of participants at a very low cost. MTurk's built-in platform is generally used for conducting surveys; however, I find MTurk more useful as a recruiting platform. After recruiting participants, I can then redirect them to a website I've created that hosts my user study.

However, some researchers have criticized MTurk for its lack of transparency. It's not always easy to confirm whether participants are lying about certain background criteria. For instance, I've conducted several language-learning studies using MTurk where native fluency in English is required. While MTurk is useful for initial hypothesis-testing in language studies, it isn't particularly reliable for longer-term studies where language fluency must be confirmed.

## Head Direction in Advertisements

But language-learning is only one category of research that I'm interested in. Other areas of research (like perceptual studies) are robust to extraneous variables such as language-fluency. Recently I've been curious about the influence of head-direction on measures of attraction, trustworthiness, and assessment of value. Researchers have known for a while that people have systematic lateral spatial biases. These biases include a preference for objects on the right sides of space,[^1] a liking for visual scenes that move from left to right (or vice versa following writing direction),[^2] and well-documented aversions to left-handedness in many cultures[^3].

I wanted to see whether people have a similar bias for head directions. I found 120 images from advertisements: 40 with heads in three-quarters view facing right, 40 facing left, and 40 looking forward. I presented the images to different participants in their naturally-occurring orientation and flipped horizontally. I then asked participants to rate the images for attractiveness. Although I'm still scraping through the data, it seems that people tend to have a preference for heads facing towards the right, exposing the left side of the face.

This is very interesting, because it seems to suggest that advertisers can increase the likeability of their advertisements by simply flipping them. For instance, in the cropped Coca-Cola advertisement below, participants preferred the reversed image on the right over the original image on the left.

![picture coke advertisement, normal and flipped]({{ site.url }}/img/coke-ad.png)

Producing a professional advertisement can cost tens of thousands of dollars,[^4] but conducting a simple Mechanical Turk study is so cheap that I can do it as a hobby. Perhaps companies should take a more research-oriented approach to advertising, accounting for well-known psychological preferences before revealing their ads. After all, the cost of horizontally flipping an image is nothing when compared with the cost of designing an entire advertisement.

[^1]: [Nisbett & Wilson, 1978](http://www.people.virginia.edu/~tdw/nisbett&wilson.pdf). When shown several identical stockings, people have a strong preference for the stockings on their right.
[^2]: [Bergen, Benjamin. (2012). Louder Than Words](http://www.cogsci.ucsd.edu/~bkbergen/#books). People prefer scenes that flow in the same direction as their writing system. English-speakers like scenes that go from left to right, whereas Arabic and Hebrew speakers like scenes that go from right to left.
[^3]: [Porac & Buller, 1990](http://psycnet.apa.org/?&fa=main.doiLanding&doi=10.1037/h0084268). Bias against lefties often leads left-handers to change their handedness.
[^4]: Picture advertising can be [very expensive](http://fitsmallbusiness.com/how-much-does-billboard-advertising-cost/).