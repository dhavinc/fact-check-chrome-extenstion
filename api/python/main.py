from scraper import Scraper
from langdetect import detect
import sys
import json
from helperF import Helper


testingArticles = [
    'entertaiment2.txt',
    'entertainment.txt',
    'religion.txt',
    'religion2.txt',
    'society.txt',
    'society2.txt',
    'sport.txt',
    'sport2.txt',
    'world.txt',
    'world2.txt'
]
articlePath = "Articles/"+testingArticles[3]


def main(): 

	ch = sys.argv[1]

	try:
		ch_lang = detect(ch)
		# print('This text is in '+ ch_lang.upper())
		
	except:
		print(' No language has been detected :/ Please try again :) ')
		exit()
	
	# print('time to call scraper... just wait')	
	scrap = Scraper()
	reliablity_value , sources = scrap.main(ch , ch_lang)

	## helper est la classe responsable de la classification
	## pour le moment l'input est un fichier 
	##! un pb avec l'input en arabe en tant qu'argument
	helper = Helper()
	content = open(articlePath, 'r' , encoding= 'utf-8').read()
	categorie = helper.main(content)
	print(categorie)


	# print("\n*****************************************")
	# print("\nreliablity_value :",reliablity_value)
	# print("related article: ", sources)
	# print("\n*****************************************")

	# output = ' {{  fact : {0} ,  sources : {1} }}'.format(reliablity_value,sources)
	output = {
		'fact': reliablity_value,
		'sources': sources
	}
	print(json.JSONEncoder().encode(output))

	return(output)


if __name__ == '__main__':
	main()