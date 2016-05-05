import json
import pathlib

import generate_html
import generate_css
import zipfile


if __name__ == '__main__':
    input_param = json.loads(pathlib.Path('kv.json').read_text())
    html_content = generate_html.generate_html(input_param)
    pathlib.Path('index.html').write_text(html_content)

    css_content = generate_css.generate_css(input_param)
    pathlib.Path('main.css').write_text(css_content)

    with zipfile.ZipFile('template.zip', 'w') as myzip:
        # include generated file
        myzip.write('index.html')
        myzip.write('main.css', 'css/main.css')
        # include img file
        myzip.write('kv_logo.png', 'img/kv_logo.png')
        myzip.write('logo.png', 'img/logo.png')
        # include js file
        myzip.write('full.js', 'js/full.js')
        myzip.write('main.js', 'js/main.js')
        myzip.write('html5-3.6-respond-1.1.0.min.js', 'js/vendor/html5-3.6-respond-1.1.0.min.js')
        myzip.write('jquery-1.11.1.min.js', 'js/vendor/jquery-1.11.1.min.js')
        # include fonts file
        myzip.write('FontAwesome.otf', 'fonts/FontAwesome.otf')
        myzip.write('fontawesome-webfont.woff2', 'fonts/fontawesome-webfont.woff2')
        # include css file
        myzip.write('font-awesome.css', 'css/font-awesome.css')
        myzip.write('font-awesome.min.css', 'css/font-awesome.min.css')
        myzip.write('normalize.css', 'css/normalize.css')
        myzip.write('normalize.min.css', 'css/normalize.min.css')