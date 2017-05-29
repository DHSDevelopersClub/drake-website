from bs4 import BeautifulSoup, Comment
import htmlmin
import re
import urllib, cStringIO
from PIL import Image
import urlparse

def get_img_dims(url):
    file = cStringIO.StringIO(urllib.urlopen(url).read())
    im=Image.open(file)
    width, height = im.size
    return width, height

def rewrite_img_url(url):
    parsed = urlparse.urlparse(url)
    parsed = parsed._replace(scheme='http')
    parsed = parsed._replace(netloc='tamdistrict.org')
    final = urlparse.urlunparse(parsed)
    return final

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

for tag in content():
    # Remove disallowed attributes
    for attribute in ["style", "height", "border", "bordercolor", "clear", "fetching", "align", "face"]:
        del tag[attribute]

    # Remove uneeded tags
    if tag.name in ['script', 'style', 'xml']:
        tag.extract()

    # Remove comments
    if tag in content(text=lambda text: isinstance(text, Comment)):
        tag.extract()

    # Replace <font> with <p>
    if tag.name == 'font':
        tag.name = 'p'

    # Make images into amp-img
    if tag.name == 'img':
        tag.name = 'amp-img'
        tag['src'] = rewrite_img_url(tag['src'])
        tag['width'], tag['height'] = get_img_dims(tag['src'])
        tag['layout'] = 'responsive'


# Read amp page template
template = read_html('template.html')

# Insert body into template
template.body.insert(0, content)


# Output to html file
html = str(template)
with open("output.html", "wb") as file:
    file.write(html)
