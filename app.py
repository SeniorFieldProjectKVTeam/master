from flask import Flask, request

import template


app = Flask(__name__)

@app.route('/', methods=['POST'])
def generate_template():
    return template.generate_html(request.get_json())
