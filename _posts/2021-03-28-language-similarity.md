---
layout: post
title: Which languages sound the most similar?
categories: [language]
comments: true
published: true
---

When you start learning a new language, the first thing you'll notice is how it sounds. Specifically, you'll notice the places where it sounds different from your native language: maybe there are tones, or unfamiliar consonant clusters, or speech sounds you've never heard before. I've always been curious about which languages sound similar. This blog post emerged from a project where I used math to quantify the difference between languages.

In the next section I'll talk about how I framed this problem and the datasets I used. Then I'll discuss the algorithm I developed and its results. I'll conclude by talking about the significance of the results and the specific languages that turned up.

If you want to dive really deep into this topic, all the data analysis I did is in [this notebook](https://github.com/camoverride/notebooks/blob/master/notebooks/Sound_Similarity.ipynb)

<!--more-->

## Phonemes

Phonemes are the sounds that occur in a language. If we want to understand how similar two languages sound, it makes sense to start by examining their phonemes. 

Here's what phonemes look like: /kʰ/ is the first sound in the English word king and /ŋ/ is the sound of "ng". [The International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) is the system that linguists use to transcribe the sounds of words - it lets us escape all the messiness of a particular language's spelling rules. In IPA, we'd transcribe the word "king" as /kʰɪŋ/. As you may have already noticed, linguists put IPA transcriptions inside of forward /slæʃɪz/.

The collection of all a language's speech sounds are called its _phoneme inventory_. American English's phoneme inventory is larger than you might expect, and looks like this:

_b, d, d̠ʒ, f, h, j, kʰ, l, m, n, pʰ, s, tʰ, t̠ʃ, v, w, z, ð, ŋ, ɡ, ɹ, ʃ, ʒ, θ, aɪ, aʊ, eɪ̯, iɪ, oʊ, uː, æ, ɑ, ɔɪ, ə, ɚː, ɛ, ɪ, ʊ, ʌ_

Other languages have larger and smaller inventory sizes: the largest is [!Xóõ](https://en.wikipedia.org/wiki/Taa_language#Phonology) with 161 phonemes and the smallest is [Pirahã](https://en.wikipedia.org/wiki/Pirah%C3%A3_language#Phonology) with only 11. [Phoible](https://phoible.org/) is a dataset of phoneme inventories from 2,186 languages - about a third of all the world's languages. I used phoible for all of my analyses.


## Measuring Distance

You can think of a phoneme inventory as a set of unique entries that describe a language. One language's inventory might look like _(a, b, c, i)_ and another might look like _(d̠ʒ, a, b, k, f, kʰ, ʌ)_. We can go ahead and directly compare these two: count the overlapping phonemes and divide by the total number of phonemes. In this case there are two overlapping phonemes (_a, b_) and 9 phonemes total, so we can say that the similarity between these inventories is _2/9_, or _0.222_. If we subtract this number from _1_, we get the distance. This distance measure has a name: [Jaccard distance](https://en.wikipedia.org/wiki/Jaccard_index), and is also called _intersection over union_ because we're dividing the magnitude of the intersection of the sets over the magnitude of their union.

I used Jaccard distance to rank the similarity between American English and every other language in the phoible database, and the results were __much__ better than random. However, I decided to create a custom metric and found even more compelling results.

The custom metric involves breaking phonemes down into their individual features. For instance, the English phoneme /k/ is a voiceless velar plosive: it lacks the voicing feature, has the velar feature, and has the plosive feature. There are about two dozen features that you can use to characterize each speech sound, and they're all _binary_ (present or absent).

After transforming each phoneme into a list of binary features, I took the Jaccard distance between every pair of a language's phonemes and took the average over the closest pairs. This accounts for a situation where two languages might have two very similar phonemes, like /kʰ/ and /k/ - instead of treating these as completely different entities, there's now a more fine-grained measure of similarity. Using my custom distance metric, I found the languages closest to American English. Here are the top-50 results:

- <span style="color:blue">English (British)</span>
- <span style="color:blue">English (General)</span>
- <span style="color:blue">English (Australian)</span>
- <span style="color:blue">Welsh</span>
- <span style="color:blue">Belizean Creole</span>
- <span style="color:blue">Scots</span>
- Daza
- <span style="color:blue">Jamaican Creole</span>
- <span style="color:blue">German</span>
- <span style="color:blue">Assamese</span>
- Kwangari
- <span style="color:blue">Persian</span>
- Teda
- Bashkir
- <span style="color:blue">Rumanian</span>
- <span style="color:blue">Karipuna Creole</span>
- <span style="color:blue">Michif</span>
- Indonesian
- Tagalog
- Kera
- Berom
- <span style="color:blue">Ishkashimi</span>
- <span style="color:blue">Wymysorys</span>
- Cebuano
- Fur
- Hill Jarawa
- Hanga
- <span style="color:blue">Mauritian Creole</span>
- Amo
- Swahili
- <span style="color:blue">Antiguan Creole</span>
- Ivatan
- <span style="color:blue">English (New Zealand)</span>
- Lunda
- Kohumono
- Diriku
- Standard Malay
- Javanese
- San Miguel Chimalapa Zoque
- Toba-Batak
- Teke
- Cayapa
- Mbukushu
- Luo
- Taba
- Kabiye
- <span style="color:blue">Slovene</span>
- <span style="color:blue">Faroese</span>
- Chumburung

Some of these are totally unsurprising: there are other English dialects, English-based creoles, closely-related languages (like German and Scots), and some more distant cousins (like Persian and Slovene). I marked these languages <span style="color:blue">__in blue__</span>. However, a few of the languages on this list are totally unrelated to English: Swahili is a [Niger-Congo language](https://en.wikipedia.org/wiki/Niger%E2%80%93Congo_languages) from Sub-Saharan Africa, Tagalog is an [Austronesian language](https://en.wikipedia.org/wiki/Austronesian_languages) from South-East Asia, and Bashkir is a [Turkic language](https://en.wikipedia.org/wiki/Turkic_languages) from Central Asia. However, when you look at these language's phonemes it makes sense: they all seem very similar to English.


## Validation

I wanted to understand whether my results were random or if there was some pattern. If closely-related languages are ranked as closer to English than unrelated languages, then the algorithm is performing well - after all, related languages should sound similar.

__7%__ of the world's languages are members of the [Indo-European family](https://en.wikipedia.org/wiki/Indo-European_languages), of which English is a member, whereas __40%__ of the languages in the top-50 sample are Indo-European - a significant difference. I performed [a statistical test](https://en.wikipedia.org/wiki/Student%27s_t-test#Equal_or_unequal_sample_sizes,_similar_variances_(1/2_%3C_sX1/sX2_%3C_2)) to prove that this result was unlikely to occur by chance. This result proves that the algorithm is actually working: it's selecting closely-related languages more often than unrelated ones.

It also seems like the algorithm prefers languages from the unrelated [Austronesian language family](https://en.wikipedia.org/wiki/Austronesian_languages) - 5% of the world's languages are Austronesian, but 16% of the languages in the sample are Austronesian. I performed another statistical test which showed that this result was extremely unlikely to occur by chance - Austronesian languages actually do sound more like English than languages from other families.

Interestingly, it doesn't matter very much which distant metric you use: Austronesian languages are always disproportionately represented in the top 50 results.


## English's Neighbors

The Austronesian languages [Tagalog](https://en.wikipedia.org/wiki/Tagalog_language#Phonology), [Ivatan](https://en.wikipedia.org/wiki/Ivatan_language#Phonology), [Taba](https://en.wikipedia.org/wiki/Taba_language#Phonology), [Indonesian](https://en.wikipedia.org/wiki/Indonesian_language#Phonology), and [Malay](https://en.wikipedia.org/wiki/Malay_language#Phonology) have a simple phonological inventory: their consonants are a subset of English (except for the palatal nasal /ɲ/ in Indonesian). Their vowels are also a subset of English, except for Tagalog which has a mid-back rounded vowel that English lacks: /o̞/.

[Toba-Batak](https://en.wikipedia.org/wiki/Toba_Batak_language#Phonology) resembles the rest of the languages in this family except that is possesses the palatals /d͡ʑ/ and /t͡ɕ/.

[Cebuano's](https://en.wikipedia.org/wiki/Cebuano_language#Phonology) consonants are often dentalized, making it slightly different from its relatives on this list.

In [Javanese](https://en.wikipedia.org/wiki/Javanese_language#Phonology) there are breathy-voiced consonants like /ɖ̥/ and dentalized stops like /t̪/.

All of these languages are non-tonal like English. However, unlike English, the sound /ŋ/ can occur in the beginnings of syllables as well as at the end: English is weird in that it bans /ŋ/ from starting out a syllable.

I think it's fair to conclude that Austronesian languages are _weirdly similar_ to English in terms of their speech sounds. Despite being on [opposite sides of the planet](https://en.wikipedia.org/wiki/Austronesian_peoples#Austronesian_expansion), these languages contain sounds that every English-speaker is familiar with. Learning Tagalog, Malay, or Cebuano shouldn't present many problems for English speakers when it comes to pronunciation.

However, it's worth keeping in mind that all the distance metrics I explored are, by definition, symmetrical: the distance from point A to point B is always the same as the distance from B to A. However, the "learning difficulty" of a language's speech sounds is definitely not symmetrical: all the Austronesian languages I explored have phoneme inventories that are subsets of English: that means it should be easier for an English-speaker to pronounce Tagalog words than for a Tagalog-speaker to pronounce English words.

So if you're an American and want to learn a language that's easy to pronounce, I suggest taking a trip to Southeast Asia 🌴
