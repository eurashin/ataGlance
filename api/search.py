# The functions related to searching the GoogleNewsAPI for topic images/creating timelines
# API Key 95d7d94fc3bd47e79877977d6ed0efd5
from newsapi import NewsApiClient
from datetime import datetime
import urllib
import pandas as pd
import matplotlib.pyplot as plt
from scipy.signal import find_peaks
import numpy as np 
import random

import requests
from PIL import Image
from io import BytesIO

def searchImagesBlank(tags, startDate): 
    articles = pd.read_csv('articles.csv', index_col=0)
    articles['publishedAt'] = articles['publishedAt'].astype("datetime64")
    # Remove rows with no image
    articles = articles[articles['urlToImage'] != "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png"]
    dates = dateHistogram(articles)
   
    urls = []
    for date in dates: 
        images = articlesAtDate(articles, date)[['urlToImage']]
        index = random.randint(0, len(images) - 1)
        randomImageUrl = images.iloc[index][0]
       
        urls.append(randomImageUrl)
    return urls


def searchImages(tags, startDate): 
    articles = requestSources(tags, startDate)
    dates = dateHistogram(articles)
    
    for date in dates: 
        images = articlesAtDate(articles, date)[['urlToImage']]
        index = random.randint(0, len(images) - 1)
        randomImageUrl = images.iloc[index][0]
        urls.append(randomImageUrl)

    return urls
        
   
# Finds the dates for which the number of news articles published
# is 2 standard deviations from the mean number of news articles
# published per day for this topic
def dateHistogram(df):
    # Count how many articles per day
    hist = df.groupby(df["publishedAt"].dt.date).count() 
    counts = hist[['content']]
   
    # Calculate which day has unusual number of articles
    std = np.std(counts)
    row,_ = np.where(counts >= (std * 2))
    dateList = list(hist.index) # Get the dates for each row of histogram
    peakDates = [dateList[x] for x in row]

    return(peakDates)

def articlesAtDate(articles, date): 
    return(articles.loc[articles['publishedAt'].dt.date == date])

# Requests all of the relevant sources at a specific page
def requestSources(tags, startDate):
    # Init
    newsapi = NewsApiClient(api_key='95d7d94fc3bd47e79877977d6ed0efd5')
    endDate = datetime.now().strftime('%Y-%m-%d')

    # Encode the tags
    tagsEncoded = '&'.join(tags)

    # Request the articles for the specified page
    articles = newsapi.get_everything(q=tagsEncoded,
                                      from_param=startDate,
                                      to=endDate,
                                      language='en',
                                      sort_by='relevancy', 
                                      page_size = 100, 
                                      page = 1)

    # Turn the articles to a data frame
    df = pd.DataFrame(columns = ['source', 
                                 'author', 
                                 'title', 
                                 'description', 
                                 'url', 
                                 'urlToImage', 
                                 'publishedAt', 
                                 'content'])
    for i in range(len(articles['articles'])): # Add each row
        art = articles['articles'][i]
        df.loc[i] = [art['source'], 
                     art['author'], 
                     art['title'], 
                     art['description'], 
                     art['url'], 
                     art['urlToImage'], 
                     art['publishedAt'], 
                     art['content']]
    df = df[df['urlToImage'] != "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png"]
    df['publishedAt'] = df['publishedAt'].astype("datetime64")
    return(df)

