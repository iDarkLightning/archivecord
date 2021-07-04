export interface Role {
  id: string;
  name: string;
  color: number;
}

export interface ChannelInfo {
  name: string;
  id: string;
  category: string;
}

export interface Member {
  name: string;
  avatar: string;
  color: number;
  id: string;
  display_name: string;
}

export interface Attachment {
  content_type: string;
  filename: string;
  url: string;
  proxy_url: string;
}

export interface Message {
  attachments: Attachment[];
  author: Member;
  channel: string;
  clean_content: string;
  content: string;
  created_at: { $date: number };
  created_at_str: string;
  embeds: any[];
  id: string;
  jump_url: string;
}

export interface Channel {
  archiver: Member;
  pins: Message[];
  created_time: { $date: number };
  channel_id: string;
  name: string;
  topic: string;
  category: string;
  messages: Message[];
  users: Member[];
}

export type GuildQueryResponse = { error: string; res: string };
export type ChannelResponse = { error: string; res: Channel };
export type RolesResponse = { error: string; res: Role[] };
