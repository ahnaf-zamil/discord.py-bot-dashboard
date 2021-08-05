from tortoise.models import Model
from tortoise import fields


class GuildConfig(Model):
    id = fields.BigIntField(pk=True, unique=True, nullable=False)
    prefix = fields.TextField(default="$")
    welcome_enabled = fields.BooleanField(default=False)
    leave_enabled = fields.BooleanField(default=False)


class WelcomeConfig(Model):
    guild_id = fields.BigIntField(pk=True, unique=True, nullable=False)
    channel_id = fields.BigIntField(nullable=False)
    message = fields.TextField()


class LeaveConfig(Model):
    guild_id = fields.BigIntField(pk=True, unique=True, nullable=False)
    channel_id = fields.BigIntField(nullable=False)
    message = fields.TextField()
