from imageUpload import imageUpload 
from search import searchImages


urls = searchImages(['climate', 'rainforest'], '2019-09-30')
print(urls)

imageUpload(urls[0], '12321')
