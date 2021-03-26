---
layout: post
title: How to Build a Machine Learning App from Scratch
categories: [data]
comments: true
published: true
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

Please see [the updated post](https://camtsmith.com/articles/2021-02/how-to-build-ml-app-from-scratch) for a sleeker and more modern approach to the same problem!

<!--

Comment-out this entire article!

In this article, I'm going to teach you how to build a text classification application from scratch. To get started, all you need to know is a little Python, the rudiments of Bash, and how to use Git. The finished application will have a simple interface that allows users to enter blocks of text and then returns the identity of that text.

This project has three steps. The first is constructing a corpus of language data. The second is training and testing a language classifier model to predict categories. The third step is deploying the application to the web along with an API.

You can find the source code [on Github](https://github.com/camoverride/language-classifier). If you'd like a sneak peek at what the application looks like in the wild, [click here](https://language-classifier-app.herokuapp.com/).


## Building a Corpus

In order to perform language classification, a data source is needed. A good source will have a large amount of text and accurate category labels. Wikipedia seems like a great place to start. Not only do they have a well-documented API, but it allows for [language-specific querying](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

Start off by creating an empty repository on Github and cloning a local copy. Call this project `language-classifier` or something similar. Inside this directory, create a file called `languages.py` where with a list of languages that will be used:

~~~python
# languages.py
"""
Language prefixes from here: https://en.wikipedia.org/wiki/List_of_Wikipedias
"""

LANGUAGES = ['en', 'sv', 'de', 'fr', 'nl', 'ru', 'it', 'es', 'pl', 'vi', 'pt', 'uk', 'fa', 'sco']
~~~

I selected languages with large numbers of articles. Additionally, I selected [Scots](https://sco.wikipedia.org/wiki/Yird), because it's quite similar to English and will provide an interesting challenge for our algorithm. We'll import this module into some of the functions we create later on.

Inside the repository, create a directory called `scraper`. Inside this directory, create a directory called `data` and two files called `get_data.py` and `create_database.py`:

~~~python
# get_data.py
"""
This module exposes two objects. The first is GetArticles which can be used to grab data
from Wikipedia. This scraper also performs basic document sanitizing, such as removing
punctuation, HTML tags, and citation brackets. I recommend scraping less than 100 articles
per API call. The second object, Database, creates a SQLite database.
"""
import re
import json
import requests
from sqlalchemy import Table, Column, Text, String, MetaData, create_engine


class GetArticles(object):
    """
    This is an object with the public method write_articles(language_id, number_of_articles,
    db_location). This writes sanitized articles to text files in a specified location.
    """
    def __init__(self):
        pass


    def _get_random_article_ids(self, language_id, number_of_articles):
        """
        Makes a request for random article ids. "rnnamespace=0" means that only articles are chosen,
        as opposed to user-talk pages or category pages. These ids are used by the _get_article_text
        function to request articles.
        """
        query = \
                        'https://' + language_id \
                        + '.wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit=' \
                        + str(number_of_articles) + '&rnnamespace=0'

        # reads the response into a json object that can be iterated over
        data = json.loads(requests.get(query).text)

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
            except KeyError as error:
                # if nothing is returned for the request, skip to the next item
                # if it is important to download a precise number of files
                # then this can be repeated for every error to get a new file
                # but getting a precise number of files shouldn't matter
                print(error)
                continue

            def clean(text):
                """
                Sanitizes the document by removing HTML tags, citations, and punctuation. This
                function can also be expanded to remove headers, footers, side-bar elements, etc.
                """
                match_tag = re.compile(r'(<[^>]+>|\[\d+\]|[,.\'\"()])')
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
            with open(db_location + '/' + title + '.txt', 'w+') as wikipedia_file:
                wikipedia_file.write(text)



class Database(object):
    """
    This creates a SQLite database with two tables, "train" and "test." Each table
    has data from each language. This object has the public method write_categories,
    which takes as its arguments a language, a training text, and a test text. It
    writes this information to the proper table.
    """

    def __init__(self, database_name):
        # This can easily be exchanged for a different database, like postgres.
        self.engine = create_engine('sqlite:///' + database_name + '.db')
        self.metadata = MetaData()

        # Table that contains the training data.
        self.train = Table('train', self.metadata,
                           Column('language', String, primary_key=True),
                           Column('text', Text)
                          )

        # Table that contains the test data.
        self.test = Table('test', self.metadata,
                          Column('language', String, primary_key=True),
                          Column('text', Text)
                         )

        self.metadata.create_all(self.engine)


    def write_categories(self, language, training_text, test_text):
        """
        This method writes the data to the database.
        """
        conn = self.engine.connect()

        # Drop rows, data will be overwritten anyway.
        del1 = self.train.delete().where(self.train.columns.language == language)
        del2 = self.test.delete().where(self.test.columns.language == language)

        conn.execute(del1)
        conn.execute(del2)

        ins1 = self.train.insert().values(
            language=language,
            text=training_text
        )

        ins2 = self.test.insert().values(
            language=language,
            text=test_text
        )

        # Execute inserts.
        conn.execute(ins1)
        conn.execute(ins2)
~~~

The following module uses the object from above to make calls to Wikipedia's API and write files to a database. This is the actual module that we will call to grab data:

~~~python
# create_database.py
"""
When run as a script, this module iterates through a list of languages, downloading a specified
number of words from each language. Determine the languages and number of words to download by
altering the LANGUAGES and WORDS variables. Tokenization is done by whitespace, so languages like
Chinese and Japanese will not yield accurate results: use languages that have spaces between words.
Language prefixes from here: https://en.wikipedia.org/wiki/List_of_Wikipedias
Trivia: https://www.quora.com/Why-are-there-so-many-articles-in-the-Cebuano-language-on-Wikipedia
"""
import subprocess
from os import listdir
from os.path import join
from get_data import GetArticles, Database
import sys
sys.path.append('..')
from languages import LANGUAGES


WORDS = 40000
DATABASE_LOCATION = 'data'


class DataBaseWriter(object):
    """
    This is an object with the public method dbwrite. This object takes as its argument
    db_root_location, which specifies a directory where the language data should be downloaded.
    """
    def __init__(self, db_root_location):
        self.getdata = GetArticles()
        self.db_root_location = db_root_location


    def _count_words_in_language(self, language):
        """
        Counts the number of words in all the .txt files for a single language.
        """
        words = 0
        language_data_folder = join(self.db_root_location, language)
        contents = listdir(language_data_folder)
        articles = [article for article in contents if article[-3:] == 'txt']
        for article in articles:
            with open(join(language_data_folder, article), 'r') as text:
                for line in text:
                    for _ in line.split(' '):
                        words += 1

        return words


    def _get_words_in_language(self, language):
        """
        Iterates through all the articles downloaded for a single language, collecting all the words
        by splitting on whitespace and returns the list of words.
        """
        words = []
        language_data_folder = join(self.db_root_location, language)
        contents = listdir(language_data_folder)
        articles = [article for article in contents if article[-3:] == 'txt']
        for article in articles:
            with open(join(language_data_folder, article), 'r') as text:
                for line in text:
                    for word in line.split(' '):
                        words.append(word)

        return words


    def dbwrite(self, language, sql_database, words):
        """
        Given a language, this function downloads 25 Wikipedia articles. It counts the number
        of words and adds more articles until the desired number is reached. It also leaves behind
        the articles downloaded as .txt files.
        """
        # Debug output.
        print('checking ' + language + ' articles')

        language_data_folder = join(self.db_root_location, language)
        train_ratio = 0.9

        # Checks if the folder for the specific language exists. Creates it if it doesn't.
        if language not in listdir(self.db_root_location):
            subprocess.run(["mkdir", language_data_folder])

        # If there are not enough words downloaded, download more.
        while self._count_words_in_language(language) < words:
            # Debug output.
            print('   ... downloading more words, not enough:', self._count_words_in_language(language))
            self.getdata.write_articles(language, 25, language_data_folder)

        # Read all the words into a list, removing any extras. Divide into training and test sets.
        all_words = self._get_words_in_language(language)[:words]
        split = int(train_ratio * words)
        training_set = all_words[split:]
        test_set = all_words[:split]

        # Join the words by white-space and add to the SQL database.
        sql_database.write_categories(language, ' '.join(training_set), ' '.join(test_set))



if __name__ == "__main__":

    SQLDB_NAME = 'language_data'
    SQLDB = Database(SQLDB_NAME)

    TEXTFILES = DataBaseWriter(DATABASE_LOCATION)

    for lang in LANGUAGES:
        TEXTFILES.dbwrite(lang, SQLDB, WORDS)
~~~

Although this module has done some rudimentary cleaning, the data is far from perfect. Ideally, footnotes, page-headers, and anything else that's not in the body of the document should be removed. However, I am following the [Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle) when it comes to development: 80% of the work will be accomplished in the first 20% of a project's lifespan. So rather than chasing diminishing returns, we'll leave the data in rough shape and see if our classifier is good enough to deal with a noisy data set.

Make sure you're inside the `scraper` directory and run `create_database.py` as a script. This will start the download process. You can select the number of words you want to download, but if you haven't manually set that option, 40,000 words from each langauge will be downloaded. These will be saved into a file called `language_data.db`. This is a SQL database with two tables: one for the test data and a second for the training data. While you're waiting for the download to finish, you can start building a classifier.

## Classification

Now that we have some data to play with, it's time to choose a classification algorithm. [Naive Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) seems promising. In the first half of this section, I'll explain the math behind Naive Bayes. In the second half, I'll use [Scikit](http://scikit-learn.org/stable/) to train a Multinomial Naive Bayes classifier on our data.

Naive Bayes classifiers are a family of classifiers that take inspiration from Bayes' Theorem. Most people like to memorize Bayes' theorem and go from there, but I find that it's more useful to derive Bayes' theorem instead, as it sheds some light on how the pieces fit together. This is especially important when we need to fiddle with the prior probability (which the nature of our corpus will force us to do). I'll add other languages later on, but I'll keep things simple for the purposes of this tutorial.

We can think of the probability of A given B as being equivalent to the probability of the intersection of [A and B](https://en.wikipedia.org/wiki/Logical_conjunction#/media/File:Venn0001.svg) divided by the probability of B, where the probability of B is further equivalent to the intersection of A and B plus the intersection of [B and not A](https://en.wikipedia.org/wiki/Boolean_algebra#/media/File:Vennandornot.svg) (I've linked Venn Diagram illustrations of these logical functions - see [my blog post about "Math to Code"](https://camtsmith.com/articles/2017-12/math-to-code) for a different perspective):

$$ P(A | B) = {\dfrac{P(A \cap B)}{P(B)}} = {\dfrac{P(A \cap B)}{P(A \cap B) + P(B \cap ¬A)}} $$

The formula above is implemented with logic, but it's more useful to convert this to math so that we can play around with specific quantities. The intersection of two sets, A and B, is the same as the probability of B given A multiplied by the probability of A. The middle section below is the canonical form of Bayes' Theorem:

$$
P(A | B) = {\dfrac{P(B|A) \cdot P(A)}{P(B)}} = {\dfrac{P(B|A) \cdot P(A)}{ P(B|A) \cdot P(A) + P(B|¬A) \cdot P(¬A)  }}
$$

The intuition behind Naive Bayes is quite simple. Let's say we have three documents, one is English and contains \["auld", "man", "girl"\] and the other two are Scots and are \["the", "auld"\] and \["auld", "auld"\] (not the most realistic data, but it'll suit our purposes.) If we are judging the input sentence \["auld"\] (a vector of words containing only one element), then the probability of this belonging to Scots is:

$$
P(Scots|auld) = {\dfrac{P(auld|Scots) \cdot P(Scots)}{P(auld)}} =
\cfrac{3/4 \cdot 2/3}{3/4 \cdot 2/3 + 1/4 \cdot 1/3} = \cfrac{6}{7}
$$

Intuitively, this result makes sense. Three out of four times, the word "auld" appears in Scots, and documents labeled "Scots" occur more frequently than documents in the "English" category.

If you paid attention to the way that the data was collected, you might think that the division of text into different documents was a bit arbitrary -- and you'd be right! When filtering emails, it makes sense to keep track of what proportion of incoming messages were labeled spam. This is because the spam model and the spam corpus exist in the same environment, and spam is (usually) less common than actual mail. In our case, the environments won't match. Our app's goal is not to randomly select a Wikipedia article and guess the language. Instead, users will input snippets of text (taken from wherever) to learn what language it's in. There are 5,535,380 English Wikipedia articles at the time of this writing, but only 48,228 in Scots. If we were to take the prior probability of an article being in English vs Scots into account, we would be biased (by more than a hundred to one) to identify it as English, all other things being equal. But that bias won't help us, so we might want to rethink our prior.

Because there are two Scots articles in our toy corpus and only one in English, this means that the prior for Scots is 2/3. We can relax the prior that the number of documents is meaningful, which is equivalent to collapsing all the Scots documents in one mega-document (and likewise for English):

$$ \cfrac{3/4 \cdot 1}{3/4 \cdot 1 + 1/4 \cdot 1} = \cfrac{3}{4} $$

This removes the corpus' bias towards Scots: the division into documents was an artifact of data collection and has no meaning for the task of text classification.

Combining everything into a large database has already been done for you by the `create_database.py` module. However, if you would like to inspect the individual articles, they remain in the data folder.

After eliminating document frequency as a variable, the posterior probability equals the likelihood:

$$ P(Scots|auld) = P(auld|Scots) $$

You might have noticed that by removing our prior, our Naive Bayes model is no longer Bayesian! But this is acceptable. Dirichlet distributions and other maximum likelihood estimators are commonly used as priors, so tweaking this value is not uncommon nor will it harm the efficacy of our model.

In order to perform our work, create a new directory called `model` underleath the root directory. This is what the directory tree should look like now:

~~~shell
language-classifier
    languages.py
    model
    scraper
        data
            ...
        create_database.py
        get_data.py
~~~

Inside `model` create two new files: `generate_model.py` and `test.py`. Run `generate_model.py` as a script from the project's root directory:

~~~shell
$ python3 model/generate_model.py
~~~

This is the code for `generate_model.py`:

~~~python
# module: generate_model.py
"""
This module implements a Multinomial Naive Bayes classifier using sklearn.
The classifier is saved to a pkl file for future use.
Tests are performed at the end to make sure the model is valid.
"""
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib
from sqlalchemy import create_engine

# Because our data set is small, we can save it to RAM. However, if we have a massive
# dataset, we should save the data to disk or read it from a generator.

LANGUAGES = ['en', 'sv', 'de', 'fr', 'nl', 'ru', 'it', 'es', 'pl', 'vi', 'pt', 'uk', 'fa', 'sco'
            ]

TRAINING_DATA = []

# Connect to database and read information into the TRAININ_DATA list.
db = create_engine('sqlite:///scraper/language_data.db')
conn = db.connect()
res = conn.execute('select * from train')
for row in res:
    TRAINING_DATA.append(row['text'])


TRAINING_SET = np.array(TRAINING_DATA) #np.concatenate([language for language in TRAINING_DATA])

# Read in the target int for each language.
TARGETS = np.array([i for i in range(len(LANGUAGES))])

# This  turns a collection of text data into a matrix of frequency counts.
COUNT_VECT = CountVectorizer()
TRAIN_COUNTS = COUNT_VECT.fit_transform(TRAINING_SET)

# tfidTransformer scales down the impact of very frequent tokens -- things like stopwords.
# http://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfTransformer.html
TDIDF_TRANSFORMER = TfidfTransformer()
TRAIN_TFIDF = TDIDF_TRANSFORMER.fit_transform(TRAIN_COUNTS)

# Train a multinomial Naive Bayes classifier.
CLASSIFIER = MultinomialNB().fit(TRAIN_TFIDF, TARGETS)

# Save the results of the classifier and the vectorizer so that it does not need to be trained at runtime.
joblib.dump(COUNT_VECT, 'model/count_vect.pkl')
joblib.dump(TDIDF_TRANSFORMER, 'model/tdidf_transformer.pkl')
joblib.dump(CLASSIFIER, 'model/classifier.pkl')
~~~

Running this this file will produce three `.pkl` files. These files represent the model that has been created. We'll use this model in our application. But before deploying anything to the web, we need to make sure that our model is working properly. There are a number of ways to verify how well a model is working, however, many of them require a knowledge of statistics that's beyond the scope of this tutorial. Instead we can generate a simple graphic and run some tests. The module below, called `tests.py`, creates a confusion matrix and lists some test phrases to check the model's sanity:

~~~python
# tests.py
"""
This module tests the validity of our algorithm by generating a confusion matrix. If the diagonal
from the top-left to bottom-right is "denser" than surrounding areas, then the model is performing
better than chance.
"""
import itertools
import numpy as np
import matplotlib.pyplot as plt
from sklearn.externals import joblib
from sklearn.metrics import confusion_matrix


CLASSIFIER = joblib.load('model/classifier.pkl')
TDIDF_TRANSFORMER = joblib.load('model/tdidf_transformer.pkl')
COUNT_VECT = joblib.load('model/count_vect.pkl')

LANGUAGES = ['en', 'sv', 'de', 'fr', 'nl', 'ru', 'it', 'es', 'pl', 'vi', 'pt', 'uk', 'fa', 'sco'
]


# This reads all of our test data into one place.
TEST_DATA = []
for language in LANGUAGES:
    TEST_DATA.append(
        np.array([open('scraper/data/' + language + '/TEST_SET.db').read()])
    )

def get_chunks(lang, size=30):
    """
    I expect that this app will be used by users to detect what language a small chunk of text
    belongs to. In order to reflect that, this function chops up all of the TEST_DATA into chunks
    of thirty words each.
    """
    for i in range(0, len(lang), size):
        yield ' '.join(lang[i:i + size])

# Collects a the actual value of each language chunk.
ACTUAL = []
# Collects the predicted value of each language chunk.
PREDICTED = []

# For a given chunk, this appends the actual value to ACTUAL and the predicted
# value to PREDICTED.
index = -1
for language in TEST_DATA:
    index += 1

    chunks = get_chunks(language[0].split())
    chunks = [i for i in chunks]

    TEST_COUNTS = COUNT_VECT.transform(chunks)
    TEST_TFIDF = TDIDF_TRANSFORMER.transform(TEST_COUNTS)
    PREDICTED_ = CLASSIFIER.predict(TEST_TFIDF)

    PREDICTED.extend(PREDICTED_)

    for chunk in chunks:
        ACTUAL.append(index)


def plot_confusion_matrix(cm, classes, title='Confusion matrix', cmap=plt.cm.Reds):
    """
    The following code prints an easily-read confusion matrix.
    """

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes)
    plt.yticks(tick_marks, classes)

    fmt = 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True Class')
    plt.xlabel('Predicted Class')

# Compute confusion matrix.
cnf_matrix = confusion_matrix(ACTUAL, PREDICTED)

plt.figure()

class_names = LANGUAGES

plot_confusion_matrix(cnf_matrix, classes=class_names,
                      title='Confusion Matrix')

plt.show()
~~~

According to the confusion matrix that this script produces, it looks like our model is quite accurate!

![confusion matrix]({{ site.url }}/img/confusion_matrix.png)

However, notice some of the mistakes that the model makes. The unlabaled column/row means "unidentified." A reasonable chunk of the English documents weren't able to be classified. Also notice that quite a few Portuguese word chunks were thought to be Spanish -- a mistake to look into, but definitely not as serious as mistaking Portuguese for Polish! Also notice that very few English and Scots articles have been confused.

It looks like our model is doing pretty well, so it's time to move on to the next step.

## Making a Web Application

Now it's time for the fun part. In this section, we'll use Flask to create a simple web application. We'll then use Heroku to deploy our app to the internet along with an API. If you're confused about the structure of the application, [clone the repository from Github](https://github.com/camoverride/language-classifier).

We need to do a bit of reorganization to get our application in shape. We'll have to create a few new files and directories and organize them like below:

~~~shell
model
    generate_model.py
    tests.py
    classifier.pkl
    count_vect.pkl
    tdidf_transformer.pkl
scraper
    data
        ...
    create_database.py
    get_data.py
templates
    base.html
    index.html
.gitignore
app.py
checklanguage.py
Procfile
requirements.txt
~~~

We've already created everything in the `model` and `scraper` directories, and I'll walk you through the remaining files and directory that you'll be creating.

The `app.py` file contains our Flask server. This is the brains of the operation. It will serve our site and handle incoming and outgoing requests:

~~~python
# app.py
"""
This is a flask server. This renders a web page and handles user requests. When a user
enters a phrase, this server returns the identify() function with the phrase as its argument.
"""
from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_restful import Resource, Api
from checklanguage import identify


app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRET_KEY'

# Pretty CSS and HTML for website.
bootstrap = Bootstrap(app)


class LanguageForm(FlaskForm):
    """
    This is a form where users will type/paste snippets of the language they want to identify.
    """
    language = StringField('Enter a phrase:', validators=[DataRequired()])
    submit = SubmitField('Submit')


@app.route('/', methods=['GET', 'POST'])
def index():
    """
    This is the website's main route. Only one route needs to be defined for this application.
    """
    phrase = None
    language = None
    form = LanguageForm()
    if form.validate_on_submit():
        phrase = form.language.data
        language = identify(form.language.data)
        form.language.data = ''
    return render_template('index.html', form=form, phrase=phrase, language=language)


# Create an API
api = Api(app)

class TodoSimple(Resource):
    """
    This is our API class. It only exposes one call.
    """
    def get(self):
        return {'language': identify(request.form['data'])}

api.add_resource(TodoSimple, '/identify')


if __name__ == '__main__':
    app.run()
~~~

Notice that in addition to defining routes, this app also defines an API (more on that in a bit).

Another module, called `checklanguage.py`, holds the function that actually determines which language a phrase belongs to:

~~~python
#checkanguage.py
"""
This module contains a function, identify(), that returns the identity of a phrase's
language. Other models can be tested by importing a different CLASSIFIER.
"""
from sklearn.externals import joblib
from languages import LANGUAGES

CLASSIFIER = joblib.load('model/classifier.pkl')
TDIDF_TRANSFORMER = joblib.load('model/tdidf_transformer.pkl')
COUNT_VECT = joblib.load('model/count_vect.pkl')


# Because Naive Bayes maps its results to integers, it's necessary to map the language codes to ints
# len(languages) + 1 must equal "undetermined"
LANGUAGE_MAPPING = {14: "undetermined"}

for index, language in enumerate(LANGUAGES):
    LANGUAGE_MAPPING[index] = language


def identify(phrase):
    """
    Imports our model and necessary information and then identifies which language
    the phrase belongs to.
    """
    counts = COUNT_VECT.transform([phrase])
    tfidf = TDIDF_TRANSFORMER.transform(counts)
    predicted = CLASSIFIER.predict(tfidf)

    return LANGUAGE_MAPPING[predicted[0]]
~~~

Every time a user presses the "submit" button on our website, this function is called on the text that they've entered.

Now we need the actual HTML files that our site will render. Flask uses the jinja2 template engine to implement logic in HTML pages and pass variables back and forth from the server. Your HTML files should like in a directory called `templates`. [Create a file called `base.html`](https://raw.githubusercontent.com/camoverride/language-classifier/master/templates/base.html) to provide a basic template and [another called `index.html`](https://raw.githubusercontent.com/camoverride/language-classifier/master/templates/index.html) that will store the interactive form that users will be clicking (these files are on Github).

Now our web application should be ready to test out locally. First export the Flask environment variable:

~~~shell
$ export FLASK_APP=app.py
~~~

To actually run the server, type:

~~~shell
$ flask run
 * Serving Flask app "app"
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
~~~

All you have to do to test out the applicaton is to open a web browser and navigate to `http://127.0.0.1:5000/`. You can also test out the application's API by sending it a GET request:

~~~shell
$ curl https://language-classifier-app.herokuapp.com/identify -d "data=Le commerce n'est pas un monstre et la publicité" -X GET
~~~

Now it's time to actually deploy our application to the internet.

While Flask's local server is good for debugging, we need something a little more production-ready. That's where gunicorn comes in. Gunicorn's server is better than Flask's and is compatible with Heroku. To configure gunicorn, create a file called `Procfile` and add the line `web: gunicorn app:app` to this file. This lets Heroku know how we want our app to be deployed.

Heroku will also want to know the specific packages that the application depends on. We've used scikit, Flask, and a few other packages. If you've been working inside a clean virtual environment, simply type `pip3 freeze > requirements.txt`. If you've been working in global namespace, you can use the same command, but it might be cleaner to simply [copy the requirements file](https://raw.githubusercontent.com/camoverride/language-classifier/master/requirements.txt) from my repository.

Now you should head over to Heroku and [sign up for a free account](https://signup.heroku.com). After that's done, [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). More detailed instructions on working with Heroku for Python can be [found here](https://devcenter.heroku.com/articles/getting-started-with-python#introduction).

Once you've done that, make your way back to your terminal and type `heroku login` and enter your credentials. If you are working locally and haven't cloned my github repository, type `git init` and then `heroku create`. This creates a heroku app associated with your repository. Commit your work and push it by using `git push heroku master`.

That's all it takes! Your app is now deployed. To make sure that your application if being served, you can type `heroku ps:scale web=1` or check on Heroku's dashboard. To visit your new application, type `heroku open`. And that's it! Your machine learning application has been finished.

[Check it out](https://language-classifier-app.herokuapp.com/)!

-->
