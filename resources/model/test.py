import tensorflow as tf
new_model = tf.keras.models.load_model('resources/model/exception/exceptions.h5')
print(new_model.summary())
