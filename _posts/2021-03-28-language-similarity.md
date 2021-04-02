---
layout: post
title: Which languages sound the most similar?
categories: [language]
comments: true
published: true
---

I took a Japanese class in college and thought I was able to pronounce the words correctly - until I visited Japan. I quickly realized that I'd learned poor English approximations of all Japanese's speech sounds. The sound that Americans call "h" and linguists transcribe as /h/ is actually /ç/ in Japanese - we have the bad habit of using the same letter to transcribe both speech sounds. When I visited Tokyo I had a strong American accent - Japanese wasn't as easy as I'd initially thought.

This got me thinking - if Japanese doesn't sound like English, what languages do? This blog post is my attempt to answer that question. I used math, linguistics, and programming to dig into the [phoible](https://phoible.org/) dataset, which has information on the phoneme inventories of thousands of languages.

All of the data analysis I did is in [this notebook](https://github.com/camoverride/notebooks/blob/master/notebooks/Sound_Similarity.ipynb), and the interesting bits are reduplicated here. Enjoy.

<!--more-->


## Phonemes

Phonemes are the sounds that occur in a language. For instance, /kʰ/ is the first sound in the English word king, and /ŋ/ is the sound of "ng". [The International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) is the system that linguists use to transcribe the sounds of words - it lets us escape all the messiness of a particular language's spelling rules. In IPA, we'd transcribe the word "king" as /kʰɪŋ/. As you may have already noticed, linguists put IPA transcriptions inside of forward /slæʃɪz/.

The collection of all a language's speech sounds are called its _phoneme inventory_. American English's phoneme inventory is larger than you might expect, and looks like this:

_b, d, d̠ʒ, f, h, j, kʰ, l, m, n, pʰ, s, tʰ, t̠ʃ, v, w, z, ð, ŋ, ɡ, ɹ, ʃ, ʒ, θ, aɪ, aʊ, eɪ̯, iɪ, oʊ, uː, æ, ɑ, ɔɪ, ə, ɚː, ɛ, ɪ, ʊ, ʌ_

Other languages have larger and smaller inventory sizes: the largest is !Xóõ with 161 phonemes and the smallest is Pirahã with only 11. The average language in phoible has 35 phonemes.

If we want to compare how different languages sound, it makes sense to directly compare their phonemes, which is the strategy that I employ in the next section. However, it's important to remember that languages have different rules about how phonemes can combine. For instance, English has syllables like /straɪk/ ("strike"), which we can write as (CCCVC) - three Consonants, a Vowel (technically a dipthong) and a final Consonant. Japanese only allows at maximum CVN syllables (Consonant, Vowel, Nasal). Phoible doesn't contain any information about a language's syllable structure, but you'll see that we can get very compelling results by just looking at the phonemes directly.


## Measuring Distance

You can think of a phoneme inventory as a set of unique entries that describe a language. One language's inventory might look like _(a, b, c, i)_ and another might look like _(d̠ʒ, a, b, k, f, kʰ, ʌ)_. We can go ahead and directly compare these two: count the overlapping phonemes and divide by the total number of phonemes. In this case there are two overlapping phonemes (_a, b_) and 9 phonemes total, so we can say that the similarity between these inventories is _2/9_, or _0.222_. If we subtract this number from _1_, we get the distance. This distance measure has a name: Jaccard distance, and is also called _intersection over union_, because we're just dividing the magnitude of the intersection of the sets over the magnitude of their union.

I used Jaccard distance to rank the similarity between American English and every other language in the phoible database, and the results were __much__ better than random. However, I decided to create a custom metric and found even more compelling results.

The custom metric involved breaking phonemes down into their individual features. For instance, the English phoneme /k/ is a voiceless velar plosive: it lacks the voicing feature, has the velar feature, and has the plosive feature. There are about two dozen features that you can use to characterize each speech sound, and they are all _binary_ (present or absent).

After transforming each phoneme into a list of binary features, I took the Jaccard distance between every pair of a language's phonemes and took the average over the closest pairs. This accounts for a situation where two languages might have two very similar phonemes, like /kʰ/ and /k/ - instead of ranking these as completely different, there's now a more fine-grained measure of similarity. Using my custom distance metric, I found the closest languages to American English:

- <span style="color:blue">English (British)</span>
- <span style="color:blue">English (Australian)</span>
- <span style="color:blue">English (New Zealand)</span>
- <span style="color:blue">Belizean Creole</span>
- <span style="color:blue">Jamaican Creole</span>
- <span style="color:green">German</span>
- <span style="color:blue">Breton</span>
- <span style="color:blue">Welsh</span>
- <span style="color:green">Frisian</span>
- <span style="color:purple">Assamese</span>
- <span style="color:yellow">Mo</span>
- <span style="color:blue">Scots</span>
- <span style="color:red">Daza</span>
- <span style="color:green">Wymysorys</span>
- <span style="color:yellow">Dogon</span>
- <span style="color:red">Tamasheq</span>
- <span style="color:yellow">Kabiyɛ</span>
- <span style="color:purple">Karipuna Creole</span>
- <span style="color:yellow">Lunda</span>
- <span style="color:purple">Rumanian</span>
- <span style="color:purple">French</span>
- <span style="color:yellow">Bambara</span>
- <span style="color:blue">Antiguan Creole</span>
- Bashkir
- <span style="color:red">Mwaghavul</span>
- <span style="color:green">Luxembourgish</span>
- <span style="color:red">Songhay</span>
- <span style="color:purple">Eastern Hill Balochi</span>
- <span style="color:red">Fur</span>
- <span style="color:purple">Slovene</span>
- Bakairí
- <span style="color:red">Teda</span>
- <span style="color:yellow">Limbum (Central)</span>
- <span style="color:purple">Persian</span>
- <span style="color:yellow">So</span>
- Turkmen
- <span style="color:yellow">Vagala</span>
- <span style="color:yellow">Berom</span>
- Rawang
- <span style="color:green">Norwegian</span>
- Hill Jarawa
- Indonesian
- Chamacoco
- <span style="color:yellow">Amo</span>
- Tagalog
- <span style="color:purple">Gheg Albanian</span>

Some of the results aren't surprising: there are 9 <span style="color:blue">English dialects, English creoles, and languages of the British Isles</span> towards the top of the list. There are also 5 <span style="color:green">other Germanic languages</span> as well as 8 <span style="color:purple">other Indo-European languages</span>.

However, there are 10 <span style="color:yellow">Niger-Congo langauges</span>, which is surprising because they're totally unrelated to English. Of the remaining 14 languages, 6 are <span style="color:red">spoken in Sub-Saharan Africa</span>: Daza, Songhay, Fur, and Teda are Nilo-Saharan languages, and Tamasheq and Mwaghavul are Afro-Asiatic. There seems to be a bias towards Sub-Saharan African languages.

There are also two Turkic languages: Turkmen and Bashkir; two Austronesian languages: Indonesian and Tagalog; and four languages from other families: Chamacoco (Zamucoan), Bakairí (Cariban), Rawang (Sino-Tibetan), and Jarawa (Ongan).

It's clear from these results that Indo-European languages are over-represented: 18 out of 46 (once we subtract the creoles). Niger-Congo is over-represented too: 10/46. But how over-represented are these languages when compared to all the languages in the world?

Of the 2,662 languages tracked by [WALS](https://wals.info/languoid), only 176 are Indo-European. Compare 18/46 = 0.391 versus 176/2662 = 0.066. Almost __40%__ of the languages chosen by my algorithm were in the same language family as English, versus only __7%__ of the world's languages. Additionally, there are only 325 Niger-Congo languages on WALS: 10/46 = 0.217 versus 326/2662 = 0.122 - __21%__ of the languages chosen by my algorithm were Niger-Congo, whereas only __12%__ of the world's languages belong to this family. I wanted to check how likely this outcome would occur by chance, so I performed some statistics:

To test the validity of this algorithm, I'm going to treat it as a classifier. The labels will be "Indo-European language" and "not an Indo-European language." A perfect algorithm would maximize the probability that Indo-European (positive labels) are part of the top-n selected languages (n in this case is 50, but I trim off some similar dialects from the final results.)


precision, recall
    - can't get recall because not all items are labeled
    - but can get precision


The fact that my distance metric selects closely-related languages is evidence that the metric is valid. At the same time, the fact that Niger-Congo languages are being selected seems to suggest that these languages actually _are_ closer to English in terms of their speech sounds. I'll explore this idea a little more in the next section.

Expectation maximization: algorithm should maximize the probability that closely-related languages are chosen.







In the next section, I'll sum up these results and reflect on English's place in the universe.


## English's Neighbors

The languages that sound most similar to English are its close cousins: the English dialects, English-based creoles, and Indo-European languages. The surprising entries on this list are languages from the Niger-Congo and Austronesian families, which make up the remainder of the list with the exception of Lisu and Laha ([Sino-Tibetan](https://en.wikipedia.org/wiki/Sino-Tibetan_languages)), Teda and Kanuri ([Nilo-Saharan](https://en.wikipedia.org/wiki/Nilo-Saharan_languages)), and Kofyar and Kera ([Afro-Asiatic](https://en.wikipedia.org/wiki/Afroasiatic_languages)) - though it should be noted that the latter four languages are all spoken in Sub-Saharan Africa like the Niger-Congo languages.

To me, these results make sense: when I tried to learn Swahili a few years ago - a Niger-Congo language - I didn't find the phonology to be too tricky. It's definitely different from English, but not something that makes much time or effort to master. Likewise, I know people who speak Indonesian and Tagalog as first languages and didn't have much trouble picking up English's speech sounds.

English is a language that originated in Europe and is now spoken all over the world. Over time it's expanded away from its fellow Germanic languages and is spoken by billions of people. It's interesting that as English's speech sounds drifted and mutated over time, they happened to converge on a pattern of sounds that's also familiar in West and Central Africa: the Niger-Congo languages sound English-y, even though they're not related. As languages change across time, it will be interesting to see if any other convergences happen.
