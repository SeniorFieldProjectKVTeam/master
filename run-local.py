import json
import pathlib

import template
import zipfile


if __name__ == '__main__':
    '''input = json.loads(pathlib.Path('kv.json').read_text())
    html_content = template.generate_html(input)
    pathlib.Path('index.html').write_text(html_content)

    css_content = template.generate_css(input)
    pathlib.Path('main.css').write_text(css_content)'''

    with zipfile.ZipFile('template.zip', 'w') as myzip:
        '''myzip.write('index.html')
        myzip.write('main.css', 'css/main.css')'''
        myzip.write('./app/images/nav_sprite.png', 'img/nav_sprite.png')