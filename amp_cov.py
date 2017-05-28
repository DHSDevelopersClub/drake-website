from bs4 import BeautifulSoup, Comment
import htmlmin

with open('test.html', 'r') as f:
    html_doc = f.read()
    html_doc = htmlmin.minify(unicode(html_doc, "utf-8"), remove_empty_space=True)

soup = BeautifulSoup(html_doc, 'html.parser')

content = soup.find(id="module-content-9604")

for element in content(text=lambda text: isinstance(text, Comment)):
    element.extract()

for elem in content.findAll(['script', 'style', 'xml']):
    elem.extract()

print(content)
