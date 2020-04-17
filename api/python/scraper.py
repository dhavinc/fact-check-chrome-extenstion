import os
import random

from time import sleep

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from parsel import Selector
class Scraper : 
	site_fiable = ["www.tunisianet.com.tn",
	"www.rtci.tn",
	"www.santetunisie.rns.tn",
	"tn.usembassy.gov",
	"www.businessnews.com.tn",
	"www.bct.gov.tn",
	"lapresse.tn",
	"africanmanager.com",
	"www.tuniscope.com",
	"www.realites.com.tn",
	"www.tunisiatextile.com.tn",
	"www.accuweather.com",
	"www.mes.tn",
	"kapitalis.com",
	"www.webdo.tn",
	"www.mosaiquefm.net",
	"www.leconomistemaghrebin.com",
	"www.shemsfm.net",
	"www.jawharafm.net",
	"www.it-tunisie.tn",
	"www.utica.org.tn",
	"covid-19.tn",
	"www.radiokef.tn",
	"www.ifm.tn",
	"www.radiosfax.tn",
	"www.radiotataouine.tn",
	]

	def abrv_site(self,site):
		return(site.split("/")[2])



	def count_reliability(self, nb_rech , topsite_list):
		a=0
		sources = []
		for idx , top_ls in enumerate(topsite_list):
			for st in self.site_fiable :
				if top_ls== st  :
					a += 1
					sources.append(top_ls)
		# print("\n \nThis news appears in ",a," of our reliable websites ")

		if(a>=5) :
			res = random.randint(80,95)
		elif a==4 :
			res = random.randint(70,80)
		elif a==3 :
			res = random.randint(50,70)
		elif a==2 :
			res = random.randint(30,50)
		elif a==1 :
			res = random.randint(10,30)
		else:
			res = random.randint(0,10)
		#print("fiability :" , res)
		return (float(res/100) , sources)





	def scrap(self,ch,ch_lang):
		country = "countryTN" #valeur de cr
		date = "w" # from one week ( valeur de as_qdr)
		position = "title" # emplacement des mots dans la page
		#lien = "https://www.google.com/advanced_search?q=x&hl=fr"
		lien = "https://www.google.com/search?hl="+ch_lang.lower()+"&as_q="+ch+"&cr="+country+"&as_qdr="+date #"&as_occt="+ position

		# print("\n start scraping...")
		options = webdriver.ChromeOptions()
		options.add_argument("headless")
		options.add_argument('log-level=3')		
		driver = webdriver.Chrome(executable_path="C:/Users/dhiae/Desktop/fact-check/api/python/chromedriver.exe", chrome_options=options ,service_log_path='NUL' )
		driver.get(lien)
		#sleep(3)
		
		sel = Selector(text=driver.page_source)

		nb_rech = sel.xpath("//div[@id='result-stats']/text()[1]").get()
		# print('nb rech == ' , nb_rech)
		topsite_list = []
		sites_url = sel.xpath('//*[starts-with(@class,"r")]/a[1]/@href').getall()
		#print("la liste à traiter est : ")
		for idx, site in enumerate(sites_url):
			site = self.abrv_site(site)
			topsite_list.append(site)
			#print(str(idx)+" : "+site)

		'''with open('Sites_Data.csv', 'w',encoding='utf-8') as csvfile :
			writer = csv.writer(csvfile)
			writer.writerow([''])'''

		reliablity_value , sources = self.count_reliability(nb_rech,topsite_list)
		return(reliablity_value , sources )





	def main( self , scrap_ch , ch_lang) :
			reliablity_value , sources = self.scrap(scrap_ch,ch_lang)
			return(reliablity_value , sources )
