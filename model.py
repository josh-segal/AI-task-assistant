import torch
import tensorflow as tf
from tensorflow import keras
import pandas as pd
from transformers import DistilBertTokenizerFast, TFDistilBertModel
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelBinarizer
from tensorflow.keras.layers import Dense, Input
# import tf.keras.optimizers.legacy.Adam as Adam
# import tf.keras.losses.CategoricalCrossentropy as CCELoss

## load dataset
df = pd.read_csv('intent_classification_task_data.csv')
## preprocess into list of strings
task_list = []
for task in df['text']:
    task_list.append(task)

## tokenize dataset
tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased')
tokenized_data = tokenizer(task_list, return_tensors='np', padding=True)

## dict for keras
tokenized_data = dict(tokenized_data)

## one hot encode labels
labels = df['label']
encoder = LabelBinarizer()
labels = encoder.fit_transform(labels)

## initialize model
distilbert_model = TFDistilBertModel.from_pretrained('distilbert-base-uncased')

## specific output layer
max_length = 28
input_layer = Input(shape=(max_length,))
distilbert_output = distilbert_model(input_layer)[0]
output_layer = Dense(3, activation='softmax')(distilbert_output)

model = tf.keras.Model(inputs=distilbert_model.input, outputs=output_layer)

# model.compile(
#   optimizer=tf.keras.optimizers.legacy.Adam(learning_rate=(3e-5)), 
#   loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True, label_smoothing=0.1),
#   metrics=['accuracy'])

# model.fit(tokenized_data, labels)
# ## split the data into train and test sets
# # X_train, X_test, y_train, y_test = train_test_split(tokenized_data, labels, test_size=0.3, random_state=42)


