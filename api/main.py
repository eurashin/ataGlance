# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_render_template]
import datetime
from flask import Flask, render_template, jsonify, request
import search
import json 
import imageUpload
import random
import datetime

app = Flask(__name__)

def myconverter(o):
    if isinstance(o, datetime.date):
        return o.__str__()


@app.route('/')
def root():
    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    dummy_times = [datetime.datetime(2018, 1, 1, 10, 0, 0),
                   datetime.datetime(2018, 1, 2, 10, 30, 0),
                   datetime.datetime(2018, 1, 3, 11, 0, 0),
                   ]

    return jsonify(dummy_times)

@app.route('/getnews', methods=['POST'])
def getNews():
    urls = []
    keys = []
    dates = []
    descriptions = []

    if request.method == "POST":
        details = request.form
        tags = details['tags']
        date = '2019-09-27'

        urls, descriptions, dates = search.searchImages(tags, date)
        for url in urls:
            key = imageUpload.random_generator() 
            imageUpload.imageUpload(url, key, tags)
            keys.append(key)



    response = app.response_class(
            response=json.dumps({'keys': keys, 'descriptions':descriptions, 'dates':dates}, default=myconverter),
            status=200,
            mimetype='application/json'
    )

    return(response)
        



if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [START gae_python37_render_template]
