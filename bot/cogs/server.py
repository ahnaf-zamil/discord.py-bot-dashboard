from discord.ext import commands
from aiohttp import web

import aiohttp_cors
import discord


class Server(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.site = None

    async def get_status(self, request):
        return web.json_response({"guilds": len(self.bot.guilds), "ping": round(self.bot.latency * 1000)})

    async def get_mutual_guilds(self, request):
        json_data = await request.json()
        guild_ids = json_data.get("guilds")
        if not guild_ids:
            return web.json_response({"error": "Invalid guilds"}, status=400)

        guilds = []
        for i in guild_ids:
            guild: discord.Guild = self.bot.get_guild(int(i))
            if not guild:
                continue
            if guild.get_member(self.bot.user.id):
                guilds.append({
                    "id": str(guild.id),
                    "name": guild.name,
                    "icon_url": str(guild.icon_url_as(format="png", size=512))
                })
        return web.json_response({"guilds": guilds})

    async def start_server(self):
        app = web.Application()
        cors = aiohttp_cors.setup(app)

        cors.add(
            cors.add(app.router.add_resource("/status")).add_route("GET", self.get_status), {
                "*": aiohttp_cors.ResourceOptions(
                    allow_credentials=True,
                    expose_headers="*",
                    allow_headers="*"
                )
            })

        cors.add(
            cors.add(app.router.add_resource("/guilds")).add_route("POST", self.get_mutual_guilds), {
                "localhost:8000": aiohttp_cors.ResourceOptions(
                    allow_credentials=True,
                    expose_headers="*",
                    allow_headers="*"
                )
            })

        runner = web.AppRunner(app)
        await runner.setup()

        self.api = web.TCPSite(runner, '0.0.0.0', 6969)
        
        await self.bot.wait_until_ready()
        await self.api.start()
        print("Server has been started")


def setup(bot: commands.Bot):
    cog = Server(bot)
    bot.add_cog(cog)
    bot.loop.create_task(cog.start_server())