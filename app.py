from flask import Flask, request, jsonify, render_template, send_file
from faker import Faker
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant


app = Flask(__name__)
fake = Faker()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/token')
def generate_token(): 
    TWILIO_ACCOUNT_SID = 'AC291104b9da0c838324afb38b6271fb9b'
    TWILIO_SYNC_SERVICE_SID = 'IS2936995dabef3bac2fd1e20a5894d953'
    TWILIO_API_KEY = 'SKbed290f2a04b5c1bcb46d9b860338844'
    TWILIO_API_SECRET = 'TutyS6xw8QjiFfKKRyqQfC5hg6XmHlqZ'

    username = request.args.get('username', fake.user_name())
    token = AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, identity=username)
    sync_grant_access = SyncGrant(TWILIO_SYNC_SERVICE_SID)
    token.add_grant(sync_grant_access)
    return jsonify(identity=username, token=token.to_jwt().decode())

@app.route('/', methods=['POST'])
def download_text():
    notepad_text = request.form['text']
    with open('workfile.txt', 'w') as f:
        f.write(notepad_text)

    path = 'workfile.txt'

    return send_file(path, as_attachment=True)

if __name__ == "__main__":
    app.run()

