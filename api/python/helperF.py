import os, pickle, re
from string import punctuation
from nltk.stem.isri import ISRIStemmer


categories = {
    'religion':6, 
    'world':5, 
    'sport':2, 
    'society':4, 
    'tunisia':1, 
    'entertainment':3
}
arabicCategories = {
    'religion':'اسلاميات', 
    'world':'العالم', 
    'sport':'الرياضة', 
    'society':'المجتمع', 
    'Tunisia':'تونس', 
    'entertainment':'الثقافة'
}
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
article = open(articlePath, 'r' , encoding= 'utf-8').read()


stopWords = open("Tools/arabic-stop-words/list.txt",encoding="utf8").read().splitlines()

models = 'Models/dumps/'

punctuation += '،؛؟”0123456789“'

class Helper():

	def __init__(self, article = False):
		self.article = article

	def getCleanArticle(self , content):
		content = ''.join(c for c in content if c not in punctuation)
		words = content.split()     
		cleandWords = [w for w in words if w not in stopWords]
		return ' '.join(cleandWords)

	def setPickleContent(self, fileName, itemList):
		with open(fileName+'.pkl', 'wb') as fp:
			pickle.dump(itemList, fp)

	def getPickleContent(self, pklFile):
		with open (pklFile, 'rb') as fp:
			itemlist = pickle.load(fp)
		return itemlist


	def getModel(self, name):
		model = self.getPickleContent(os.path.join(models, name+'/model_'+name+'.pkl'))
		cv = self.getPickleContent(os.path.join(models, name+'/cv_'+name+'.pkl'))
		tfidf = self.getPickleContent(os.path.join(models, name+'/tfidf_'+name+'.pkl'))
		return model, cv, tfidf


	def predict(self, content):
		article = self.getCleanArticle(content)
		model, cv, tfidf = self.getModel('sgd_94')

		vectorized = tfidf.transform(cv.transform([article]))

		predicted = model.predict(vectorized)

		keys = list(categories.keys())
		values = list(categories.values())

		categoryPredicted = keys[values.index(predicted[0])].upper()

		return categoryPredicted


	def main(self, content):
		categorie = self.predict(content)
		return categorie




