import json
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
import os

def download_image(url, filepath):
    try:
        response = requests.get(url)
        image = Image.open(BytesIO(response.content))
        # Save image as WebP
        image.save(filepath, "WEBP")
        print(f"Successfully downloaded {filepath}")
    except Exception as e:
        print(f"Error downloading {filepath}: {e}")


def fetch_image_url(query,gameName):
    search_url = f"https://www.igdb.com/games/{query}"

    proxy = {
    'http': 'http://guy:SNNCpV1vE0pf4TN@unblocker.netnut.io:5959',
    'https': 'http://guy:SNNCpV1vE0pf4TN@unblocker.netnut.io:5959'
    }

    headers = {
        "x-netnut-html-render": "false",
        "authority": "www.igdb.com",
        "method": "GET",
        "path": f"/games/{query}",
        "scheme": "https",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
        "Cookie": "force-login=0; visited_games=217590%2C125715; country=376; force-login=1; force-login=0; cf_clearance=w8YCyFT6pFDWLbOpGjk62MSBeg_6IdpHSw.P01ZaYPc-1717076795-1.0.1.1-gQLyKe5xECIa2LmaGsrDTj.pNuP4ABFTNprJLGLO1gX157eUyQyx_ptJ5O5VzZGmwTGL5W3MlFRIxsebk0W7Ng; __cf_bm=iBVtfoIx7UPZvEKmKqnHcr6U5WKsca144pslXFDPE1o-1717094607-1.0.1.1-_QLtKjVL03QQ.LKmwpfFjITmyw_fihwlorlHbxEDHDrsy_3OWv119NGcuiBbFfyVG7NVmlvm.gF3wAof3VFOZg; ls=Chinatown-Detective-Agency; OptanonConsent=isIABGlobal=false&datestamp=Thu+May+30+2024+21%3A48%3A47+GMT%2B0300+(Israel+Daylight+Time)&version=202210.1.0&consentId=5bfe6e4f-dbe6-471f-88fe-c8497143f1ea&interactionCount=1&landingPath=NotLandingPage&groups=BG41%3A1%2CC0001%3A1%2CC0003%3A1%2CC0002%3A0%2CBG42%3A0%2CC0004%3A0&hosts=H24%3A0%2CH10%3A0&genVendors=&AwaitingReconsent=false; mp_c9b6d5ed3e9e4ad20b3fac745421a240_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A18f6d5276b52da-00130e3b39c761-26001d51-384000-18f6d5276b52da%22%2C%22%24device_id%22%3A%20%2218f6d5276b52da-00130e3b39c761-26001d51-384000-18f6d5276b52da%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D; csrf=3OBgJh4UxUQFzT8bQDYAkI8I082gOqxJb3P-RJUMkBsjld3CZghjnQJJ7aMjF2qCHR8pSR-ucJGrV4jpfH4Eow; _server_session=nkV82IKI0bssJ1nHnUkbrqSqQv%2Fz%2FWYfrXwLwmfNPdT9sK4uqnMHrC%2FUohOxCszeIo7btsZT%2FTVFEslcRcmz5JdydtF6q5%2Fgk0bO7rFiwr8BchOlV%2B%2BPqDqhcBug9eM0lC9HyKXg6heraJYrYDWyi%2BzcZ5F9%2BxeVTMsyPIc3a48dEJ3UIWtUvGQSIXqDBpFykPyjlvGhDVFDb3SXfo0B87cYyAvBfcE2TcSFXHglj%2FiQAFb6uOTSqrI74lejI5xCWhyo4Lsm8vSIFq%2B37n0tgRLeLSEw7%2FoDoR02wO47xcLn0Otzkst0%2BGcwZ3S4C7ubnH%2FhF7X82Nu772k%3D--NoPbrYSfTxCoyMd%2F--SwoBDEBlRl%2BPI11betzQ1g%3D%3D",
        "Priority": "u=0, i",
        "Referer": f"https://www.igdb.com/search?c=1&q={query.replace('-', '%20')}",
        "Sec-Ch-Ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    }

    response = requests.get(search_url, headers=headers, proxies=proxy, verify=False)
    print(response.status_code)
    soup = BeautifulSoup(response.text, "html.parser")

    # Assuming the image is within an img tag with a specific class
    image_tags = soup.find_all("img")
    for image_tag in image_tags:
        alt_text = image_tag.get("alt", "")
        if alt_text.startswith(gameName):
            img_src = image_tag.get("src")
            if img_src and img_src.startswith('//'):
                img_src = 'https:' + img_src
            if img_src and img_src.startswith('http'):
                return img_src

    print(f"No valid image found for query: {query}")
    return None

def update_game_images(games):
    for game in games:
        query = game['title'].lower().replace(' ', '-')  # format the query to match the IGDB URL pattern
        print(f"Searching for image: {query}")
        image_url = fetch_image_url(query,game['title'])

        if image_url:
            filename = game['imageUrl'].split('/')[-1]
            filepath = os.path.join("public", "game_images", filename)
            os.makedirs(os.path.dirname(filepath), exist_ok=True)
            download_image(image_url, filepath)

def main():
    # Load games from JSON file
    with open('game_info.json', 'r') as file:
        games = json.load(file)

    # Update game images
    update_game_images(games)

    print("Game images updated successfully!")

if __name__ == "__main__":
    main()
