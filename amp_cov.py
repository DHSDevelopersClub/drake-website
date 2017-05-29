from bs4 import BeautifulSoup, Comment
import htmlmin
import re
import urllib, cStringIO
from PIL import Image

def get_img_dims(url):
    file = cStringIO.StringIO(urllib.urlopen(URL).read())
    im=Image.open(file)
    width, height = im.size
    return width, height

def rewrite_url(url):
    pass

def read_html(path, minify=False):
    with open(path, 'r') as f:
        html_doc = f.read()
        if minify:
            html_doc = htmlmin.minify(unicode(html_doc, "utf-8"), remove_empty_space=True)
        f.close()
        soup = BeautifulSoup(html_doc, 'html.parser')
        return soup

# read input file
input_html = read_html('test.html', minify=True)
# select important page content
content = input_html.find(id=re.compile('^module-content-'))

# Remove comments
for element in content(text=lambda text: isinstance(text, Comment)):
    element.extract()

# Remove unneeded tags
for elem in content.findAll(['script', 'style', 'xml', 'font']):
    elem.extract()

# Remove disallowed attributes
for tag in content():
    for attribute in ["style", "height", "border", "bordercolor", "clear", "fetching"]:
        del tag[attribute]

# Read amp page template
template = read_html('template.html')

# Insert body into template
template.body.insert(0, content)


# Output to html file
html = str(template)
with open("output.html", "wb") as file:
    file.write(html)
