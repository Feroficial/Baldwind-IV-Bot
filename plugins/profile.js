// ⚔️ Código creado por DEVLYONN 👑
// 🛡️ BALDWIND IV - PERFIL COMPLETO RPG

import fetch from 'node-fetch'

const imagen1 = 'https://files.catbox.moe/o1q5sq.jpeg'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
  let user = global.db.data.users[who] || {}

  let pp
  try { pp = await conn.profilePictureUrl(who, 'image') } catch { pp = imagen1 }

  let username = await conn.getName(who)
  let isRegistered = user.registered || false

  let text = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  
  if (!isRegistered) {
    text += `> ⚠️ *GUERRERO NO REGISTRADO*\n> 📌 Usa *#registrar Nombre.Edad* para comenzar tu aventura.\n\n⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
    return conn.sendMessage(m.chat, { image: { url: pp }, caption: text, mentions: [who] }, { quoted: m })
  }

  text += `> 📜 *GRIMORIO DE ${user.name || username}*\n\n`
  text += `✦ 𝗗𝗔𝗧𝗢𝗦 𝗕𝗔́𝗦𝗜𝗖𝗢𝗦 ✦\n`
  text += `> 🧙‍♂️ *Nombre:* ${user.name}\n`
  text += `> 🎂 *Edad:* ${user.age} años\n`
  text += `> 🌍 *Reino:* ${user.country || 'Desconocido'}\n`
  text += `> 🌌 *Afinidad:* ${user.afinidad || 'Desconocida'}\n\n`

  text += `✦ 𝗘𝗦𝗧𝗔𝗗𝗢 𝗠𝗔́𝗚𝗜𝗖𝗢 ✦\n`
  text += `> 💠 *Nivel:* ${user.nivelMagico || user.level || 0}\n`
  text += `> ✨ *Exp:* ${user.exp || 0}\n`
  text += `> ❤️ *Salud:* ${user.health || 100}/100\n`
  text += `> 🔮 *Maná:* ${user.mana || 50}/100\n\n`

  text += `✦ 𝗘𝗤𝗨𝗜𝗣𝗔𝗠𝗜𝗘𝗡𝗧𝗢 ✦\n`
  text += `> ⚔️ *Arma:* ${user.weapon || '🗡️ Espada de Madera'}\n`
  text += `> 🛡️ *Armadura:* ${user.armor || '🛡️ Armadura de Cuero'}\n`
  text += `> 💪 *Fuerza:* ${user.strength || 5}\n`
  text += `> 🛡️ *Defensa:* ${user.defense || 3}\n\n`

  text += `✦ 𝗜𝗡𝗩𝗘𝗡𝗧𝗔𝗥𝗜𝗢 ✦\n`
  text += `> 🪙 *Monedas:* ${user.coins || 0}\n`
  text += `> 🏦 *Banco:* ${user.bank || 0}\n`
  text += `> 💰 *Total:* ${(user.coins || 0) + (user.bank || 0)}\n`
  text += `> 🧪 *Items:* ${(user.inventory || []).length || 0}\n\n`

  text += `✦ 𝗥𝗔𝗡𝗚𝗢 ✦\n`
  text += `> 🛡️ *Rango:* ${user.role || '⚔️ Escudero'}\n`
  text += `> 💎 *Premium:* ${user.premium ? '✅ ACTIVADO' : '❌ No'}\n\n`
  text += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬 - ᴄᴏɴᴇᴄᴛᴀᴅᴏ ᴘᴏʀ: ᴅᴇᴠʟʏᴏɴɴ`

  await conn.sendMessage(m.chat, { image: { url: pp }, caption: text, mentions: [who] }, { quoted: m })
}

handler.help = ['perfil']
handler.tags = ['rpg']
handler.command = ['perfil', 'profile', 'stats']
export default handler