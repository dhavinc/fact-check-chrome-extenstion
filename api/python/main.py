from scraper import Scraper
from langdetect import detect
import sys
import json
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