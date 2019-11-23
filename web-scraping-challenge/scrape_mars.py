import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time


def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)


def scrape():
    browser = init_browser()

    # ------- GET THE LATEST NEWS --------------
    # Visit the nasa news site
    url = "https://mars.nasa.gov/news/"
    browser.visit(url)
    time.sleep(1)

    html = browser.html
    soup = bs(html, "html.parser")

    # get the headline and the title
    headlines = soup.find('ul', class_='item_list'). \
        find('li', class_='slide')

    title = headlines.find('h3').text
    par = headlines.find('div', class_='article_teaser_body').text

    # ------- GET THE FEATURED MARS IMAGE --------------
    # visit the jpl site
    url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url)
    time.sleep(1)

    html = browser.html
    soup = bs(html, "html.parser")

    # get the featured mars image url
    featured_image_url = \
        soup.find('section', class_="centered_text clearfix main_feature primary_media_feature single"). \
            find('a', class_='button fancybox')['data-fancybox-href']

    # ------- GET MARS WEATHER --------------
    url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url)
    time.sleep(1)

    html = browser.html
    soup = bs(html, "html.parser")

    # scrape weather
    mars_weather = soup.find_all('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text')
    mars_weather = mars_weather[0].text

    # ------- GET MARS FACTS --------------
    url = "https://space-facts.com/mars/"
    browser.visit(url)
    time.sleep(1)

    html = browser.html
    soup = bs(html, "html.parser")

    tables = pd.read_html(url)
    mars_facts = tables[0]
    mars_facts.columns = ['Fact Name', 'Fact Value']

    # convert to html
    mars_facts_html = mars_facts.to_html()

    # ------- GET MARS HEMISPHERE DATA --------------
    # go to web page
    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url)
    time.sleep(1)

    # get data for each hemisphere
    hemispheres = ['Cerberus', 'Schiaparelli', 'Syrtis Major', 'Valles Marineris']

    hemi_datas = []
    # go to each himisphere link
    for hemisphere in hemispheres:
        print(f'--------')
        print(f'searching for: {hemisphere}')
        browser.click_link_by_partial_text(hemisphere)
        time.sleep(1)

        # scrape the html
        html = browser.html
        soup = bs(html, "html.parser")

        # get image and title
        img_url = soup.find_all('div', class_='downloads')[0].find_all('li')[1].find('a')['href']
        title = soup.find_all('div', class_='content')[0].h2.text
        print(f'found!\ntitle: {title}\nimage url: {img_url}')

        browser.back()

        # Store data in a dictionary
        hemi_data = {
            "img_url": img_url,
            "title": title,
        }

        # append to list of all hemispheres
        hemi_datas.append(hemi_data)

    data = [
        {'headline': title,
         'teaser': par,
         'mars_featured_img_url': featured_image_url,
         'mars_weather': mars_weather,
         'mars_facts_html': mars_facts_html,
         'hemispheres': hemi_datas
         }
    ]
    return data