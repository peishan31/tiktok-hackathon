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
    positive_keywords = []
    negative_keywords = []

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
            positive_keywords.extend(keywords)
        else:
            negative_keywords.extend(keywords)

        # Count keywords
        for keyword in keywords:
            keyword_count[keyword] += 1

    # avoid having the same keywords in both positive and negative keywords
    # calculate the intersection between positive and negative keywords
    common_keywords = set(positive_keywords) & set(negative_keywords)

    # if too many common keywords, reduce the number displayed
    max_common_keywords = 2  # Adjust as needed
    if len(common_keywords) > max_common_keywords:
        common_keywords = set()

    # get the remaining positive and negative keywords
    remaining_positive = [
        {"keyword": keyword, "count": keyword_count[keyword]}
        for keyword in sorted(set(positive_keywords) - common_keywords, key=lambda k: keyword_count[k], reverse=True)[:2]
    ]

    remaining_negative = [
        {"keyword": keyword, "count": keyword_count[keyword]}
        for keyword in sorted(set(negative_keywords) - common_keywords, key=lambda k: keyword_count[k], reverse=True)[:2]
    ]

    return {
        "positive_keywords": remaining_positive,
        "negative_keywords": remaining_negative
    }

# comments = [
#     "Expensive fit. A bit disappointed.",
#     "Affordable price and great quality. Highly recommended!",
#     "I love this! It's so cute and comfortable. I'm buying another one in blue.",
#     "I'm not sure about this. It's a bit too short for me. How ugly",
#     "No way am I buying it again",
#     "Boohoo how sad, this is so ugly. I'm disappointed.",
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