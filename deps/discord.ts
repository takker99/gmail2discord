/**
 * The following functions come from discordeno,
 * released under the Apache license, see https://github.com/discordeno/discordeno/blob/main/LICENSE
 */

// https://github.com/discordeno/discordeno/blob/18.0.1/helpers/webhooks/executeWebhook.ts

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhook {
  // ========== Query String Params ==========

  /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean;
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  threadId?: BigString;

  // ========== JSON/Form Params ==========

  /** Name of the thread to create (target channel has to be type of forum channel) */
  thread_name?: string;
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Override the default username of the webhook */
  username?: string;
  /** Override the default avatar of the webhook */
  avatar_url?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** The contents of the file being sent */
  files?: Blob[];
  /** Embedded `rich` content */
  embeds?: DiscordEmbed[];
  /** Allowed mentions for the message */
  allowed_mentions?: AllowedMentions;
  /** the components to include with the message */
  components?: MessageComponents;
}

// https://github.com/discordeno/discordeno/blob/18.0.1/types/discordeno.ts

export type MessageComponents = ActionRow[];

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: MessageComponentTypes.ActionRow;
  /** The components in this row */
  components:
    | [
      | ButtonComponent
      | InputTextComponent
      | SelectMenuComponent
      | SelectMenuChannelsComponent
      | SelectMenuRolesComponent
      | SelectMenuUsersComponent
      | SelectMenuUsersAndRolesComponent,
    ]
    | [ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
    | [
      ButtonComponent,
      ButtonComponent,
      ButtonComponent,
      ButtonComponent,
      ButtonComponent,
    ];
}

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
export interface ButtonComponent {
  /** All button components have type 2 */
  type: MessageComponentTypes.Button;
  /** for what the button says (max 80 characters) */
  label: string;
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  customId?: string;
  /** For different styles/colors of the buttons */
  style: ButtonStyles;
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: bigint;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string;
  /** Whether or not this button is disabled */
  disabled?: boolean;
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
export interface SelectMenuComponent {
  /** SelectMenu Component is of type 3 */
  type: MessageComponentTypes.SelectMenu;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** The choices! Maximum of 25 items. */
  options: SelectOption[];
  /** Whether or not this select is disabled */
  disabled?: boolean;
}

export interface SelectMenuUsersComponent {
  /** SelectMenuChannels Component is of type 5 */
  type: MessageComponentTypes.SelectMenuUsers;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** Whether or not this select is disabled */
  disabled?: boolean;
}

export interface SelectMenuRolesComponent {
  /** SelectMenuChannels Component is of type 6 */
  type: MessageComponentTypes.SelectMenuRoles;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** Whether or not this select is disabled */
  disabled?: boolean;
}

export interface SelectMenuUsersAndRolesComponent {
  /** SelectMenuChannels Component is of type 7 */
  type: MessageComponentTypes.SelectMenuUsersAndRoles;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** The choices! Maximum of 25 items. */
  options: SelectOption[];
  /** Whether or not this select is disabled */
  disabled?: boolean;
}

export interface SelectMenuChannelsComponent {
  /** SelectMenuChannels Component is of type 8 */
  type: MessageComponentTypes.SelectMenuChannels;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** Whether or not this select is disabled */
  disabled?: boolean;
}

export interface SelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string;
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string;
  /** An additional description of the option. Maximum 50 characters. */
  description?: string;
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: bigint;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** Will render this option as already-selected by default. */
  default?: boolean;
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface InputTextComponent {
  /** InputText Component is of type 4 */
  type: MessageComponentTypes.InputText;
  /** The style of the InputText */
  style: TextStyles;
  /** The customId of the InputText */
  customId: string;
  /** The label of the InputText. Maximum 45 characters */
  label: string;
  /** The placeholder of the InputText */
  placeholder?: string;
  /** The minimum length of the text the user has to provide */
  minLength?: number;
  /** The maximum length of the text the user has to provide */
  maxLength?: number;
  /** Whether or not this input is required. */
  required?: boolean;
  /** Pre-filled value for input text. */
  value?: string;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean;

  /** Array of role_ids to mention (Max size of 100) */
  roles?: bigint[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: bigint[];
}

// https://github.com/discordeno/discordeno/blob/18.0.1/types/shared.ts

export type BigString = bigint | string;

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-types */
export type EmbedTypes =
  | "rich"
  | "image"
  | "video"
  | "gifv"
  | "article"
  | "link";

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionsTypes {
  /** Controls role mentions */
  RoleMentions = "roles",
  /** Controls user mentions */
  UserMentions = "users",
  /** Controls @everyone and @here mentions */
  EveryoneMentions = "everyone",
}

export enum TextStyles {
  /** Intended for short single-line text */
  Short = 1,
  /** Intended for much longer inputs */
  Paragraph = 2,
}

/** https://discord.com/developers/docs/interactions/message-components#buttons-button-styles */
export enum ButtonStyles {
  /** A blurple button */
  Primary = 1,
  /** A grey button */
  Secondary,
  /** A green button */
  Success,
  /** A red button */
  Danger,
  /** A button that navigates to a URL */
  Link,
}

/** https://discord.com/developers/docs/interactions/message-components#component-types */
export enum MessageComponentTypes {
  /** A container for other components */
  ActionRow = 1,
  /** A button object */
  Button,
  /** A select menu for picking from choices */
  SelectMenu,
  /** A text input object */
  InputText,
  /** Select menu for users */
  SelectMenuUsers,
  /** Select menu for roles */
  SelectMenuRoles,
  /** Select menu for users and roles */
  SelectMenuUsersAndRoles,
  /** Select menu for channels */
  SelectMenuChannels,
}

// https://github.com/discordeno/discordeno/blob/18.0.1/types/discord.ts

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface DiscordEmbed {
  /** Title of embed */
  title?: string;
  /** Type of embed (always "rich" for webhook embeds) */
  type?: EmbedTypes;
  /** Description of embed */
  description?: string;
  /** Url of embed */
  url?: string;
  /** Color code of the embed */
  color?: number;

  /** Timestamp of embed content */
  timestamp?: string;
  /** Footer information */
  footer?: DiscordEmbedFooter;
  /** Image information */
  image?: DiscordEmbedImage;
  /** Thumbnail information */
  thumbnail?: DiscordEmbedThumbnail;
  /** Video information */
  video?: DiscordEmbedVideo;
  /** Provider information */
  provider?: DiscordEmbedProvider;
  /** Author information */
  author?: DiscordEmbedAuthor;
  /** Fields information */
  fields?: DiscordEmbedField[];
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface DiscordEmbedAuthor {
  /** Name of author */
  name: string;
  /** Url of author */
  url?: string;
  /** Url of author icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** A proxied url of author icon */
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface DiscordEmbedField {
  /** Name of the field */
  name: string;
  /** Value of the field */
  value: string;
  /** Whether or not this field should display inline */
  inline?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface DiscordEmbedFooter {
  /** Footer text */
  text: string;
  /** Url of footer icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** A proxied url of footer icon */
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface DiscordEmbedImage {
  /** Source url of image (only supports http(s) and attachments) */
  url: string;
  /** A proxied url of the image */
  proxy_url?: string;
  /** Height of image */
  height?: number;
  /** Width of image */
  width?: number;
}

export interface DiscordEmbedProvider {
  /** Name of provider */
  name?: string;
  /** Url of provider */
  url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface DiscordEmbedThumbnail {
  /** Source url of thumbnail (only supports http(s) and attachments) */
  url: string;
  /** A proxied url of the thumbnail */
  proxy_url?: string;
  /** Height of thumbnail */
  height?: number;
  /** Width of thumbnail */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface DiscordEmbedVideo {
  /** Source url of video */
  url?: string;
  /** A proxied url of the video */
  proxy_url?: string;
  /** Height of video */
  height?: number;
  /** Width of video */
  width?: number;
}
