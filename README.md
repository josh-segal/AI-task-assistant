# Notion Database AI assistant

# Table of Contents

1. [Description](#description)
2. [Tech Base](#tech-base)
3. [Key Features](#key-features)
4. [Usage](#usage)
5. [Roadmap](#roadmap)
6. [Acknowledgements](#acknowledgements)

## Description

The purpose of the project is to create an AI database assistant designed to streamline the task management process by automatically detecting task types and key entities within text utterances. Leveraging state-of-the-art Natural Language Processing (NLP) models, the assistant aims to populate a database with tasks such as todos, events, and reminders, thereby reducing the time and complexity associated with managing various tasks across multiple applications. Motivated by the desire to simplify task management and minimize the need for disparate applications, the project endeavors to provide users with a unified solution for capturing, organizing, and managing tasks efficiently.

## Tech Base
- **Programming Language**: Python, JavaScript
- **Libraries**: Hugging Face Transformers, pandas, numpy, scikit-learn, TensorFlow, Keras
- **Version Control**: Git
- **Testing Frameworks**: None (Currently)
- **Documentation Tools**: Detailed comments

## Key Features

- Highly accurate NLP models that facilitate precise task prediction and rich task description generation.
- Ease of usability, minimizing user effort with fewer clicks compared to traditional calendar or todo list applications.

## Usage

Interpret user-input tasks and generate rich task descriptions autonomously. Users simply need to input tasks they wish to remember, and the program will automatically interpret the task, categorize it as a todo, reminder, or calendar event, and store it accordingly.

In its current state, the project operates on localhost and is linked exclusively to my personal Notion database. However, efforts are underway to enhance flexibility and usability, with plans to make the environment accessible to a broader user base. 

## Roadmap

- Robust testing framework
- NER for rich task descriptions
- Automatic calender placement for events
- Extend user base

## Acknowledgements

The Notion API Quickstart guide [Build your first integration](https://developers.notion.com/docs/create-a-notion-integration) was instrumental in guiding the project's integration with the Notion platform. 

---
