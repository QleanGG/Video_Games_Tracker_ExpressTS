import requests
from bs4 import BeautifulSoup
import csv
import os
import threading

# Proxy configuration
proxy = {
    'http': 'h',
    'https': 'h'
}

# Lock for thread-safe writing to CSV
csv_lock = threading.Lock()

# Semaphore to limit the number of threads
thread_semaphore = threading.Semaphore(10)

# Timeout for requests
request_timeout = 10  # seconds

def scrape_game_info(url):
    """
    Scrape game information from a given URL.

    Args:
        url (str): The URL of the game page.

    Returns:
        dict: A dictionary containing the scraped game information.
    """
    try:
        print(f"Scraping game information from {url}...")

        # Send a GET request to the webpage with timeout
        response = requests.get(url, proxies=proxy, timeout=request_timeout)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Parse the HTML content
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find various elements on the page
            game_title = soup.find('h4', class_='game-module__name')   
            release_date_parent = soup.find('div', class_='game-module__release-date')  
            release_date_span = release_date_parent.find('span') if release_date_parent else None
            game_score = soup.find('a', class_="js-event-tracking")
            game_score_text = game_score.text.strip() if game_score else 'N/A'
            developer_element = soup.find('a', {'class': 'js-click-tag', 'data-click-tag': 'GameStats|Developer|1'})
            developer_text = developer_element.text.strip() if developer_element else 'N/A'
            publisher_element = soup.find('a', {'class': 'js-click-tag', 'data-click-tag': 'GameStats|Publisher|1'})
            publisher_text = publisher_element.text.strip() if publisher_element else 'N/A'
            genre_element = soup.find('div', class_='game-module__genres')
            first_genre = genre_element.find('a').text.strip() if genre_element and genre_element.find('a') else 'N/A'
            image_div = soup.find('div', class_='imgflare--boxart')

            if image_div:
                image_url = image_div.find('img')['src']

                # Download the image
                image_folder = '../public/game_images'
                os.makedirs(image_folder, exist_ok=True)
                image_name = f"{game_title.text.strip().replace(' ', '_')}.jpg" if game_title else 'game_image.jpg'
                image_path = os.path.join(image_folder, image_name)
                with open(image_path, 'wb') as img_file:
                    img_file.write(requests.get(image_url, proxies=proxy, timeout=request_timeout).content)
            else:
                image_url = 'N/A'
            
            # Find platforms
            platforms = set()
            platforms_element = soup.find_all('span', itemprop='device')
            for platform_element in platforms_element:
                platform = platform_element.text.strip()
                if platform == 'PS5':
                    platforms.add('Playstation 5')
                elif platform == 'XBSX':
                    platforms.add('Xbox Series X')
                elif platform == 'NS':
                    platforms.add('Nintendo Switch')
                elif platform == 'PC':
                    platforms.add('PC')

            # Format platforms
            formatted_platforms = ', '.join(platforms) if platforms else 'N/A'

            # Extract game information
            game_info = {
                'Title': game_title.text.strip() if game_title else 'N/A',
                'Release Date': release_date_span.text.strip() if release_date_span else 'N/A',
                'Game Score': game_score_text,
                'Developer': developer_text,
                'Publisher': publisher_text,
                'Genre': first_genre,
                'Platforms': formatted_platforms,
                'Image URL': image_url
            }

            print(f"Scraping of {game_info['Title']} successful.")
            return game_info

        else:
            print(f"Failed to retrieve webpage: {url}")
            return None
    except Exception as e:
        print(f"Failed to scrape game from {url}: {e}")
        return None

def scrape_and_write_game_info(url, writer):
    """
    Scrape game information from a given URL and write it to the CSV file.

    Args:
        url (str): The URL of the game page.
        writer (csv.DictWriter): Writer object for CSV file.

    Returns:
        None
    """
    try:
        game_info = scrape_game_info(url)
        if game_info:
            with csv_lock:
                writer.writerow(game_info)
    finally:
        thread_semaphore.release()  # Release semaphore

def main():
    csv_file = 'game_details.csv'
    fieldnames = ['Title', 'Release Date', 'Game Score', 'Developer', 'Publisher', 'Genre', 'Platforms', 'Image URL']
    
    # Open the CSV file once before the loop
    with open(csv_file, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        # Read links from CSV and scrape game information using threading
        with open('filtered_links.csv', 'r', newline='') as f:
            reader = csv.reader(f)
            next(reader)  # Skip header row

            threads = []
            for row in reader:
                url = row[0]
                thread = threading.Thread(target=scrape_and_write_game_info, args=(url, writer))
                thread.start()
                threads.append(thread)

                thread_semaphore.acquire()  # Acquire semaphore

            # Wait for all threads to finish
            for thread in threads:
                thread.join()

    print(f"All games information saved to {csv_file}")

if __name__ == "__main__":
    main()
