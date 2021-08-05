from discord.ext import commands
from dotenv import load_dotenv
from tortoise import Tortoise

import os
import discord
import constants

from models import GuildConfig

load_dotenv()


async def get_prefix(bot: commands.Bot, message: discord.Message):
    config = await GuildConfig.filter(id=message.guild.id).get_or_none()
    return config.prefix if config else constants.DEFAULT_PREFIX


bot = commands.Bot(command_prefix=get_prefix, intents=discord.Intents.all())


async def connect_db():
    await Tortoise.init(
        db_url=f"postgres://bot:12345@localhost:5432/testingbot",
        modules={"models": ["models"]},
    )
    await Tortoise.generate_schemas()


@bot.event
async def on_ready():
    await connect_db()
    print("Bot is ready")


for i in os.listdir("./cogs"):
    if i.endswith(".py"):
        bot.load_extension(f"cogs.{i[:-3]}")

bot.run(os.environ["TOKEN"])
