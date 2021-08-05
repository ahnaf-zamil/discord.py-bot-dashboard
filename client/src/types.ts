export interface User {
    id: string;
    username: string;
    discriminator: number;
    avatar_url: string;
}

export interface Status {
    guilds: number;
    ping: number;
}

export interface Guild {
    id: string;
    name: string;
    icon_url: string;
}