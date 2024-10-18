import scrapy
import json

class WikWikSpider(scrapy.Spider):
    name = 'wikwik'
    
    def start_requests(self):
        # Lecture du fichier contenant les mots
        with open('liste_mots.txt', 'r') as file:
            mots = file.read().splitlines()  # Chaque ligne contient un mot
        
        base_url = 'https://fr.wikwik.org/'
        for mot in mots:
            url = f'{base_url}{mot}'
            yield scrapy.Request(url=url, callback=self.parse, meta={'mot': mot})

    def parse(self, response):
        mot = response.meta['mot']

        # Assurez-vous que le texte est interprété correctement en UTF-8
        definitions = [text.encode('utf-8', 'ignore').decode('utf-8') for text in response.css('h5 + ul:first-of-type li::text').getall()]

        # Retourne le mot et ses définitions corrigées
        yield {
            "mot": mot,
            "def": definitions
        }


# Pipeline pour exporter les données au format JSON
class JsonPipeline:
    def open_spider(self, spider):
        self.file = open('definitions.json', 'w')
        self.file.write('[\n')

    def close_spider(self, spider):
        self.file.write('\n]')
        self.file.close()

    def process_item(self, item, spider):
        line = json.dumps(item, ensure_ascii=False) + ",\n"
        self.file.write(line)
        return item
