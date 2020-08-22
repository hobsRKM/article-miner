from newspaper import Article
import sys
import json
link = sys.argv[1]
url = link
article = Article(url)
article.download()
article.parse()
article.nlp()
data={"image":article.top_image,"authors":article.authors,"keywords":article.keywords,"summary":article.summary,"text":article.text}
result = json.dumps(data)
print(result)    
