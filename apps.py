import io
from flask import Flask, render_template, request
from keras.preprocessing.image import load_img
import tensorflow as tf

app = Flask(__name__, template_folder='templates')
new_model = tf.keras.models.load_model('resources/model/exception/exceptions.h5')
class_dict = {
   "MIDDlE" : 1,
   "YOUNG" : 2,
   "OLD" : 3
}

@app.route("/home")
def index():
    return render_template("home.html")

@app.route("/summary", methods=["POST"])
def predict():
   imagefile= request.files['imagefile']
   image_path = "./images" + imagefile.filename
   imagefile.save(image_path)

   image = load_image
@app.route("/summary")
def load_model():
    # Capture the output of model.summary() in a string
    summary_string = io.StringIO()
    new_model.summary(print_fn=lambda x: summary_string.write(x + "\n"))
    summary_output = summary_string.getvalue()
    summary_string.close()
    
    # Return the summary as plain text
    return render_template("summary.html", model_summary=summary_output)

@app.route("/settings")
def settings():
    return render_template("settings.html")
if __name__ == "__main__":
    app.run(debug=True, port=3000)

