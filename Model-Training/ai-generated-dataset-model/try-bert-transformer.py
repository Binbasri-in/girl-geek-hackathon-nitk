import pandas as pd
import tensorflow as tf
from transformers import TFAutoModel, AutoTokenizer
from sklearn.model_selection import train_test_split
from tensorflow.keras.callbacks import EarlyStopping


# Load dataset
file_path = 'Modified_IT_Project_Team_Member_Recommendation_Data.csv'
df = pd.read_csv(file_path)

# Convert all columns to string and concatenate
df['features'] = df.drop('PerformanceScore', axis=1).apply(lambda x: ' '.join(x.astype(str)), axis=1)
X = df['features'].values
y = df['PerformanceScore'].astype(float).values

# Splitting data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
bert_model = TFAutoModel.from_pretrained('bert-base-uncased')

# Tokenize input
X_train = tokenizer(X_train.tolist(), padding=True, truncation=True, return_tensors='tf')
X_test = tokenizer(X_test.tolist(), padding=True, truncation=True, return_tensors='tf')

# Create model
input_ids = tf.keras.layers.Input(shape=(X_train['input_ids'].shape[1],), dtype=tf.int32)
attention_mask = tf.keras.layers.Input(shape=(X_train['attention_mask'].shape[1],), dtype=tf.int32)
embedding = bert_model(input_ids, attention_mask=attention_mask)[0]
embedding = tf.keras.layers.GlobalMaxPool1D()(embedding)
embedding = tf.keras.layers.BatchNormalization()(embedding)
embedding = tf.keras.layers.Dropout(0.3)(embedding)  # Increased dropout rate
embedding = tf.keras.layers.Dense(64, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01))(embedding)
embedding = tf.keras.layers.BatchNormalization()(embedding)
embedding = tf.keras.layers.Dropout(0.3)(embedding)  # Increased dropout rate
output = tf.keras.layers.Dense(1, activation='sigmoid')(embedding)
model = tf.keras.Model(inputs=[input_ids, attention_mask], outputs=output)

# Compile model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Early stopping callback
early_stopping = EarlyStopping(monitor='val_loss', patience=3)

# Train model with early stopping
model.fit([X_train['input_ids'], X_train['attention_mask']], y_train, epochs=10, batch_size=32, validation_split=0.2, callbacks=[early_stopping])

# Evaluate model
model.evaluate([X_test['input_ids'], X_test['attention_mask']], y_test)

# Save model
model.save('bert_model.keras')
