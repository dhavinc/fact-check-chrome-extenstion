# Intox Buster
![alt text](https://imgur.com/80GOj6N.png)

# Pourquoi Intox Buster ?
Avec l'apparition de la nouvelle pandémie Covid-19 , une infodémie vient de se propager.

d'une part, cette pandémie d'infox menace les stratégies et les mesures prises par notre pays.
et d'autre part , selon les statistiques fournits , les Fake News qui circule autour de CoronaVirus submergent les tunisiens dans un état d'inquétide et d'agitation.

Les chiffres montrent qu'avec le confinement , les sources les plus répondues pour la propagation de rumeurs sont les sites web , y inclus les réseau sociaux.


# C'est Quoi intox Buster ?

Il s'agit d'un outil permettant de repérer les fausses nouvelles et de proposer des alternavies de sources fiables.

les individus peuvent utiliser cet outil en tant qu'une extension chrome
et les entreprise et les sites de replucation des information peuvent utiliser notre api.


pour s'implifier plus C'est quoi intox buster !
l'utilisateur sélectionne un article , un morceaux d'article ou mm un une phrase.
notre script analyse ce qui a été sélectionné , et retourne à la fois s'il sagit d'un intox ou bien une vérité.
dans le cas ou il s'agit d'un intox, le script detecte à l'aide de l'IA  le thème de l'article et propose ainsi des alternatives fiables.

# Classification des articles

Concernant la détection du thème de l'article , on a développer 3 modèles (DT, SVM,NB)  , permettant de analyser à chaque fois l'input et de retourner à quelle catégorie il appartient.
Les differentes catégories de notre base de données : 
![alt text](https://imgur.com/0SJAcFu.png)


Un petit exemple de classification: 
![alt text](https://imgur.com/REmB6OL.png)


## les modèles de ML utilisés : 


| Algorithm        | Precision      | Recall        | F-mesure       |
| ---------------- |:--------------:|:-------------:|:--------------:|
|    Decision Tree |    0.82        | 0.84          | 0.83           |
|    SVM (SGD)     |    0.94        | 0.94          | 0.94           |
|    Naive Bayes   |    0.89        | 0.87          | 0.88           |

## Credits
- Team mate: [Cherni Oussama](https://www.linkedin.com/in/cherni-oussama-b593b415a/)
- Team mate: [Fadhlaoui Meher](https://www.linkedin.com/in/meher-fadhleoui-2a539618b/)
