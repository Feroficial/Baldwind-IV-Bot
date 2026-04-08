// ⚔️ Código creado por DEVLYONN 👑
// 🛡️ BALDWIND IV - LISTA DE SUB-BOTS

import fs from 'fs'
import path from 'path'

async function handler(m, { conn: stars, usedPrefix }) {
  const maxSubBots = 500
  const conns = Array.isArray(global.conns) ? global.conns : []

  const isConnOpen = (c) => {
    try {
      return c?.ws?.socket?.readyState === 1
    } catch {
      return !!c?.user?.id
    }
  }

  const unique = new Map()
  for (const c of conns) {
    if (!c || !c.user) continue
    if (!isConnOpen(c)) continue
    const jidRaw = c.user.jid || c.user.id || ''
    if (!jidRaw) continue
    unique.set(jidRaw, c)
  }

  const users = [...unique.values()]
  const totalUsers = users.length
  const availableSlots = Math.max(0, maxSubBots - totalUsers)

  let responseMessage = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  responseMessage += `> 📡 *SUB-BOTS ACTIVOS*\n\n`

  if (totalUsers === 0) {
    responseMessage += `✦ 𝗘𝗦𝗧𝗔𝗗𝗢 ✦\n`
    responseMessage += `> ⤿ No hay *sub-bots conectados* por ahora.\n\n`
    responseMessage += `✦ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢́𝗡 ✦\n`
    responseMessage += `> ⤿ 🟢 Espacios disponibles: *${availableSlots}*`
  } else if (totalUsers <= 15) {
    const listado = users
      .map((v, i) => {
        const num = v.user.jid.replace(/[^0-9]/g, '')
        const nombre = v?.user?.name || v?.user?.pushName || '👤 Sub-Bot'
        const waLink = `https://wa.me/${num}?text=${usedPrefix}code`
        return `✦ 𝗦𝘂𝗯𝗯𝗼𝘁 #${i + 1}\n> ⤿ 👾 @${num}\n> ⤿ 🌐 ${waLink}\n> ⤿ 🧠 ${nombre}`
      })
      .join('\n\n')

    responseMessage += `✦ 𝗘𝗦𝗧𝗔𝗗𝗢 ✦\n`
    responseMessage += `> ⤿ 🔢 Total conectados: *${totalUsers}*\n`
    responseMessage += `> ⤿ 🟢 Espacios disponibles: *${availableSlots}*\n\n`
    responseMessage += listado
  } else {
    responseMessage += `✦ 𝗘𝗦𝗧𝗔𝗗𝗢 ✦\n`
    responseMessage += `> ⤿ 🔢 Total conectados: *${totalUsers}*\n`
    responseMessage += `> ⤿ 🟢 Espacios disponibles: *${availableSlots}*\n\n`
    responseMessage += `✦ 𝗡𝗢𝗧𝗔 ✦\n`
    responseMessage += `> ⤿ Hay demasiados sub-bots conectados.\n`
    responseMessage += `> ⤿ _No se muestra la lista detallada._`
  }

  responseMessage += `\n\n⧼⋆꙳•〔 🛸 𝗕𝗔𝗟𝗗𝗪𝗜𝗡𝗗 𝗜𝗩 〕⋆꙳•⧽\n`
  responseMessage += `> 👑 *Creador:* DEVLYONN\n`
  responseMessage += `╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯\n\n`
  responseMessage += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`

  const imgDir = path.resolve('./src/img')
  let images = []
  try {
    images = fs.readdirSync(imgDir).filter(file => /\.(jpe?g|png|webp)$/i.test(file))
  } catch {
    images = []
  }

  const randomImage = images.length > 0 ? path.join(imgDir, images[Math.floor(Math.random() * images.length)]) : null
  const thumbnailBuffer = randomImage ? fs.readFileSync(randomImage) : null

  try {
    await stars.sendMessage(
      m.chat,
      {
        text: responseMessage,
        mentions: [...new Set((responseMessage.match(/@(\d{5,16})/g) || []).map(v => v.replace('@', '') + '@s.whatsapp.net'))],
        contextInfo: {
          externalAdReply: {
            title: "🜸 SUB-BOTS ACTIVOS",
            body: "🛸 BALDWIND IV • CYBER CORE",
            mediaType: 1,
            renderLargerThumbnail: false, 
            sourceUrl: "https://github.com/Feroficial/Baldwind-IV-Bot",
            thumbnail: thumbnailBuffer
          }
        }
      },
      { quoted: m }
    )
  } catch (e) {
    console.error('❌ Error enviando listado de sub-bots:', e)
    await stars.sendMessage(m.chat, { text: responseMessage }, { quoted: m })
  }
}

handler.command = ['listjadibot', 'bots', 'subbots']
handler.help = ['subbots']
handler.tags = ['jadibot']
export default handler