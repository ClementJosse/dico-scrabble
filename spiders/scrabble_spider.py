import scrapy

class ScrabbleSpider(scrapy.Spider):
    name = "scrabble_spider"
    start_urls = [f"https://www.listesdemots.net/touslesmotspage{page}.htm" for page in range(2, 1549)]

    def parse(self, response):
        # Extraire les mots avec le sélecteur CSS
        mots = response.css('span.mt::text').getall()

        # Écrire les mots dans le fichier mots.txt
        with open('mots.txt', 'a', encoding='utf-8') as f:
            for mot in mots:
                f.write(mot + '\n')
