from bs4 import BeautifulSoup, Comment
import htmlmin
import re
import urlparse
import time

def get_img_dims(url):
    import urllib, cStringIO
    from PIL import Image
    file = cStringIO.StringIO(urllib.urlopen(url).read())
    im=Image.open(file)
    width, height = im.size
    return width, height

def rewrite_img_url(url):
    parsed = urlparse.urlparse(url)
    parsed = parsed._replace(scheme='http')
    parsed = parsed._replace(netloc='tamdistrict.org')
    final = urlparse.urlunparse(parsed)
    print final
    return final

def read_html(path, minify=False):
    with open(path, 'r') as f:
        html_doc = f.read()
        if minify:
            print minify
            html_doc = htmlmin.minify(unicode(html_doc, "utf-8"), remove_empty_space=True, remove_comments=True)
        f.close()
        soup = BeautifulSoup(html_doc, 'html.parser')
        return soup

# read input file
input_html = read_html('test2.html', minify=True)
# select important page content
content = input_html.find(id=re.compile('^module-content-'))

start = time.time()
tags_count = 0
tags_list = []
formatted_content = BeautifulSoup('', 'html.parser')

for tag in content.findAll(True):
    # Remove disallowed attributes
    for attribute in ["style", "height", "border", "bordercolor", "clear", "fetching", "align", "face"]:
        del tag[attribute]

    # Remove uneeded tags
    if tag.name in ['script', 'style', 'xml']:
        tag.extract()

    # Replace <font> with <span>
    if tag.name == 'font':
        tag.name = 'span'

    # Make images into amp-img
    if tag.name == 'img':
        tag.name = 'amp-img'
        tag['src'] = rewrite_img_url(tag['src'])
        tag['width'], tag['height'] = get_img_dims(tag['src'])
        tag['layout'] = 'responsive'

    if tag.name == 'u':
        print tag

    tags_count +=1
    if tag.name not in tags_list:
        tags_list.append(tag.name)

    formatted_content.append(tag)


end = time.time()
print "Ran in " + str(end - start) + " seconds"
print str(tags_count) + " DOM nodes"
print tags_list

# Read amp page template
template = read_html('template.html')

# Insert body into template
template.body.insert(0, formatted_content)


# Output to html file
html = str(template)
with open("output.html", "wb") as file:
    file.write(html)
