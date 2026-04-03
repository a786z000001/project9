from config.rules import CATEGORY_KEYWORDS, URGENCY_WORDS, CUSTOM_SECURITY_WORDS, CUSTOM_REFUND_WORDS

def analyze_ticket(message: str):
    text = message.lower().strip()
    category_scores = {cat: 0 for cat in CATEGORY_KEYWORDS}
    matched_keywords = set()
    signals = []

    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text:
                category_scores[category] += 1
                matched_keywords.add(keyword)

    urgency = any(word in text for word in URGENCY_WORDS)
    if urgency:
        signals.append("urgency_detected")

    # Custom rule 1: security gets highest priority
    if any(word in text for word in CUSTOM_SECURITY_WORDS):
        category = "Technical"
        priority = "P0"
        signals.append("security_risk")
        matched_keywords.update([w for w in CUSTOM_SECURITY_WORDS if w in text])

    # Custom rule 2: refund escalates billing
    elif any(word in text for word in CUSTOM_REFUND_WORDS):
        category = "Billing"
        priority = "P1"
        signals.append("refund_request")
        matched_keywords.update([w for w in CUSTOM_REFUND_WORDS if w in text])

    else:
        best_category = max(category_scores, key=category_scores.get)
        best_score = category_scores[best_category]
        category = best_category if best_score > 0 else "Other"

        if urgency and category != "Other":
            priority = "P1"
        elif best_score >= 3:
            priority = "P1"
        elif best_score == 2:
            priority = "P2"
        elif best_score == 1:
            priority = "P3"
        else:
            priority = "P3"

    confidence_base = len(matched_keywords)
    confidence = min(0.95, 0.35 + confidence_base * 0.15)
    if category == "Other":
        confidence = 0.35 if matched_keywords else 0.25

    return {
        "category": category,
        "priority": priority,
        "urgency": urgency,
        "keywords": sorted(matched_keywords),
        "signals": signals,
        "confidence": round(confidence, 2),
    }
