from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

@app.route("/scrape")
def scraper():
    marsdata = mongo.db.mars
    data = scrape_mars.scrape()
    marsdata.update({}, marsdata, upsert=True)
    return redirect("/", code=302)

@app.route("/")
def index():
    marsdata = mongo.db.mars.find_one()
    return render_template("index.html", marsdata=marsdata)


if __name__ == "__main__":
    app.run(debug=True)
