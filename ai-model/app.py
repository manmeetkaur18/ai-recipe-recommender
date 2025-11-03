from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load dataset
df = pd.read_csv('recipes.csv')  # prepare this CSV with name + ingredients

# Precompute TF-IDF
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(df['ingredients'])

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    user_input = data['ingredients']
    user_vec = tfidf.transform([user_input])
    sim_scores = cosine_similarity(user_vec, tfidf_matrix)
    top_indices = sim_scores[0].argsort()[-5:][::-1]
    results = df.iloc[top_indices][['name']].to_dict(orient='records')
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
