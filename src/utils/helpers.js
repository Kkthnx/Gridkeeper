const moment = require("moment");

/**
 * Format duration from minutes to human readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} - Formatted duration string
 */
function formatDuration(minutes) {
  if (minutes < 1) return "Less than 1 minute";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""}`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    }
    return `${hours} hour${hours !== 1 ? "s" : ""} and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (remainingHours === 0) {
    return `${days} day${days !== 1 ? "s" : ""}`;
  }
  return `${days} day${days !== 1 ? "s" : ""} and ${remainingHours} hour${remainingHours !== 1 ? "s" : ""}`;
}

/**
 * Parse time string to minutes
 * @param {string} timeString - Time string (e.g., "1h", "30m", "2d")
 * @returns {number} - Duration in minutes
 */
function parseTime(timeString) {
  const timeRegex = /^(\d+)([mhd])$/i;
  const match = timeString.match(timeRegex);

  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "m":
      return value;
    case "h":
      return value * 60;
    case "d":
      return value * 60 * 24;
    default:
      return null;
  }
}

/**
 * Format timestamp to relative time
 * @param {Date} timestamp - The timestamp to format
 * @returns {string} - Relative time string
 */
function formatRelativeTime(timestamp) {
  return moment(timestamp).fromNow();
}

/**
 * Format timestamp to absolute time
 * @param {Date} timestamp - The timestamp to format
 * @returns {string} - Absolute time string
 */
function formatAbsoluteTime(timestamp) {
  return moment(timestamp).format("YYYY-MM-DD HH:mm:ss UTC");
}

/**
 * Create a progress bar
 * @param {number} current - Current value
 * @param {number} total - Total value
 * @param {number} length - Bar length
 * @returns {string} - Progress bar string
 */
function createProgressBar(current, total, length = 10) {
  const progress = Math.round((current / total) * length);
  const filled = "█".repeat(progress);
  const empty = "░".repeat(length - progress);
  return filled + empty;
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength - 3)}...`;
}

/**
 * Escape markdown characters
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeMarkdown(text) {
  return text.replace(/[_*~`|]/g, "\\$&");
}

/**
 * Generate a random string
 * @param {number} length - Length of the string
 * @returns {string} - Random string
 */
function generateRandomString(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Validate Discord user ID
 * @param {string} userId - User ID to validate
 * @returns {boolean} - Whether the ID is valid
 */
function isValidUserId(userId) {
  return /^\d{17,19}$/.test(userId);
}

/**
 * Validate Discord channel ID
 * @param {string} channelId - Channel ID to validate
 * @returns {boolean} - Whether the ID is valid
 */
function isValidChannelId(channelId) {
  return /^\d{17,19}$/.test(channelId);
}

/**
 * Validate Discord role ID
 * @param {string} roleId - Role ID to validate
 * @returns {boolean} - Whether the ID is valid
 */
function isValidRoleId(roleId) {
  return /^\d{17,19}$/.test(roleId);
}

/**
 * Get user mention from ID
 * @param {string} userId - User ID
 * @returns {string} - User mention string
 */
function getUserMention(userId) {
  return `<@${userId}>`;
}

/**
 * Get channel mention from ID
 * @param {string} channelId - Channel ID
 * @returns {string} - Channel mention string
 */
function getChannelMention(channelId) {
  return `<#${channelId}>`;
}

/**
 * Get role mention from ID
 * @param {string} roleId - Role ID
 * @returns {string} - Role mention string
 */
function getRoleMention(roleId) {
  return `<@&${roleId}>`;
}

/**
 * Extract user ID from mention
 * @param {string} mention - User mention
 * @returns {string|null} - User ID or null
 */
function extractUserId(mention) {
  const match = mention.match(/^<@!?(\d+)>$/);
  return match ? match[1] : null;
}

/**
 * Extract channel ID from mention
 * @param {string} mention - Channel mention
 * @returns {string|null} - Channel ID or null
 */
function extractChannelId(mention) {
  const match = mention.match(/^<#(\d+)>$/);
  return match ? match[1] : null;
}

/**
 * Extract role ID from mention
 * @param {string} mention - Role mention
 * @returns {string|null} - Role ID or null
 */
function extractRoleId(mention) {
  const match = mention.match(/^<@&(\d+)>$/);
  return match ? match[1] : null;
}

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} - Capitalized text
 */
function capitalizeWords(text) {
  return text.replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Check if string contains profanity using a pre-compiled regex for efficiency.
 * @param {string} text - Text to check.
 * @param {Array<string>} bannedWords - Array of banned words.
 * @returns {boolean} - Whether text contains profanity.
 */
function containsProfanity(text, bannedWords) {
  if (bannedWords.length === 0) return false;

  // Create a single regex to match any of the banned words as whole words.
  // The `\b` is a word boundary. This prevents matching "ass" in "class".
  // We escape special regex characters in the words themselves.
  const regex = new RegExp(
    `\\b(${bannedWords
      .map((word) => word.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .join("|")})\\b`,
    "i",
  );

  return regex.test(text);
}

/**
 * Validate and sanitize user input
 * @param {string} input - User input to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {string|null} - Sanitized input or null if invalid
 */
function sanitizeInput(input, maxLength = 1000) {
  if (!input || typeof input !== "string") return null;

  const sanitized = input.trim().substring(0, maxLength);
  return sanitized.length > 0 ? sanitized : null;
}

/**
 * Format number with commas for better readability
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Calculate percentage with safety checks
 * @param {number} part - Part value
 * @param {number} total - Total value
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage
 */
function calculatePercentage(part, total, decimals = 1) {
  if (total === 0) return "0%";
  return `${((part / total) * 100).toFixed(decimals)}%`;
}

/**
 * Create a standard error embed
 * @param {string} title - Error title
 * @param {string} description - Error description
 * @param {string} footer - Footer text
 * @returns {EmbedBuilder} - Error embed
 */
function createErrorEmbed(
  title = "❌ Error",
  description = "An error occurred.",
  footer = "System Error",
) {
  const { EmbedBuilder } = require("discord.js");
  return new EmbedBuilder()
    .setColor("#ff4444")
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: footer })
    .setTimestamp();
}

/**
 * Create a standard success embed
 * @param {string} title - Success title
 * @param {string} description - Success description
 * @param {string} footer - Footer text
 * @returns {EmbedBuilder} - Success embed
 */
function createSuccessEmbed(
  title = "✅ Success",
  description = "Operation completed successfully.",
  footer = "System",
) {
  const { EmbedBuilder } = require("discord.js");
  return new EmbedBuilder()
    .setColor("#00ff88")
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: footer })
    .setTimestamp();
}

/**
 * Create a standard info embed
 * @param {string} title - Info title
 * @param {string} description - Info description
 * @param {string} footer - Footer text
 * @returns {EmbedBuilder} - Info embed
 */
function createInfoEmbed(
  title = "ℹ️ Information",
  description = "Information message.",
  footer = "System",
) {
  const { EmbedBuilder } = require("discord.js");
  return new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: footer })
    .setTimestamp();
}

/**
 * Create a standard warning embed
 * @param {string} title - Warning title
 * @param {string} description - Warning description
 * @param {string} footer - Footer text
 * @returns {EmbedBuilder} - Warning embed
 */
function createWarningEmbed(
  title = "⚠️ Warning",
  description = "Warning message.",
  footer = "System",
) {
  const { EmbedBuilder } = require("discord.js");
  return new EmbedBuilder()
    .setColor("#ff8800")
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: footer })
    .setTimestamp();
}

/**
 * Standard error handler for commands
 * @param {Error} error - The error object
 * @param {string} context - Error context (e.g., 'command name')
 * @param {Object} logger - Logger instance
 * @param {string} userMessage - Message to send to user
 * @returns {EmbedBuilder} - Error embed
 */
function handleCommandError(
  error,
  context,
  logger,
  userMessage = "An error occurred while processing your request.",
) {
  logger.error(`Error in ${context}:`, error);
  return createErrorEmbed("❌ Error", userMessage, context);
}

/**
 * Check if interaction is a slash command
 * @param {Object} interaction - Discord interaction object
 * @returns {boolean} - Whether it's a slash command
 */
function isSlashCommand(interaction) {
  return interaction.options !== undefined;
}

/**
 * Reply to interaction (handles both slash and prefix commands)
 * @param {Object} interaction - Discord interaction object
 * @param {Object} content - Content to send
 * @returns {Promise} - Reply promise
 */
async function replyToInteraction(interaction, content) {
  if (isSlashCommand(interaction)) {
    return interaction.editReply(content);
  }
  return interaction.reply(content);
}

/**
 * Edit reply for interaction (handles both slash and prefix commands)
 * @param {Object} interaction - Discord interaction object
 * @param {Object} content - Content to send
 * @returns {Promise} - Edit reply promise
 */
async function editInteractionReply(interaction, content) {
  if (isSlashCommand(interaction)) {
    return interaction.editReply(content);
  }
  // For legacy commands, we need to send a new message since we can't edit the original
  return interaction.channel.send(content);
}

/**
 * Defer reply for slash commands
 * @param {Object} interaction - Discord interaction object
 * @returns {Promise} - Defer promise
 */
async function deferInteraction(interaction) {
  if (isSlashCommand(interaction)) {
    return interaction.deferReply();
  }
}

/**
 * Log moderation action to designated channel
 * @param {Object} guild - Discord guild object
 * @param {Object} data - Moderation data
 * @param {string} data.action - Action type (WARN, KICK, BAN)
 * @param {Object} data.target - Target user object
 * @param {Object} data.moderator - Moderator user object
 * @param {string} data.reason - Reason for action
 * @param {Object} data.channel - Channel where action occurred (optional)
 * @param {number} data.duration - Duration in minutes (optional)
 * @returns {Promise<void>}
 */
async function logModerationAction(guild, data) {
  try {
    const Guild = require("../models/Guild");
    const guildSettings = await Guild.findOne({ guildId: guild.id });
    if (!guildSettings?.moderation.logChannelId) return;

    const logChannel = guild.channels.cache.get(
      guildSettings.moderation.logChannelId,
    );
    if (!logChannel) return;

    const { EmbedBuilder } = require("discord.js");
    const colors = {
      WARN: 0xffa500,
      KICK: 0xff470f,
      BAN: 0xdd2e44,
    };

    const embed = new EmbedBuilder()
      .setColor(colors[data.action] || 0xff0000)
      .setTitle(`🛡️ Moderation Log: User ${data.action}`)
      .addFields(
        {
          name: "User",
          value: `${data.target.tag} (${data.target.id})`,
          inline: true,
        },
        {
          name: "Moderator",
          value: `${data.moderator.tag} (${data.moderator.id})`,
          inline: true,
        },
        { name: "Reason", value: data.reason || "No reason provided" },
      )
      .setTimestamp();

    if (data.channel) {
      embed.addFields({
        name: "Channel",
        value: data.channel.toString(),
        inline: true,
      });
    }

    if (data.duration) {
      embed.addFields({
        name: "Duration",
        value: `${data.duration} minutes`,
        inline: true,
      });
    }

    await logChannel.send({ embeds: [embed] });
  } catch (error) {
    const logger = require("../config/logger");
    logger.error("Error logging moderation action:", error);
  }
}

module.exports = {
  formatDuration,
  parseTime,
  formatRelativeTime,
  formatAbsoluteTime,
  createProgressBar,
  truncateText,
  escapeMarkdown,
  generateRandomString,
  isValidUserId,
  isValidChannelId,
  isValidRoleId,
  getUserMention,
  getChannelMention,
  getRoleMention,
  extractUserId,
  extractChannelId,
  extractRoleId,
  capitalizeWords,
  containsProfanity,
  sanitizeInput,
  formatNumber,
  calculatePercentage,
  createErrorEmbed,
  createSuccessEmbed,
  createInfoEmbed,
  createWarningEmbed,
  handleCommandError,
  isSlashCommand,
  replyToInteraction,
  editInteractionReply,
  deferInteraction,
  logModerationAction,
};
