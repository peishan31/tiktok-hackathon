from flask import Flask, request, jsonify
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import spacy
from collections import defaultdict
from flask_cors import CORS 

nltk.download('vader_lexicon')

# Initialize
nlp = spacy.load('en_core_web_sm')
sia = SentimentIntensityAnalyzer()

app = Flask(__name__)

CORS(app)

def process_comments(comments): # goal is to get top 2's most positive and negative keywords
    keyword_count = defaultdict(int)
    positive_comments = []
    negative_comments = []

    for comment in comments:
        # VADER to analyze sentiment
        sentiment_scores = sia.polarity_scores(comment)
        compound_score = sentiment_scores['compound']

        # spaCy to extract keywords
        doc = nlp(comment)
        # Filter out most common and vulgar keywords (using stop_words)
        keywords = [token.text for token in doc if token.is_alpha and token.text.lower() not in spacy.lang.en.stop_words.STOP_WORDS]

        # categorize comments: whether they r positive/negative
        if compound_score >= 0.05:
            positive_comments.append(comment)
        else:
            negative_comments.append(comment)
        
        # Count keywords
        for keyword in keywords:
            keyword_count[keyword] += 1

    # top 2 most positive and negative keywords + their counts
    #top_2_positive = sorted(keyword_count, key=keyword_count.get, reverse=True)[:3]
    #top_2_negative = sorted(keyword_count, key=keyword_count.get, reverse=False)[:3]
    top_2_positive = [
        {"keyword": keyword, "count": keyword_count[keyword]}
        for keyword in sorted(keyword_count, key=keyword_count.get, reverse=True)[:2]
    ]
    
    top_2_negative = [
        {"keyword": keyword, "count": keyword_count[keyword]}
        for keyword in sorted(keyword_count, key=keyword_count.get, reverse=False)[:2]
    ]

    return {
        "top_2_positive_keywords": top_2_positive,
        "top_2_negative_keywords": top_2_negative
    }

# comments = [
#     "Expensive fit. Big disappointment.",
#     "Affordable price and great quality. Highly recommended!",
#     "I love this! It's so cute and comfortable. I'm buying another one in blue.",
#     "I'm not sure about this. It's a bit too short for me.",
#     "No way am I buying it again",
#     "Boohoo how sad, this is so ugly.",
#     "So cute! I love it!",
#     "OMG! This dress is soooo cute! I love it!",
#     "Yipee! I'm so happy with this!"
# ]

# results = process_comments(comments)
# print("Results:", results)

@app.route('/analyzeComments', methods=['POST'])
def analyze_comments():
    try:
        print("here");
        data = request.get_json()
        comments = data["commentsList"]
        print("comments:", comments)

        results = process_comments(comments)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)