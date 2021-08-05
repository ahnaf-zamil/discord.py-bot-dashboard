from urllib.parse import quote

CLIENT_ID = "id"
CLIENT_SECRET = "client secret"

REDIRECT_URI = "http://127.0.0.1:3000/callback"
OAUTH_URI = f"https://discord.com/api/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={quote(REDIRECT_URI)}&response_type=code&scope=identify%20guilds%20relationships.read"
