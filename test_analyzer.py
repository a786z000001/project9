from services.analyzer import analyze_ticket

def test_refund_rule():
    res = analyze_ticket("I need a refund asap")
    assert res["category"] == "Billing"
    assert res["priority"] == "P1"

def test_security_rule():
    res = analyze_ticket("My account was hacked, security issue")
    assert res["priority"] == "P0"

def test_technical_rule():
    res = analyze_ticket("The app is crashing with an error")
    assert res["category"] == "Technical"