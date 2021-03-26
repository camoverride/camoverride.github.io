---
layout: post
title: The Meaning of Meaning
categories: [data]
comments: true
published: false
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        displayAlign: "left"
    });
</script>

I struggled with algebra in middle school. I _still_ don't like algebra. When I was studying for math tests as a kid I kept asking myself _why does this matter?_ and _what does this mean?_ After all, mathematics is emphatically **not** reality: it's only connected to the world and our experiences through clever metaphors (or _isomorphisms_ if you want to use math jargon). Yes, a perfect sphere has never existed, but the shape of the Earth is _spherical enough_ that we can pretend it's one.

The biggest reason that people struggle with understanding academic topics is that those topics aren't given a sense of meaningfulness. This isn't the fault of learners, it's the fault of educators. When we navigate the world we can't help but try to discover the meaning of the things we hear, think, and see. Humans are great at extracting meaningfulness: we understand the _gist_ of articles, the _plot_ of a story, or the _intentions_ of someone talking to us. So it's only natural that when we don't find algebra meaningful we lose interest.

You'll never understand or appreciate mathematics, poetry, or chemistry if you view them as the meaningless manipulation of numbers, words, or chemicals. Unfortunately, this is _exactly_ how all of these fields are taught in school. In this blog post I want to show how to make things more meaningul. Along the way, we'll develop some techniques to help us extract meaning from the world around us.

<!--more-->

## Representations

Meaning is inherently tied to _representation_. When we attempt to represent something, we cannot help but try and think about what that representation _means_. In language, representation is the process where individuals use words to communicate meaningful ideas with each other. This is directly related to the field of psychology, where we can think about the meaning of words and other stimuli in terms of the mental representations that they create. In art, meaning occurs when one thing stands for another, carrying over some attributes in an interesting or surprising way. In the following sections, I'll walk through how several different fields deal with the problem of representation. During this process I'll develop a general framework for representation, which involves breaking down complicated concepts into smaller pieces that are _almost_ meaningless, and then using these smaller building blocks to reconstruct these topics on sturdier foundations where meaning is obvious.

## Language

Why is a rose a rose and not a daffodil? The simplest answer to this question relates the meaning of a word to its definition in a dictionary. Merriam-Webster defines a rose to be "any of a genus of usually prickly shrubs with pinnate leaves" whereas a daffodil is "any of various perennial bulbous herbs of the amaryllis family." Two words can be said have the same meaning if they have the same _representation_ in a dictionary: these are also called _synonyms_.

However, there are several problems with the "dictionary" understanding of words. The first is that words are defined in terms of other words. This means that any sort of meaning you try to derive from a dictionary doesn't leave the dictionary: definitions are circular.

Another problem with the dictionary approach is that there is no way to measure the difference between different representations. We would hope that words like "rose" and "daffodil" would be closer to each other than "daffodil" and "damnation", but there's no measure of "closeness" in a dictionary. Words are organized alphabetically, not "meaningfully". And even an encyclopedia, where articles are grouped by topic, doesn't help: the representation is still very coarse and one-dimensional (books are linear).

Another problem with the dictionary hypothesis is that synonyms aren't exactly synonymous. All words have extra entailments: "hate" and "despise" might be listed as synonyms in Merriam-Webster, but it's very likely that these words have subtly different meanings and appear in different contexts. The knowledge that different words appear in different contexts is a powerful way to understand meaning and is called the "distributional hypothesis." This will be re-visited in the section on **Artificial Neural Networks** where I discuss word embeddings.

In addition to understanding language as distributions of words, we can also take a _reductionist_ approach. We can represent words by breaking them into their constituent pieces to see if this helps us understand what they mean. For instance, we can decompose words into their _morphemes_ or "meaningful units." For instance, the word "decompose" can be broken down into "de" (which is a French Latinate prefix meaning "to reverse") and "compose." We can then view the English language as a smaller number of morphemes that can be glued together to form words.

But not every type of reductionism helps us find meaning. For instance, words can also be broken down into _phonemes_. The word "cat" in English has three phonemes: _k_, _æ_, and _t_, which can be represented as /kæt/. However, just because we're able to do this kind of decomposition doesn't necessarily help us. There is a well-known concept in linguistics popularized by [Ferdinand de Saussure](https://en.wikipedia.org/wiki/Ferdinand_de_Saussure) called "the arbitrariness of the sign". Even if the "signs" (sounds) of two words are similar, their meanings can be totally different. Compare the pair "cat" and "cut" (which sound similar but have nothing in common) with "camel" and "dromedary."

A more abstract way that meaning can be found in language is by _metaphor_. If your friend says that "lawyers are vultures" this is mapping the representation of "lawyer" onto "vulture." _Lawyers_ and _vultures_ are both words with various attributes (human, educated, and ruthless versus avian, scavenging, ruthless, respectively). When a metaphor comparing lawyers and vultures is made, we implicitly compare the characteristics of the two groups, seeing which attributes overlap in a meaningful way. For instance, it's true that both lawyers and vultures are sentient, but it would be incorrect to interpret "lawyers are vultures" to mean that "lawyers are sentient." Likewise, a sentence like "turkey vultures are vultures" is not a metaphor, and doesn't mean "turkey vultures are ruthless." Instead we take this to mean "turkey vultures belong to the category of vultures."

The sentence "lawyers are vultures" is a metaphor that is designed to evoke a mental image. In different people the images will be different, but a decent metaphor will evoke an image that is specific and meaningful. In the next section, I'll show how mental imagery is a form of representation.

## Psychology

In some sense, "mental imagery" is the most important form of representation. After all, an English sentence can be spoken, written, or even _felt_ in the form of Braille; what matters most isn't the method of communication but the imagery that this sentence evokes inside your head.

This has been understood for thousands of years. In Plato's [Allegory of the Cave](https://en.wikipedia.org/wiki/Allegory_of_the_Cave), people are chained facing the blank wall of a cave. These people are only able to see are the shadows of things passing behind them projected onto the wall. Even though the shadow of a man passing behind you is a very crude representation of the man himself, it still evokes a mental representation in the minds of the cave-dwellers.

Plato was interested in the idea of _Forms_, or abstract representations that exist independently of individual minds. For instance, Platonic philosophers believe that there exists a _form_ of a circle, and each circle that exists in reality is an imperfect shadow of this perfect form. An open question in cognitive science is whether people learn concepts from exemplars or from archetypes. For example, when you think of a dog, do you have an exemplar of a dog that you refer to? Maybe this examplar is _Lassie_, the border collie from Eric Knight's novels. Or maybe your examplar is your family's dog from your childhood. Maybe there are several exemplars. On the other hand, from exposure to different dogs you may have created a "dog archetype" that embodies the essential characteristics of dogs but doesn't necessarily exist.

The difference beteween an examplar and an archetype can be demonstrated with a list of numbers like `1, 5, 7, 9, 10`. Examplars from this list might be "representative examples" close to the mean, like `5` and `7`. An archetype might be the mean itself, `6.4`, which captures the "average" of the list but isn't actually a member of the list.

If you're an American, when you think of a fruit you'll probably envision an apple, orange, or pear. It's less liklely that you'll think of a tomato. This isn't because tomatoes aren't fruits, but because most fruits share many of the same properties: sweetness, roundness, shininess, etc. While a tomato has some of these properties, it has fewer than "archetypical" fruits like an apple.

Again, when talking about representations we've taken a reductionist approach: transforming fruits into lists of their attributes. This approach is useful because we can begin to define notions like closeness. We intuitively think that an apple is more like a pear than it is like a strawberry, so any representation of these fruits should share this characteristic too.

Using a slightly different example, let's say that we want to describe 3 species of flowering plants in terms of 4 properties: roses, daffodils, and [Rafflesia](https://en.wikipedia.org/wiki/Rafflesia) in terms of size, fragrance, color, and habitat:

~~~shell
| flower    | size   | fragrance | color  | habitat   |
|-----------------------------------------------------|
| rose      | small  | good      | red    | temperate |
| daffodil  | small  | good      | yellow | temperate |
| Rafflesia | large  | bad       | red    | tropics   |
~~~

This is a good start, but instead of representing flowers as adjectives, we can represent them as questions, where the answer `0` means "no" and `1` means "yes". Each of these columns is called a _feature_:

~~~shell
| flower    | is_small? | smells_good? | is_red? | is_temperate? |
|----------------------------------------------------------------|
| rose      | 1         | 1            | 1       | 1             |
| daffodil  | 1         | 1            | 0       | 1             |
| Rafflesia | 0         | 0            | 1       | 0             |
~~~

Notice that now each flower can be represented as a vector. "rose" is `[1, 1, 1, 1]`, "daffodil" is `[1, 1, 0, 1]` and "Rafflesia" is `[0, 0, 1, 0]`. Now we can begin thinking about how to compare these flowers in a quantitative, mathematical way. We can begin by defining "closeness" as the number of "swaps" (exchanging a `0` for a `1` and vice versa) it takes to change one flower vector into another. For instance, it takes one swap to change the rose vector to the daffodil vector, so we can define the distance between the two flowers as being `1`. On the other hand, it takes three swaps to change "rose" to "Rafflesia", so its distance is greater.

As we begin to add more flowers and more features to our table, we will begin to create richer representations that map onto our intuitions. For instance, the representations of "California rose" and "New England rose" should both be closer to each other than either is to "daffodil", and all three of them should be much closer to each other than any are to _Rafflesia_. These representations don't have to be binary: we can add a column for "height" that's a continuous numerical value.

Notice that there are several ways to define the distance between different kinds of objects: [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance), [Manhattan Distance](https://en.wikipedia.org/wiki/Taxicab_geometry), and [Levenshtein Distance](https://en.wikipedia.org/wiki/Edit_distance) to name just a few. And also notice that the way to determine whether a _distance metric_ is "good" is whether it maps into our common sense: a "good" metric says that roses are close to daffodils, but far from Rafflesia. If our metric said that roses and Rafflesia were very similar, we would have to find a better metric!

When we began representing the different flowers as vectors of features we included features like color, smell, and size. We didn't include features like "stamens per flower" or "was mentioned by Shakespeare?". This is because we choose features that are more _meaningful to us_. This doesn't imply that "was mentioned by Shakespeare?" is never important to know, but that for the specific task of distinguishing flowers, knowing Shakespeare's opinion doesn't help us.

People automatically pick out the important, interesting, and salient parts of objects and understand objects in terms of these features. Elephants have tusks, large ears, and trunks. Trees have leaves, roots, and a different kind of trunk. People are featherless bipeds. There is no "objectively correct" list of features that distinguish an elephant from a person, or a rose from a daffodil. Instead, our brains automatically discover the necessary features that are required to distinguish these objects. Different people might pick out different features to pay attention to, and might give those features greater or lesser importance, but in the end, the sum of those features is enough that _everyone_ can agree that a rose is a rose and a daffodil is a daffodil.

The psychological perspective on representation raises an important question: how do people actually learn the important features that can be used to distinguish objects? How do we actually learn that a rose is a rose and not a daffodil? I'm not going to answer that question immediately, but leave it for the section on **Neuroscience** where I show how the visual system breaks the world down into smaller elements and how these smaller elements are the building blocks for more complicated concepts.

## Art

Pictures are two dimensional representations of three dimensional space. In order to represent depth in a painting, artists have to use various tricks: shadowing, foreshortening, perspective, and [others](https://en.wikipedia.org/wiki/Depth_perception). Artists like M. C. Escher learned to exploit the fact that a representation of an object is not the same thing as the object itself. For instance, in his painting _Waterfall_, Escher creates the illusion that a waterwheel is both above and below a horizontal aqueduct.

<img src="{{ site.url }}/img/Escher_Waterfall.jpg" alt="Escher, waterfall">

All representations have to be _compressed_ in some way. After all, if M. C. Escher's painting had all the properties of a waterfall, it would actually _be_ a waterfall. Compression is necessary because it's not possible for every single fact we learn, thing we see, and song we hear to be stored in our brains. Instead, our experiences cause us to create theories about how the world works -- and these theories stick around even after we've forgotten the facts.

René Magritte's painting _The Treachery of Images_ is a blunt demonstration of this principle. This painting, the artist wants to remind us, is not the same as the object it's depicting. And this raises an interesting psychological question: if a painting of a pipe can create a mental representation that's just as rich as an actual pipe, then what level of "coarseness" do our mental representations have? Presumably, even a crude line-drawing of a pipe would be enough to evoke a mental representation of a pipe. We're able to apply the same sort of reasoning when we watch cartoons as when we watch live-action movies.

<img src="{{ site.url }}/img/MagrittePipe.jpg" alt="Magritte, the treachery of images">


Literature can also be thought of in a similar way. There are the particular words that a story is made-up out of, but what's important is the visual imagery that these words create in the mind of a reader. After you read a story, you'll likely remember the overall plot, the characters, and some of the interesting events. It's unlikely, however, that you'll actually remember any of the specific words that the author used: was the female protagonist's hair described as _long and black, like a noose uncoiled_ or were the words _black as night, long, a noose undone_. Humans are very good at extracting the _gist_ of a story: who did what to whom, what happened, and what it _means_. This is because we're able to extract compressed representations from a story.

Computers are excellent at memorizing particulars, but are generally bad at understanding the _gist_ of stories. This is why there has been such huge interest in _deep learning_, which has begun to allow computers to extract general meaning from things rather than just memorizing them. In the section on **deep learning**, I'll show how AI systems can now perform generally intelligent behaviors like determining whether the overall sentiment of a sentence is positive or negative.

## Neuroscience

I ended the section on **Psychology** by promising to show how the brain breaks down the world into smaller pieces and how those pieces are combined together to create a rich representation of the world. In order to show you how this all happens, I'm going to restrict myself to the visual system (but I promise that the same principles hold for other areas of cognition). I'll begin by describing photoreceptor cells, then neurons, and finally the structure of the early visual cortex.

When light from the outside world enters your pupil it's flipped upside-down and is projected onto a light-sensitive patch of cells called the retina. The retina contains cone cells and rod cells. There are three kinds of cone cells, each sensitive to a different wavelength of light (color), and rod cells, which are sensitive to absolute magnitude of light (black and white). When one of these photoreceptors it struck by light, it becomes active. It then spreads its activation to the neurons it's connected to.

A neuron is a special type of cell that has the unique property that it can spread electrochemical activity to other cells. Neurons have a cell body (like all other cells) and dendrites that connect it to other cells. These dendrites can pass electrochemical activity through the neuron onto other neurons. Some of these dendrites occur at the end of a long tail-like structure on the neuron called an axon. The dendrites that connect directly to the cell body can be viewed as "inputs"; and the dendrites at the end of the neuron's axon can be thought of as its "outputs." The neurons on the lowest-level of the visual system are activated directly by your photoreceptors.

<img src="{{ site.url }}/img/Blausen_0657_MultipolarNeuron.png" alt="neuron image" width="600" height="400">

When the dendrites connected to the cell body of a neuron become sufficiently excited, they can cause the neuron to create a chemical reaction that travels down its axon to the dendrites at the end of the axon. These dendrites are connected to other neurons, which contribute to it becoming excited. Think of activity from the input neurons as "bottling up" some electrochemical potential. When this potential reaches some limit, it suddenly explodes, sending activtion down the axon. 

Neurons can be thought of as threshold-activated functions: when the sum of the activity of the incoming dendrites to a neuron exceeds some specific threshold, the neuron sends out activity through its axon to the dendrites that it's connected to. These neurons in turn spread activation to all the neurons that are downstream of it. This "activation" can be excitatory (positive) or inhibatory (negative). Excitatory connections cause downstream neurons to become more activate; inhibitory neurons cause downstream neurons to become less active.

When the incoming activity to a neuron exceeds its threshold, it sends activity down its axon suddenly and ballistically. This is an all-or-none process: either the neuron fires and activity is sent down the axon, or nothing happens. Because this activity is ballistic, and because a neuron only fires when the activity feeding into it passes some threshold, for a downstream neuron to fire its incoming connections must all be in sync. Let's say neuron requires an activity level of `10` (in some imaginary type of units) to fire. There are thousands of incoming connections to the neuron. But if these incoming connections all send activity at different times, then the neuron will never fire. If each incoming neuron sends an activity of `1`, then the neuron will only fire if ten of these incoming neurons are active at the same time. The activation of a single neuron's axon is so sudden and "ballistic" that with sensitive enough instruments, it can be detected as a short "click."

In the 1970's two neuroscientists -- Hubel and Weisel -- were sticking electrodes into cat brains to see how they would react. The cats were anesthetized and placed in front of a screen where various shapes, lines, and pictures were projected (very reminiscent of Plato). The electrodes were so tiny that they would rest next to a single neuron, detecting whenever its axon fired. These firings were recorded as audio clicks.

To their great surprise, the researchers found that specific neurons would only fire in response to very particular stimuli: one neuron would only light up when the cat viewed a line at a certain orientation. Another neuron would only respond to line intersections. In the decades to follow, neuroscientists would find neurons that would respond only to pictures of [Jennifer Aniston](https://en.wikipedia.org/wiki/Grandmother_cell) but not other people or celebrities. These [cat experiments](https://www.youtube.com/watch?v=IOHayh06LJ4) established the idea of _receptive fields_. But what are these receptive fields, and how do they actually work?

There are two possible ways that we can understand how the visual system functions, both of which are imporant to explore. The first way is to poke around inside animals until we actually observe what's happening. This method has some serious practical and ethical limitations. The other way is to take what we already know about how the visual system works and use these building blocks to construct some hypothetical model of how the visual system might work at a larger scale. This model will make predictions that are falsifiable, meaning that we can improve the model over time. Below, we'll use the "model" approach to see if we can create a system of neurons that is able to perform one of the tasks that Hubel and Weisel's cats performed: line detection.

The problem of line detection involves having some pattern of light as input and a single neuron's activity as output. The goal of our system is for the output neuron to only become excited when the pattern of light is a horizontal line, and never become excited for any other patterns of light. To keep things simple, we'll only use black-and white colors, and each "patch of light" will either be 100% lit-up or 100% dark (for purposes of illustration, I'll flip the colors so black patches mean "illuminated"). Additionally, the patches of light will occur in a simple 3x3 grid, so that a "square" means all the edges of this grid are activated, and a "horizontal line" means that only the middle three are active.

We can approach this problem by constructing a 3x3 grid of photoreceptors, one for each patch of light. We can then have each photoreceptor connect to a neuron. These nine neurons are then all connected to our output neuron by a single axon with a single dendrite. This transforms the problem into one where we need to discover the values of ten different parameters: the threshold of the output neuron, and the values -- whether excitatory or inhibitory (positive of negative) -- of each neuron's connection to the output neuron. We can further simplify the model by removing the photoreceptors and pretend that the activation of the light patches feeds directly into the neurons. Below is our "naked" model with no parameters:

<img src="{{ site.url }}/img/blank_network_1.png" alt="receptive field model with no weights" width="600" height="300">

Let's require that each input neuron becomes active whenever it's exposed to light. Now let's specify the parameters of our model: all the input neurons will send an activation of `1` to the output neuron when they're activated, and the output neuron will only activate when the sum of the incoming activations is greater than or equal to `3`:

<img src="{{ site.url }}/img/horizontal_wrong_weights.png" alt="horizontal line image on receptive field, wrong weights" width="600" height="300">

This network is detecting a horizontal line. However, it will also fire for other patterns, like a cross. We can modify the activities of the input neurons so that some of them send inhibitory (negative) activation to the output neuron. For instance, if we set the activities on the axons of the top and bottom rows of neurons to all be `-1`, then the cross will send a total activation of `-1` (top row) plus `3` (middle row) plus `-1` (bottom row), for a total activation of `1`, which isn't high enough for the output neuron to fire.

<img src="{{ site.url }}/img/cross_correct_weights.png" alt="cross image on receptive field, correct weights" width="600" height="300">

This is all it takes to create a horizontal line detector: some photoreceptors, the neurons they're attached to, and another neuron that only becomes active based on some pattern of the nine intermediate neurons. The organization of these neurons (some of which are excitatory, others inhibitory) is our receptive field!

We can take this simple model of vision and expand it to much larger grids. We can also create networks of neurons that fire in response to other shapes like vertical lines, crosses, and circles. These can in turn be combined to identify more complicated shapes like eyes, noses, and mouths. These can then be used to identify faces. All it takes to build these more complicated models are neurons connected in different ways with different output values (weights) on their axons -- the building blocks are the same. Keep in mind that one patch of photoreceptors like the 3x3 patch above can be used to detect many different shapes: each photoreceptor can be connected to several downstream networks of neurons, each with the task of identifying different shapes. In other words, each neuron can be part of several different receptive fields.

In the process of discovering how the visual system works, we've had to figure out how the brain actually represents the world. The brain doesn't represent the world as a miniature model of the world inside the head. Instead, the brain represents the world as patterns of activity on neural networks.

A problem with this approach is that the representation created by our model is inherently tied to the parameters we chose (the threshold and the output values for each of the nine neurons). As our model gets more complicated, the number of parameters will get enormous. In fact, there are _billions_ of neurons in the human brain and _trillions_ dendrites -- that's billions and trillions of parameters! Selecting all of these parameters by hand would be impossible. It would be great if we had a way to automatically learn these parameters so that we wouldn't have to randomly guess the parameters in our representations. One way of approaching this problem is with artificial neural networks, which I'll introduce in the next section.

## Artificial Neural Networks

In the last section we created a simplified but informal model of a neuron. In this section I'll give a more formal treatment to this problem. I'll also show how it's possible to discover the parameters in our model without having to guess them or have a researcher set them by hand.

The first artificial neuron that was invented was called the _perceptron_. A perceptron is simply a function that accepts some array of numbers as input. If the sum of that array is above a threshold value, the perceptron outputs a value of `1`. Otherwise it outputs a value of `0`. This output is connected to other perceptrons through axons which have _weights_. These weights can be numbers like `1` or `-1` -- like we saw in the previous section -- or any other number.

There can be several perceptrons that connect to our perceptron, giving it input. These are labeled $$x_1$$ through $$x_n$$. Each of these has an associated weight: $$w_1$$ through $$w_n$$. These weighted connections are summed up by the perceptron (represented by the big sigma, $$\sigma$$ which is summation notation), and this sum is then passed through an output function, which can be a step function or a sigmoid function.

![image of simple perceptron ]({{ site.url }}/img/perceptron.png)

This model looks very similar to the simplified neurons we explored in the last section. However, this model can use one extra addition. Instead of outputting a `1` or a `0`, which is a "step function", let's instead force our model to output a continuous value between `0` and `1`. To do this, we'll apply the sigmoid function, often written as $$\sigma$$, to the sum of the incoming values, which we'll call  $$x$$. The sigmoid function has the nice property that it squishes any input number to the range $$[0, 1]$$. It also has the nice property that it's _differentiable_, which I'll return to in a bit:

$$\sigma (x) = \frac{e^x}{e^x + 1}$$

Now that we have our basic architecture set up, we can apply our perceptron model to solving receptive field problems like the ones in the last section. The problem with the model in the last section was that we had to set all of the parameters by hand. Let's start off by replacing all of the neurons in the receptive fields with perceptrons. Then we'll give random values to the weights and learn them over time.

Let's say that you feed this model a picture of a horizontal line. Will it predict the correct category? Probably not! The output value of the final neuron will probably be something like `0.49` or `0.33`. Ideally, what we want to happen is for the output to be close to `1` when the image is a horizontal line and close to `0` when the image is anything else. This is similar (but not exactly the same) as the model in the previous section, where the output was always `0` or `1`.

Whenever we feed the model an example image, we can imagine comparing the model's output with the desired output. For instance, if we give the model a horizontal line and it predicts `0.51`, then we know that the difference between the correct answer, `1`, and the given answer is `1 - 0.51 = 0.49`. We can then use an algorithm called backpropagation to calculate how much each weight in the model contributes to the error `0.49`. Once we know how incorrect each weight is (and the direction of its incorrectness) we can alter that weight slightly in the correct direction.

The way we actually determine how much each weight contributes to the error is by the chain rule of calculus, which I'll omit for reasons of time/space. This is the reason why it's important for the function to be differentiable: you can't take the derivitive (find the error) of a step function that outputs only binary values like `0, 1`.

This can all be done automatically: examples are given to the model, the difference between the actual result and the desired result are calculated, and error is back-propagated through the network to alter our weights. After running through many "epochs" where the same training data is used repeatedly, the weights will arrive at values that are similar to the ones we hand-selected. The benefit of this approach is that we didn't have to use "guess and check" to determine which values are correct. Another benefit is that this approach can scale to much larger and more complicated networks -- networks that humans would never be able to hand tune.

The field of _deep learning_ is primarily concerned about learning representations. It's challenging to engineer features like we did when hand-selecting the parameters in our model or choosing the properties of flowers that we thought were important for distinguishing them -- this is one of the reasons why machine learning practitioners are so excited by recent developments in deep learning.

The receptive fields (or filters) that are learned by deep learning models often resemble the line and edge detectors that occur in the human visual system. And this makes sense: these AI systems are performing similar tasks to humans are are using similar architectures.

When you look at a face you can automatically determine the emotional state the person you're looking at. You do this effortlessly, fluently, but not without performing specific actions: you look at the eyes and mouth for signs of a frown, scowl. We don't spend as much time focusing on the hair. When we build a deep learning model for emotion detection, we find that the eyes and mouth are the areas that the model spends the most time scrutanizing -- it doesn't learn a representation of the hair because features like "hairstyle" and "hair color" aren't related to someone's emotional state.

## Putting it all Together

When we try to represent something, we can't help but discover what it _means_. Breaking down complicated topics into simpler, almost-meaningless parts is, surprisingly, the best way to figure out what the _big picture_ is all about.

Meaningfulness doesn't come cheaply and isn't easy to find. Meaning doesn't automatically appear in the world: it's produced by the interaction of an intelligent agent (maybe you, or possibly your computer) with its environment. It's taken millions of years of evolution for humans to be able to extract meaningful information from language, stories, music, faces, and art.

As people tried to understand language, psychology, art, and neuroscience they were forced to break these concepts down into smaller pieces in order to figure out how they work. They have shown us that the meaning of meaning is the search for truth in representation.
