---
layout: post
title: How to Build a Machine Learning App from Scratch
categories: [data]
comments: true
published: true
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

In this article I'll teach you how to build a text classification app from scratch. You'll enter some text from a language, and the app will identify which language it comes from (English, Spanish, Vietnamese, etc). All it'll take you to get started is a rudimentary knowledge of Python, the command line, and Git.

Completing this project will give you a good sense of the "full stack" of technical concepts that data scientists encounter: data acquisition, data analysis, modeling, visualization, app development, and  deployment. I don't go super deeply into any of these topics, but if you're a beginner I think it's more important to know how data science works from end to end than it is to be an expert in any one topic.

This project can roughly be divided into three steps. The first involves downloading data from Wikipedia and saving it to a database. The second step is building a model that predicts a language when given some text. The third step is creating an app and deploying it to the web.

You can find the source code [on Github](https://github.com/camoverride/language-classifier). If you'd like a sneak peek at what the finished application looks like in the wild, [click here](https://language-classifier-app.herokuapp.com/).

<!--more-->


You can also test out the app's API:

`curl https://language-identifier-app.herokuapp.com/identify -d "data=Le commerce n'est pas un monstre et la publicité" -X GET`

As you go through this text, keep in mind that it refers to code that exists [in the repo](https://github.com/camoverride/language-classifier). I suggest going back and forth between this blog post and the repo as you build! Alternatively, clone this repo to your machine and explore the code as you read through this post. The sections below will assume that you _haven't_ cloned the repo and are building stuff from scratch.


## The Setup

Create an empty repository on [Github](https://github.com/) and call it `language-classifier`. Then clone it to your machine using a command like this: `git clone git@github.com:<your_username>/language-classifier.git`.

After the repo is downloaded, you'll need a virtual environment to install all your dependencies into. `cd` into the repo and create a virtual environment. I suggest using [Anaconda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/). After conda is installed, you'll create a virtual environment like this: `conda create --name lang_classif_app python=3.8` and activate it: `conda activate lang_classif_app`.

This virtual environment is where you'll install all the required dependencies. As you go through the code, you can install packages as needed. Alternatively, you can download the requirements from my repo and install them. Download the requirements like this: `curl https://raw.githubusercontent.com/camoverride/language-classifier/master/requirements.txt > requirements.txt`. And install them: `pip install -r requirements.txt`.

_A note on production_: in a normal development environment, you'll have two sets of requirements: one that you'll be using locally, and another for when your app is deployed. This is because some requirements, like jupyter notebooks, are only used during local development, so there's no point wasting space and time installing them on a remote server. Note that to keep things simple, when we eventually deploy this app, we'll be installing __all__ the requirements, even the ones we don't need.

Now you should have a repo setup and ready for some code!


## The Languages

In order to perform language classification, a data source is needed. A good source will have a large amount of text and accurate category labels (the categories being the identities of the _languages_). Wikipedia seems like a great place to start. Not only do they have a well-documented API, but it allows for [language-specific querying](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

Inside your repo, create a file called `languages.py`. This file will include the meta-data of our project - the details about the languages we'll classify. This data is taken [from here](https://en.wikipedia.org/wiki/List_of_Wikipedias):

~~~python
# languages.py
"""
The top 14 languages with the greatest number of articles (with the exception of Waray) were
selected from here: https://en.wikipedia.org/wiki/List_of_Wikipedias
"""

LANGUAGE_STATS = [ \
    # Language, code, articles, users
    ("English", "en", 6251473, 40971086),
    ("Cebuano", "ceb", 5525120, 75812),
    ("Swedish", "sv", 3417156, 762664),
    ("German", "de", 2538143, 3642783),
    ("French", "fr", 2300250, 4018582),
    ("Dutch", "nl", 2045761, 1123270),
    ("Russian", "ru", 1699933, 2924014),
    ("Italian", "it", 1674804, 2083500),
    ("Spanish", "es", 1661352, 6122869),
    ("Polish", "pl", 1457390, 1084637),
    ("Vietnamese", "vi", 1261526, 787725),
    ("Japanese", "ja", 1254240, 1751078),
    ("Egyptian Arabic", "arz", 1202137, 146896),
    ("Chinese", "zh", 1177896, 3051388)
    ]

LANGUAGES = [language for (language, _, _, _) in LANGUAGE_STATS]

# Map the language code to the name i.e. {"en": "English", ...}
mapping = {k: v for v, k, _, _ in LANGUAGE_STATS}
~~~

The languages I selected all have large numbers of speakers and lots of articles on Wikipedia. However, there is one weird outlier: Cebuano, a language spoken in the Philippines. This language has lots of articles because a bot [automatically generated them](https://www.quora.com/Why-are-there-so-many-articles-in-the-Cebuano-language-on-Wikipedia). Later on I'll talk about how we should deal with this problem (and if it's even a problem in the first place!).

`LANGUAGE_STATS` and `LANGUAGES` are important and we'll import them into some of the modules we create later on.


## Assemble a Corpus

Inside the repository, create a directory called `scraper`. Scripts to download and store data will live here. Inside this directory, create another directory called `data` and a file called `get_data.py`. Make sure to read the documentation in the code below as you go along:

~~~python
# get_data.py
"""
This module exposes the class GetWikiArticles which is used to download and sanitize Wikipedia
articles, downloading them as .txt files to a specified directory. I recommend downloading less
than 100 articles per language at a time, as Wikipedia's servers might decide to block or limit
your IP address.

The number of articles that are downloaded are set as a fraction of the total number of Wikipedia
articles for the given language. The default fraction is 0.00001. For instance, there are 6 million
articles in English, so: 6000000 * 0.00001 = 60 articles will be downloaded. However, keep in mind
that some languages like Cebuano are over-represented, so depending on how you intend this app to
be used, you may want to modify the data distribution by language.
"""
import os
import re

import requests

import sys
sys.path.append("..")
from languages import LANGUAGE_STATS


class GetWikiArticles(object):
    """
    This is an object with the public method write_articles(language_id, number_of_articles,
    db_location). This writes sanitized articles to text files in a specified location.
    """
    def __init__(self, data_path):
        self.data_path = data_path


    def _get_random_article_ids(self, language_id, number_of_articles):
        """
        Makes a request for random article ids. "rnnamespace=0" means that only articles are chosen,
        as opposed to user-talk pages or category pages. These ids are used by the _get_article_text
        function to request articles.
        """
        query = f"https://{language_id}.wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit={str(number_of_articles)}&rnnamespace=0"

        # Reads the response into a json object that can be iterated over.
        try:
            data = requests.get(query).json()

        except requests.exceptions.ConnectionError:
            print("\nYou are requesting too much data! Wikipedia is blocking you. Wait a bit and try again.")
            sys.exit()

        # Collects the ids from the json.
        ids = [article["id"] for article in data["query"]["random"]]

        return ids


    def _get_article_text(self, language_id, article_id_list):
        """
        This function takes a list of articles and yields a tuple (article_title, article_text).
        """
        for idx in article_id_list:
            idx = str(idx)
            query = f"https://{language_id}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&pageids={idx}&redirects=true"

            data = requests.get(query).json()

            try:
                title = data["query"]["pages"][idx]["title"]
                text_body = data["query"]["pages"][idx]["extract"]
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
                return match_tag.sub("", text)

            yield title, clean(text_body)


    def write_articles(self, language_id, number_of_articles):
        """
        This writes articles to the location specified.
        """
        articles = self._get_random_article_ids(language_id, number_of_articles)
        text_list = self._get_article_text(language_id, articles)

        for title, text in text_list:
            # Slugify the title (make a valid UNIX filename)
            title = "".join(char for char in title if char.isalnum())

            # Write the data.
            os.makedirs(f"{self.data_path}/{language_id}", exist_ok=True)
            with open(f"{self.data_path}/{language_id}/{title}.txt", "w+") as wiki_file:
                wiki_file.write(text)


if __name__ == "__main__":

    # Location the actual articles will be downloaded
    DATA_PATH = "data"

    # What proportion of all the wiki articles are downloaded.
    # There are 6 million English articles, so 6000000 * 0.00001 = 60 articles.
    DATA_FRAC = 0.00001

    article_downloader = GetWikiArticles(DATA_PATH)
    
    for language, language_id, num_articles, _ in LANGUAGE_STATS:
        num_articles_to_download = int(num_articles * DATA_FRAC)

        # Debug
        print(f"\nDownloading {num_articles_to_download} articles in {language} ", end="")

        # Download articles for the given language.
        article_downloader.write_articles(language_id, num_articles_to_download)
~~~

Notice that the class `GetWikiArticles` has two private methods `_get_random_article_ids` and `_get_article_text`: these methods make use fo the existing Wikipedia API to grab random id's and the articles associated with them. The public method `write_articles` actually saves them to your computer.

At the bottom of this module, `DATA_FRAC` ensures that you're not downloading too much data (English Wikipedia alone is 70 gigs) and `num_articles_to_download` ensures that the number of articles downloaded for each language matches the frequency of each language.

When you run this module with `python get_data.py`, data gets down loaded to the `data` folder. Data is organized by language and saved into text files. This is what the directory structure will look like:

~~~shell
data
    en
        basketball.txt
        teenagemutantninjaturtles.txt
        capybaras.txt
        greensboroohio.txt
        ...
    es
        tierra.txt
        futbol.txt
        CiudaddeMéxico.txt
        ...
    fr
        Biblioteca.txt
        ...
    ...
~~~

`get_data.py` also performs some rudimentary cleaning with the following [regular expression](https://en.wikipedia.org/wiki/Regular_expression) that matches unwanted bits of text: `r'(<[^>]+>|\[\d+\]|[,.\'\"()])'`. Text that matches this is then deleted.

However, even after this cleaning the data is __far from perfect__. Ideally, footnotes, page-headers, and anything else that's not in the body of the document should be removed. However, I'm following the [Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle) when it comes to development: 80% of the work will be accomplished in the first 20% of a project's lifespan. So rather than chasing diminishing returns, we'll leave the data in rough shape and see if our classifier is good enough to deal with a noisy data set.

_A note on production_: in a production environment, this code will live on a server somewhere on the web. Instead of being invoked by the user with `python get_data.py` it'll probably be set to automatically download more data when it becomes required. However, in the specific case of Wikipedia, all the data is [publically available](https://en.wikipedia.org/wiki/Wikipedia:Database_download). But for the purposes of this project, we're pretending that data needs to be downloaded incrementally, like what you might encounter in a job as a data scientist.


## Build a Database

Now that we have some data to work with, let's save it to a SQL database. Having the data in SQL format will make it easier to work with and host online (see _A note on production_ below). It'll also allow a data analyst to make queries and explore the data, like `SELECT title FROM wiki_data WHERE language = "en"`. Create another file in the `scraper` directory and call it `create_database.py`:

~~~python
# create_database.py
"""
This module takes Wikipedia texts and writes them to a SQL database. The database is organized
by language and by whether an article is in the training or the test set. Inspect the database like:

$ sqlite3 language_data.db
> SELECT language, title FROM wiki_data WHERE language = "en";

This does NOT append to an existing database: it creates a new one from scratch.
"""
import glob
import numpy as np
import sqlite3


class Database(object):
    """
    This creates a SQLite database with the columns title, language, and text_data, which
    are all the values we'll need to train some ML algorithms!
    """

    def __init__(self, database_name):
        self.database_name = database_name

        # Connect to the database.
        self.conn = sqlite3.connect(f"{self.database_name}.db")
        self.c = self.conn.cursor()

        # Create a table.
        self.c.execute("""CREATE TABLE wiki_data
                     (title text primary key, language text, text_data text)""")

        # Commit the changes and clean up.
        self.conn.commit()
        self.conn.close()


    def write_data(self, language, text_data, title):
        """
        This method writes the data to the database.
        """
        # Connect to the database.
        self.conn = sqlite3.connect(f"{self.database_name}.db")
        self.c = self.conn.cursor()

        self.c.execute(f"""INSERT INTO wiki_data VALUES ('{title}', '{language}', '{text_data}')""")

        # Commit the changes and clean up.
        self.conn.commit()
        self.conn.close()


if __name__ == "__main__":

    DATABASE_NAME = "language_data"
    DATA_LOCATION = "data"

    # Get all the file paths from the data directory
    file_paths = glob.glob(f"./{DATA_LOCATION}/**/*.txt", recursive=True)

    # Initialize the database
    db = Database(DATABASE_NAME)

    for f in file_paths:
        # Get the language id from the path.
        language = f.split("/")[-2]

        # Get the text of the document.
        with open(f) as t:
            text = t.read()

        # Get the title from the path.
        title = f.split(".")[-2].split("/")[-1]

        # Write to the database.
        db.write_data(language, text, title)
~~~

When we run this script with `python create_database.py` all the data is saved into a database called `language_data.db`. We'll use this database in the next section, where we train a model. Keep in mind that SQL statements that involve variables like `f"""INSERT INTO wiki_data VALUES ('{title}', '{language}', '{text_data}')"""` need to be escaped properly - leaving single- or double-quotes in tact can cause this statement to get scrambled.

_A note on production_: in a production environment, this SQL database will live on a server somewhere on the web: maybe on [GCP](https://cloud.google.com/) or [AWS](https://aws.amazon.com/free). It'll be set to add more data from the `data` directory as it becomes available (`data` will also live on a server somewhere).


## Create a Classification Model

Now that we have some data, let's use it to train a model. This model will ultimately accept some text and produce a category, like the pseudocode below:

~~~python
print(model.predict(["This is some text in English!"]))
# ["en"]
~~~

Data scientists usually use _notebooks_ to build models. A notebook is different from a standard python module because you can execute blocks of code independently. Notebooks look more like essays than sets of computer instructions.

Create a new directory in your repo called `modeling`. Inside it download my jupyter notebook: `curl https://github.com/camoverride/language-classifier/blob/master/modeling/create_model.ipynb > create_model.ipynb`. Then load it up: `jupyter lab`. Also, in this directory create another directory called `models`.

I recommend reading through this notebook on your computer before returning to this blog post. It will explain all the details of loading up data, exploring it, creating a model, and testing it. Ultimately, the notebook will create a model inside the `models` folder. Later, we'll create a module that loads this model and applies it.

After you use the notebook to generate the model, we need a module that will expose the model to the rest of our software. In the project's base directory, create a file called `classify_language.py`:

~~~python
# classify_language.py
"""
This module exposes the function identify, which is used to classify the language of a span
of text. The global variables MODEL_NAME and MODEL_VERSION determine which model the API
will serve.
"""
import joblib


# Global variables for selecting the model.
MODEL_NAME = "NB_classif"
MODEL_VERSION = "1"
MODEL_PATH = f"modeling/models/{MODEL_NAME}/{MODEL_VERSION}"


# Load the model components.
classifier = joblib.load(f"{MODEL_PATH}/classifier.pkl")
tfidf_transformer = joblib.load(f"{MODEL_PATH}/tfidf_transformer.pkl")
count_vect = joblib.load(f"{MODEL_PATH}/count_vect.pkl")
label_encoder = joblib.load(f"{MODEL_PATH}/label_encoder.pkl")

# Define a class that performs all the steps in our model pipeline.
class ModelPipeline(object):
    def __init__(self, classifier, count_vect, tfidf_transformer, inverse_encoder):
        self.classifier = classifier
        self.count_vect = count_vect
        self.tfidf_transformer = tfidf_transformer
        self.inverse_encoder = inverse_encoder
        
    def classify(self, text):
        """
        This method accepts a list of phrases and returns a list of the languages that
        they belong to. In production, only a list of len=1 is allowed.
        """
        counts = self.count_vect.transform(text)
        tfidf = self.tfidf_transformer.transform(counts)
        pred = self.classifier.predict(tfidf)
    
        return self.inverse_encoder.inverse_transform(pred)
    
model = ModelPipeline(classifier, count_vect, tfidf_transformer, label_encoder)
~~~

If you want, you can test out the `model` function yourself. Give it a list of texts and check its output: `model.classify(["this is some English", "das ist Deutsch"])`


## Make a Web API

Now it's time for the fun part. In this section, we'll use `flask_restful` to create a simple web API to serve the model.

In the project's base directory, create a file called `api.py`. Add the following code:

~~~python
# api.py
"""
This is a simple restful API that exposes a single route, "identify", which returns the identity
of a language given a sample of its text. To test this API manually, use the following shell command:

curl http://127.0.0.1:5001//identify -d "data=Le commerce n'est pas un monstre et la publicité" -X GET
"""

from flask import Flask, request
from flask_restful import Resource, Api

from classify_language import model
from languages import mapping


app = Flask(__name__)
api = Api(app)


# This is our API class. This accepts text data and returns the language abbreviation.
class LanguageIdentifier(Resource):
    def __init__(self):
        self.model = model

    def get(self):
        # The final [0] prevents the user from sending a large list of requests.
        response = self.model.classify([request.form["data"]])[0]
        return {"language": mapping[response]}


if __name__ == "__main__":
    api.add_resource(LanguageIdentifier, "/identify")

    app.run(host="127.0.0.1", port=5001, debug=True)
~~~

To run this server locally, type `python api.py`.

To test out its response, send a request via your command line:

`curl http://127.0.0.1:5001//identify -d "data=Le commerce n'est pas un monstre et la publicité" -X GET`

You'll get the response __French__!

_A note on production_: in a production environment, this will live on a special modeling server, maybe a [tensorflow server](https://www.tensorflow.org/tfx/guide/serving). However, to keep things simple, in the next section we're going to combine this code with the code that actually generates our website, so the module `api.py` will never actually be used in production.


## Make a Web Application

Now that we've built a simple web API, let's build a web application! This app will have a nice-looking front end and a text box where a user can paste some text they want identify. The user's input will be sent to our model API and the response will be returned to the web app, where it will be displayed to the user. Notice that we're copying code from `api.py` into this module - we're only going to deploy _one_ server, so our functionality needs to all be in the same place.

In your base directory, create a file called `app.py`:

~~~python
# app.py
"""
This is a flask server. This renders a web page and handles user requests. When a user
enters a phrase, this server sends a request to the identify api server, which returns
the identity of the language. This is then rendered on the webpage.

Test the API:
    curl http://127.0.0.1:5000//identify -d "data=Le commerce n'est pas un monstre et la publicité" -X GET
"""
from flask import Flask, request, render_template
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from flask_restful import Resource, Api
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
import requests

from classify_language import model
from languages import mapping


app = Flask(__name__)
api = Api(app)
app.config["SECRET_KEY"] = "SECRET_KEY"

# Pretty CSS and HTML for website.
bootstrap = Bootstrap(app)

# This is our API class. This accepts text data and returns the language abbreviation.
class LanguageIdentifier(Resource):
    def get(self):
        # The final [0] prevents the user from sending a large list of requests.
        response = model.classify([request.form["data"]])[0]
        return {"language": mapping[response]}

api.add_resource(LanguageIdentifier, "/identify")


# This is a form where users will type/paste snippets of the language they want to identify.
class LanguageForm(FlaskForm):
    language = StringField("Enter a phrase:", validators=[DataRequired()])
    submit = SubmitField("Submit")


# This is the website's main route. Only one route needs to be defined for this application.
@app.route("/", methods=["GET", "POST"])
def index():
    phrase, response = None, None
    form = LanguageForm()
    if form.validate_on_submit():
        phrase = form.language.data
        response = model.classify([phrase])[0]
        form.language.data = ""
    return render_template("index.html", form=form, phrase=phrase, language=mapping[response])


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=True)
~~~

This application needs some HTML to serve, so create a new folder called `templates` and add these two files inside, `index.html` where the body of your website will live and `base.html`, which contains the header and footer of the application. I suggest copying these files directly from the Github repo:

- [index.html](https://raw.githubusercontent.com/camoverride/language-classifier/master/templates/index.html)
- [base.html](https://raw.githubusercontent.com/camoverride/language-classifier/master/templates/base.html)

The contents of `base.html` inherit CSS from the bootstrap library. Then the contents of `index.html` are combined with this to give you the final website! When you run your app, it'll automatically take this HTML for you, combine them, and display it in your browser.

Run this app by typing `python app.py`. This app can be viewed in your browser at `http://127.0.0.1:5000/` or alternatively `http://localhost:5000/`.

You can also test out the API living on this server with this command:
`curl http://127.0.0.1:5000//identify -d "data=Le commerce n'est pas un monstre et la publicité" -X GET`


## Deploying the App to the Web

Now it's time to actually deploy our application to the internet. In real life `app.py` and `api.py`_should_ be deployed separately: in a real production scenario, it makes a lot of sense to split up these two servers: they perform different tasks, use different dependencies, and might behave better when run on different types of servers. But to keep things simple, we're going to deploy everything in this repo as a single sever: the front end, the model, and even the data (if it's version controlled with Git). Luckily, there's not so much redundant code and data that the server will crash, but keep in mind that professionals __will__ split this project into smaller pieces.

Now you're ready to deploy the app to Heroku!

First, create a file called `Procfile` and add the line `web: gunicorn app:app` to this file. This lets Heroku know how we want our app to be deployed.

Heroku will also want to know the specific packages that the application depends on. We've used scikit, Flask, and a few other packages. If you've been installing requirements on your own, you can save them to a file with `pip freeze > requirements.txt`. However, not all the packages will work on Heroku's servers - you might need to remove some if you've accidentally installed extras. I've already done that for you in [my requirements file](https://raw.githubusercontent.com/camoverride/language-classifier/master/requirements.txt).

Now you should head over to Heroku and [sign up for a free account](https://signup.heroku.com). After that's done, [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). More detailed instructions on working with Heroku for Python can be [found here](https://devcenter.heroku.com/articles/getting-started-with-python#introduction).

Once you've done that, make your way back to your terminal and type `heroku login` and enter your credentials. If you're working locally and haven't cloned my github repository, type `git init` and then `heroku create`. This creates a heroku app associated with your repository. Commit your work and push it by using `git push heroku master`.

That's all it takes! Your app is now deployed. To make sure that your application if being served, you can type `heroku ps:scale web=1` or check on Heroku's dashboard. To visit your new application, type `heroku open`. And that's it! Your machine learning application has been finished.

[Check it out](https://language-identifier-app.herokuapp.com/)!

Or send the API a request: 
`curl https://language-identifier-app.herokuapp.com/identify -d "data=Le commerce n'est pas un monstre et la publicité" -X GET`
