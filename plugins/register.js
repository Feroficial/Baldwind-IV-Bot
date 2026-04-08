// ⚔️ Código creado por DEVLYONN 👑
// 🛡️ BALDWIND IV - REINO MEDIEVAL RPG

import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const tmpDir = './tmp'
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

async function ensureImage(filename, url) {
  const filePath = path.join(tmpDir, filename)
  if (!fs.existsSync(filePath)) {
    try {
      const res = await fetch(url)
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      fs.writeFileSync(filePath, buffer)
    } catch (e) {
      console.log('Error descargando imagen:', e.message)
    }
  }
  return filePath
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // INICIALIZAR USUARIO SI NO EXISTE
  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = {
      registered: false,
      name: '',
      age: 0,
      country: '',
      coins: 0,
      bank: 0,
      health: 100,
      mana: 50,
      strength: 5,
      defense: 3,
      weapon: '🗡️ Espada de Madera',
      armor: '🛡️ Armadura de Cuero',
      level: 1,
      exp: 0,
      dailyClaim: 0,
      workClaim: 0,
      inventory: []
    }
  }

  const user = global.db.data.users[m.sender]

  // Verificar si ya está registrado
  if (user.registered === true) {
    return conn.sendMessage(m.chat, { 
      text: `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ⚠️ *YA ESTÁS REGISTRADO*\n> 📌 Usa *${usedPrefix}perfil* para ver tu grimorio\n> 👑 *DEVLYONN*` 
    }, { quoted: m })
  }

  // Validar formato: Nombre.Edad
  const regex = /^([a-zA-ZÀ-ÿñÑ\s]+)\.(\d{1,2})$/i
  if (!regex.test(text)) {
    return conn.sendMessage(m.chat, { 
      text: `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 📜 *REGISTRO MEDIEVAL*\n> 📌 *Formato:* Nombre.Edad\n> 🎯 *Ejemplo:* ${usedPrefix + command} Lyonn.17\n> 👑 *DEVLYONN*` 
    }, { quoted: m })
  }

  let match = text.match(regex)
  let name = match[1]
  let age = parseInt(match[2])

  if (age < 5 || age > 100) {
    return conn.sendMessage(m.chat, { 
      text: `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *EDAD NO VÁLIDA*\n> 📌 Debe ser entre 5 y 100 años\n> 👑 *DEVLYONN*` 
    }, { quoted: m })
  }

  // Reinos y afinidades
  const reinos = ['🜸 CLOVER', '🜹 DIAMOND', '🜺 SPADE', '🜻 HEART']
  const afinidades = ['🔥 FUEGO', '💧 AGUA', '🌪️ VIENTO', '🌱 TIERRA', '⚡ RAYO', '🌑 OSCURIDAD', '🌞 LUZ', '🜸 TIEMPO', '🜹 ESPACIO']
  const rangos = ['⚔️ Escudero', '🗡️ Caballero', '🛡️ Paladín', '⚜️ General', '👑 Lord', '🜸 Archimago', '🐉 Legendario']

  const reino = reinos[Math.floor(Math.random() * reinos.length)]
  const afinidad = afinidades[Math.floor(Math.random() * afinidades.length)]
  const nivelMagico = Math.floor(Math.random() * 15) + 1
  const grimorio = '📖 GRIMORIO SAGRADO'
  const rango = rangos[0]

  // GUARDAR TODOS LOS DATOS
  user.registered = true
  user.name = name.trim()
  user.age = age
  user.country = reino
  user.regTime = Date.now()
  user.afinidad = afinidad
  user.nivelMagico = nivelMagico
  user.role = rango
  
  // Sistema de monedas
  user.coins = 100
  user.bank = 0
  
  // Stats de combate
  user.health = 100
  user.mana = 50
  user.strength = 5
  user.defense = 3
  user.crit = 5
  user.evasion = 5
  
  // Equipamiento
  user.weapon = '🗡️ Espada de Madera'
  user.armor = '🛡️ Armadura de Cuero'
  user.inventory = []
  
  // Experiencia y nivel
  user.exp = 0
  user.level = 1
  
  // Cooldowns
  user.dailyClaim = 0
  user.workClaim = 0

  // FORZAR GUARDADO EN DISCO
  await global.db.write().catch(console.error)

  // Obtener foto de perfil
  let profilePic
  try {
    profilePic = await conn.profilePictureUrl(m.sender, 'image')
  } catch {
    profilePic = 'https://files.catbox.moe/o1q5sq.jpeg'
  }

  const registroImg = await ensureImage('perfil.jpg', profilePic)
  const thumbnailBuffer = fs.readFileSync(await ensureImage('registro_completo.jpg', 'https://files.catbox.moe/o1q5sq.jpeg'))

  // Mensaje de registro
  let responseMessage = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  responseMessage += `> 🌿 *REGISTRO EXITOSO* 🌿\n`
  responseMessage += `> ⚔️ *${name.toUpperCase()}* del reino ${reino}\n\n`

  responseMessage += `✦ 𝗗𝗔𝗧𝗢𝗦 𝗗𝗘𝗟 𝗚𝗨𝗘𝗥𝗥𝗘𝗥𝗢 ✦\n`
  responseMessage += `> 🧙‍♂️ *Nombre:* ${name}\n`
  responseMessage += `> 🎂 *Edad:* ${age} años\n`
  responseMessage += `> 🌍 *Reino:* ${reino}\n`
  responseMessage += `> 🌌 *Afinidad:* ${afinidad}\n`
  responseMessage += `> 💠 *Nivel Mágico:* ${nivelMagico}\n`
  responseMessage += `> 📖 *Grimorio:* ${grimorio}\n`
  responseMessage += `> 🛡️ *Rango:* ${rango}\n\n`

  responseMessage += `✦ 𝗥𝗘𝗖𝗨𝗥𝗦𝗢𝗦 𝗜𝗡𝗜𝗖𝗜𝗔𝗟𝗘𝗦 ✦\n`
  responseMessage += `> 🪙 *Monedas:* 100\n`
  responseMessage += `> 🏦 *Banco:* 0\n`
  responseMessage += `> ⚔️ *Arma:* 🗡️ Espada de Madera\n`
  responseMessage += `> 🛡️ *Armadura:* 🛡️ Armadura de Cuero\n`
  responseMessage += `> ❤️ *Salud:* 100/100\n`
  responseMessage += `> 🔮 *Maná:* 50/50\n\n`

  responseMessage += `⧼⋆꙳•〔 🛸 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗢 〕⋆꙳•⧽\n`
  responseMessage += `> ⚔️ ¡El destino te aguarda, guerrero!\n`
  responseMessage += `> 🧬 Tu grimorio ha sido sellado con éxito.\n`
  responseMessage += `> 📌 Usa *${usedPrefix}perfil* para ver tus stats\n`
  responseMessage += `> 💰 Usa *${usedPrefix}daily* para reclamar tu recompensa\n`
  responseMessage += `> 💼 Usa *${usedPrefix}work* para ganar monedas\n`
  responseMessage += `╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯\n\n`
  responseMessage += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬 - ᴄᴏɴᴇᴄᴛᴀᴅᴏ ᴘᴏʀ: ᴅᴇᴠʟʏᴏɴɴ`

  await conn.sendMessage(m.chat, {
    image: { url: registroImg },
    caption: responseMessage,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['registrar <nombre.edad>']
handler.tags = ['rpg']
handler.command = ['registrarme', 'registrar', 'reg', 'register']
handler.register = false

export default handler