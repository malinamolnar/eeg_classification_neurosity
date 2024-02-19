This repository contains the code for the website I have built as part of my Master's Thesis "EEG-based emotion classification using Transfer Learning". All development is done using Azure services.

<h4>1. Model training & Deployment</h4>
This step is completed using Azure Machine Learning Studio. It presents several advantages such as:

- automatic model logging (models were developed using Keras&Tensorflow)

- easy deployment to an endpoint
  
- auto-logging for the loss or user defined metrics

<h5>Note: The notebooks and the saved model are NOT included in the repository, as they were stored in Azure.</h5> 

<h1></h1>

<h4>2. Website development & Deployment</h4>
Once the chosen model was deployed to an endpoint, we can use it for inference.
The website has the following features:

- it creates a real-time connection to the Crown Neurosity Headband (https://neurosity.co) and displays the signals

- collects the data (EEG signals) from headset and sends it to inference

- shows the result from the classification: whether the emotion is positive or negative based on the EEG signals from the headband

<h5>Note: The repository contains the code for this website, which is written in React.</h5> 



