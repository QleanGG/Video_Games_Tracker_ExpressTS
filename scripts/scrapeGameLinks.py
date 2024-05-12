import requests
from bs4 import BeautifulSoup
import csv

def scrape_games(page_num, arr):
    url = f'https://www.gamespot.com/new-games/?sort=score&game_filter%5Bplatform%5D=19&game_filter%5BminRating%5D=6&game_filter%5BtimeFrame%5D=4&game_filter%5BstartDate%5D=1/01/2020&game_filter%5BendDate%5D=5/12/2024&game_filter%5Btheme%5D=&game_filter%5Bregion%5D=&page={page_num}'
    # url = f"https://www.gamespot.com/new-games/?sort=score&game_filter%5Bplatform%5D=124&game_filter%5BminRating%5D=6&game_filter%5BtimeFrame%5D=4&game_filter%5BstartDate%5D=1/01/2020&game_filter%5BendDate%5D=5/12/2024&game_filter%5Btheme%5D=&game_filter%5Bregion%5D=&page={page_num}"
    headers = {
    'authority': 'www.gamespot.com',
    'method': 'GET',
    'path': '/new-games/?sort=score&game_filter%5Bplatform%5D=19&game_filter%5BminRating%5D=&game_filter%5BtimeFrame%5D=P12M&game_filter%5BstartDate%5D=&game_filter%5BendDate%5D=&game_filter%5Btheme%5D=&game_filter%5Bregion%5D=&___game_filter%5Bdevelopers%5D=&___game_filter%5Bpublishers%5D=',
    'scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': '_au_1d=AU1D-0100-001706038499-GH3ZXBVC-1MUN; usprivacy=1---; Geo={%22country%22:%22IL%22%2C%22region%22:%22TA%22%2C%22continent%22:%22AS%22}; eb=69; basset=; wikia_beacon_id=IOIH2QCsEy; _b2=Ri5WVawoXz.1715070715756; wikia_session_id=z6adBIOFG7; _cc_id=2eab9c557b9268ed66160bf33ab0330; panoramaId_expiry=1715675517584; panoramaId=7240e0bfa156704bd801d03e88d216d5393854c2e0bdb0c4a89bcdeeb8be1fd0; panoramaIdType=panoIndiv; _gcl_au=1.1.314786944.1715070722; OneTrustWPCCPAGoogleOptOut=false; _gid=GA1.2.1058383494.1715452056; device_view=full; watchedVideoIds=%5B6460593%5D; _sg_b_n=1715452068951; sessionId=ee4b342d-2cac-4cc8-9658-c1c11255f6ba; _parsely_session={%22sid%22:3%2C%22surl%22:%22https://www.gamespot.com/%22%2C%22sref%22:%22https://www.google.com/%22%2C%22sts%22:1715526472908%2C%22slts%22:1715452055583}; _parsely_visitor={%22id%22:%22pid=9c8bd002-d866-4983-bd16-3270e2542f5f%22%2C%22session_count%22:3%2C%22last_session_ts%22:1715526472908}; _scor_uid=d34095cc937948e996e692f308213cb3; pvNumber=8; pvNumberGlobal=8; _ga_FVWZ0RM4DH=GS1.1.1715526502.3.1.1715527060.60.0.0; _ga=GA1.1.288220113.1715070715; OptanonConsent=isGpcEnabled=0&datestamp=Sun+May+12+2024+18%3A17%3A41+GMT%2B0300+(Israel+Daylight+Time)&version=202403.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=6702d173-6d98-45a6-8926-556bfb53d1a4&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CC0005%3A1&AwaitingReconsent=false&geolocation=IL%3BTA; OptanonAlertBoxClosed=2024-05-12T15:17:41.054Z; _ga_NQ66RX62J4=GS1.1.1715526473.3.1.1715527061.0.0.0; _sg_b_p=%2F%2C%2Fgames%2Fpc%2F%2C%2Fgames%2Fanimal-well%2F%2C%2Fgames%2Fpc%2F%2C%2Fnew-games%2F%2C%2Fnew-games%2F%2C%2Fgames%2Falan-wake-ii%2F%2C%2Fgames%2Falan-wake-ii%2F; amp_edc8f2=E3Me6C3KHSxBadVUaeBTyH...1htmlh5dk.1htmm33l7.h.3.k; FCNEC=%5B%5B%22AKsRol-dZv8FcsUgA2ZpSY4dujK-cenH3YY3-ufMTcqoHyV0zBdjPmMLyNQ_us__b4GCxO572Xhuu-MSq3hf1O-uxpReWPTiLr_9Qz3dHSY0M3AGkZEpXf5SZ9Ylcw0bkcU4IBecQan_VYbEDL8p5BGLTiTNSLHEXg%3D%3D%22%5D%5D; _sg_b_v=3%3B2831%3B1715526473',
    'priority': 'u=0, i',
    'referer': 'https://www.gamespot.com/new-games/?game_filter%5Bplatform%5D=19',
    'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    parent_divs = soup.find_all('div', class_='media media-game media--small')

    if response.status_code == 200:
        for parent_div in parent_divs:
            anchor_tag = parent_div.find('a')
            if anchor_tag:
                link = anchor_tag['href']
                arr.append(f'https://www.gamespot.com{link}')
    else: print("error getting response")

def main():
    game_links = []
    for i in range(1,11):
        scrape_games(i,game_links)
    
    with open('game_links.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Game Links'])
        for link in game_links:
            writer.writerow([link])

    print("Game links saved to game_links.csv")

if __name__ == '__main__':
    main()
