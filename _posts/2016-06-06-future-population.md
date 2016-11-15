---
layout: post
title: Population Projections
categories: [blog]
comments: true
---

The United Nations Population Division [has predicted](https://esa.un.org/unpd/wpp/Download/Standard/Population/) that the world's population will likely rise to more than 11 billion by the end of this century. However, this population growth is very uneven. While the population of Sub-Saharan Africa will more than double, some parts of Europe and East Asia will see their populations contract. I've picked through the UN data to produce some interesting maps. A table of growth projections can be found [on Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_by_future_population_(United_Nations,_medium_fertility_variant)).

## Growth

This first map illustrates simple growth rates. It shows the population in 2100 as a percentage of the population in 2020.

{% include map1.html %}

## Proportianate Growth

The population of the world will expand by 145% between 2020 and 2100. While most parts of the world will experience population growth, some places will experience more growth than others. Niger is expected to grow from a population of 24 million in 2020 to around 200 million in 2100. Many countries, such as Botswana, will grow close to the world's average rate. On the other hand Moldova's population will decline from 4 million to less than two million: the greatest decline of any country.

Below is a map that depicts proportional population growth rate. Redder colors represent a growth rate faster than the world's average, whereas greener colors represent population loss. The formula for this is quite simple: `(country_pop_2100 / world_pop_2100) / (country_pop_2020 / world_pop_2020)`.

{% include map2.html %}
