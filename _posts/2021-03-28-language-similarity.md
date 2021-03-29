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

<!-- more -->

## Phonemes

Phonemes are the sounds that occur in a language. For instance, /kʰ/ is the first sound in the English word king, and /ŋ/ is the sound of "ng". [The International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) is the system that linguists use to transcribe the sounds of words - it lets us escape all the messiness of a particular language's spelling rules. In IPA, we'd transcribe the word "king" as /kʰɪŋ/. As you may have already noticed, linguists put IPA transcriptions inside of forward /slæʃɪz/.

The collection of all a language's speech sounds are called its _phoneme inventory_. English's phoneme inventory is larger than you might expect, and looks like this:

_'b', 'd', 'd̠ʒ', 'f', 'h', 'j', 'kʰ', 'l', 'm', 'n', 'pʰ', 's', 'tʰ', 't̠ʃ', 'v', 'w', 'x', 'z', 'ð', 'ŋ', 'ɡ', 'ɻ', 'ʃ', 'ʍ', 'ʒ', 'ʔ', 'θ', 'aː', 'e̞', 'iː', 'o̞ː', 'uː', 'æ', 'ɐ', 'ɒ', 'ɔ', 'ə', 'əː', 'ɪ', 'ʊ', 'b', 'd', 'd̠ʒ', 'f', 'h', 'j', 'kʰ', 'l', 'm', 'n', 'pʰ', 's', 'tʰ', 't̠ʃ', 'v', 'w', 'z', 'ð', 'ŋ', 'ɡ', 'ɹ', 'ʃ', 'ʒ', 'θ', 'aɪ', 'aʊ', 'e', 'eə', 'eɪ', 'iː', 'uː', 'æ', 'ɑː', 'ɒ', 'ɔɪ', 'ɔː', 'ə', 'əʊ', 'ɜː', 'ɪ', 'ɪə', 'ʊ', 'ʊə', 'ʌ', 'b', 'd', 'd̠ʒ', 'f', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 't̠ʃ', 'v', 'w', 'z', 'ð', 'ŋ', 'ɡ', 'ʃ', 'ʒ', 'θ', 'a', 'aɪ', 'aʊ', 'eɪ', 'eː', 'iɛ', 'iː', 'ɑː', 'ɒ', 'ɔɪ', 'ə', 'ɛ', 'ɛʉ', 'ɪ', 'ʉː', 'ʊ'_

Other languages have larger and smaller inventory sizes: the largest is !Xóõ with 161 phonemes and the smallest is Pirahã with only 11. The average language in phoible has 39 phonemes.

If we want to compare how different languages sound, it makes sense to directly compare their phonemes, which is the strategy that I employ in the next section. However, it's important to remember that languages have different rules about how phonemes can combine. For instance, English has syllables like /straɪk/ ("strike"), which we can write as (CCCVC) - three Consonants, a Vowel (technically a dipthong) and a final Consonant. Japanese only allows at maximum CVN syllables (Consonant, Vowel, Nasal). Phoible doesn't contain any information about a language's syllable structure, but you'll see that we can get very compelling results by just looking at the phonemes directly.


## Measuring Distance

You can think of a phoneme inventory as a set of unique entries that describe a language. One language's inventory might look like _(a, b, c, i)_ and another might look like _(d̠ʒ, a, b, k, f, kʰ, ʌ)_. We can go ahead and directly compare these two: count the overlapping phonemes and divide by the total number of phonemes. In this case there are two overlapping phonemes (_a, b_) and 9 phonemes total, so we can say that the similarity between these inventories is _2/9_, or _0.222_. If we subtract this number from _1_, we get the distance. This distance measure has a name: Jaccard distance, and is also called _intersection over union_, because we're just dividing the magnitude of the intersection of the sets over the magnitude of their union.

I used Jaccard distance to rank the similarity between English and every other language in the phoible database, and the the results were __much__ better than random. Here are the languages most similar to English:

1. English (British)
2. English (Australian)
3. English (American)
4. German
5. Jere
6. Kasem
7. Feefefe
8. Welsh
9. Langi
10. Ngombale
11. Kuay
12. Foodo
13. Bafia
14. Limbum (Central)
15. Tagalog
16. Bashkir
17. Amo
18. Teda
19. Gonja

Notice that some of the most similar languages are other English dialects, the [closely-related](https://en.wikipedia.org/wiki/Germanic_languages) language German, and Welsh, a language spoken in the British Isles. No surprises here.

Things get interesting when we consider the remaining languages on the list:

- [Tagalog](https://en.wikipedia.org/wiki/Tagalog_language) is an Austronesian language spoken in the Philippines, a former colony of the United States.
- [Bashkir](https://en.wikipedia.org/wiki/Bashkir_language) is a Turkic language.
- [Kuay](https://en.wikipedia.org/wiki/Kuy_language) is an Austroasiatic language.
- [Teda](https://en.wikipedia.org/wiki/Teda_language) is a Nilo-Saharan language.
- The remaining 10 languages are all [Niger-Congo languages](https://en.wikipedia.org/wiki/Niger%E2%80%93Congo_languages), spoken in Sub-Saharan Africa.

This was tantalizing, but I decided to apply a custom distance metric to see if I could find more compelling results.

Phonemes are composed of different features. For instance, the English phoneme /k/ is a voiceless velar plosive: it lacks the voicing feature, has the velar feature, and has the plosive feature. There are about two dozen features that you can use to characterize each speech sound.

I decided to break-down the phonemes of a language into these different features before measuring similarity. Then I took the Jaccard distance between every pair of a language's phonemes and took the average over the closest pairs. This accounts for a situation where two languages might have two very similar phonemes, like /kʰ/ and /k/ - instead of ranking these are completely different, there's now a more fine-grained measure of similarity. Using my custom distance metric, I found the closest languages to English:

1. English (British)
2. Mambila
3. American English
4. English (American)
5. English (New Zealand)
6. Friulian
7. Lahu
8. Dagbani
9. Juhuri
10. Kera
11. Lunda
12. Sisumbwa
13. Limbum (Central)
14. Belizean Creole
15. Feefefe
16. Jamaican Creole
17. Ndamba
18. Pichi
19. Sissala
20. Yaghnobi
21. Limbum (Northern)
22. Bassa
23. English (Australian)
24. Fulfulde
25. Kanuri
26. Khalkhal
27. Kofyar
28. Lusaamia
29. Minangkabau
30. Persian
31. Sherbro
32. Standard Malay
33. Teda
34. Bambara
35. Bobo
36. Fuliiru
37. Haya
38. Indonesian
39. Jere
40. Kanuri
41. Kasɩm
42. Lengola
43. Lisu
44. Mandingo
45. Michif
46. Minyanka
47. Mungaka
48. Rumanian

In the next section, I'll sum up these results and reflect on English's place in the universe.


## English's Neighbors

The languages that sound most similar to English are its close cousins: the English dialects, English-based creoles, and Indo-European languages. The surprising entries on this list are languages from the Niger-Congo and Austronesian families, which make up the remainder of the list with the exception of Lisu and Laha ([Sino-Tibetan](https://en.wikipedia.org/wiki/Sino-Tibetan_languages)), Teda and Kanuri ([Nilo-Saharan](https://en.wikipedia.org/wiki/Nilo-Saharan_languages)), and Kofyar and Kera ([Afro-Asiatic](https://en.wikipedia.org/wiki/Afroasiatic_languages)) - though it should be noted that the latter four languages are all spoken in Sub-Saharan Africa like the Niger-Congo languages.

To me, these results make sense: when I tried to learn Swahili a few years ago - a Niger-Congo language - I didn't find the phonology to be too tricky. It's definitely different from English, but not something that makes much time or effort to master. Likewise, I know people who speak Indonesian and Tagalog as first languages and didn't have much trouble picking up English's speech sounds.

English is a language that originated in Europe and is now spoken all over the world. Over time it's expanded away from its fellow Germanic languages and is spoken by billions of people. It's interesting that as English's speech sounds drifted and mutated over time, they happened to converge on a pattern of sounds that's also familiar in West and Central Africa: the Niger-Congo languages sound English-y, even though they're not related. As languages change across time, it will be interesting to see if any other convergences happen.
