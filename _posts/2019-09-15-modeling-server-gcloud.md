---
layout: post
title: How to Create a Modeling Server on Google Cloud
categories: [code]
comments: true
published: true
---

This is how I create modeling servers on Google Cloud. Below I've listed the individual steps. However, keep in mind that I tend to bundle the programmatic portions of these steps into a bash script so that I'm not copy-pasting each line. Also, the Google Cloud CLI can be used to create projects and instances instead of the GUI. However, I find that using the GUI doesn't add much more time, and it can be a useful tool for visualizing your data usage and projects. Get familiar with both!

<!--more-->

## Instance setup

First install the [Google Cloud SDK](https://cloud.google.com/sdk/install) which will give you command line tools. Test that it's been properly installed by typing `gcloud` into a terminal.

Then log into the [Google Cloud Console](https://console.cloud.google.com/home/dashboard) and create a new project. I named mine `nf2-project`, which Google renamed `nf2-project-253119`.

Then navigate to the **Compute Engine** tab and click on **VM Instances**. If you're just experimenting, create a smaller instance. Google is generous enough to list the hourly cost in the same window that you use to create the instance. I named my instance `nf2-notebook-server`.

After the instance is created, click on the **SSH** dropdown and select **View gcloud command**. The command should look something like this: `gcloud beta compute --project "nf2-project-253119" ssh --zone "us-west2-a" "nf2-notebook-server"`. Pop open a terminal and enter the command. Now you've ssh'd into your instance!


## Conda environment setup

Now install anaconda (or miniconda) on your instance. [These directions](https://www.digitalocean.com/community/tutorials/how-to-install-anaconda-on-ubuntu-18-04-quickstart) can be summarized as follows: first download the executable: `curl -O https://repo.anaconda.com/archive/Anaconda3-2019.03-Linux-x86_64.sh` and then run it: `bash Anaconda3-2019.03-Linux-x86_64.sh`

Make sure that anaconda is in your path. Open up your `.bashrc` file (using `vim` most likely) and add this line to the end: `PATH=~/anaconda3/bin:$PATH`. Now activate the changes you've made: `source ~/.bashrc`.

Test that anaconda is installed by typing `conda`.


## Jupyter lab setup

Install jupyter lab: `conda install jupyterlab` and then generate the required configuration file: `jupyter-lab --generate-config`.

Use the following commands to add some lines to your config. These lines allow the local port that the jupter lab listens to to be forwarded to your local machine. Replace my username, `camesmith`, with your own. If you don't know your username, type `whoami`.

~~~terminal
echo "c = get_config()" >> /home/camesmith/.jupyter/jupyter_notebook_config.py
echo "c.IPKernelApp.pylab = 'inline'" >> /home/camesmith/.jupyter/jupyter_notebook_config.py
echo "c.NotebookApp.token = ''" >> /home/camesmith/.jupyter/jupyter_notebook_config.py
~~~

Start jupyter lab: `jupyter lab --no-browser --port=8080`

Now open a new terminal tab so that you are no longer pointing to the google cloud instance. In that terminal run the following command: `ssh -i ~/.ssh/google_compute_engine -N -L 8080:localhost:8080 camesmith@35.236.43.217`. Replace your `username@ip-addr` with the username/ip address from your instance. Also, make sure that you're pointing to the correct ssh key: `-i ~/.ssh/google_compute_engine`.

Open a web browser and navigate to `localhost:8080`. You're ready to start modeling!


## Sharing

If you would like to share your notebooks with other people online, you can do this by adding their public ssh keys to the instance. In the Google Cloud Console, navigate to the **Compute Engine** tab and select the virtual machine you want to add your collaborator to. On the top click **Edit** and then scroll down to the section that says **Show and edit**. Expand this and paste your collaborator's SSH key into the box.

Your collaborator can access the instance the same way you do. If jupyter lab is already running, they can run the ssh port forwarding command `ssh -i ~/.ssh/google_compute_engine -N -L 8080:localhost:8080 username@35.236.43.217`, with your username replaced by theirs. Open a browser, navigate to `localhost:8080`, and see all your notebooks.


## Conclusion

Setting up a shared development environment for building models can be tricky! But hopefully this has helped you be more productive and collaborative in your data science work.
