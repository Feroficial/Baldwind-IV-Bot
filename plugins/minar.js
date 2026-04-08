// ⚔️ Código creado por DEVLYONN 👑
// 🛡️ BALDWIND IV - SISTEMA DE MINERÍA

import fetch from 'node-fetch'

// Imagen de la mina
const MINA_IMG = 'https://files.catbox.moe/c8ytk3.jpg'

// Lista de recursos que se pueden encontrar
const recursos = [
  { nombre: '🪨 Piedra', valor: 10, min: 5, max: 15 },
  { nombre: '⚒️ Mineral de Hierro', valor: 25, min: 8, max: 20 },
  { nombre: '✨ Mineral de Plata', valor: 50, min: 10, max: 25 },
  { nombre: '💎 Mineral de Oro', valor: 100, min: 15, max: 30 },
  { nombre: '🔮 Cristal Mágico', valor: 150, min: 20, max: 40 },
  { nombre: '💠 Diamante', valor: 300, min: 25, max: 50 },
  { nombre: '🜸 Gema Arcano', valor: 500, min: 30, max: 60 },
  { nombre: '🐉 Fragmento de Dragón', valor: 1000, min: 40, max: 80 }
]

// Lista de eventos especiales
const eventos = [
  { nombre: '💥 Derrumbe', perdida: true, valor: 30 },
  { nombre: '✨ Veta brillante', perdida: false, multiplicador: 2 },
  { nombre: '🕯️ Espíritu de la Mina', perdida: false, multiplicador: 1.5 },
  { nombre: '⚔️ Encontraste un cofre antiguo', perdida: false, bono: 200 },
  { nombre: '🜸 Cristal maldito', perdida: true, valor: 50 }
]

let handler = async (m, { conn, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  
  // Verificar si está registrado
  if (!user.registered) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *No estás registrado*\n> 📌 Usa: *${usedPrefix}registrar Nombre.Edad*\n\n👑 *DEVLYONN*`)
  }
  
  // Cooldown de 30 minutos
  const cooldown = 30 * 60 * 1000
  const now = Date.now()
  
  if (user.miningCooldown && now - user.miningCooldown < cooldown) {
    const remaining = cooldown - (now - user.miningCooldown)
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ⏳ *MINA AGOTADA*\n> 📌 Vuelve en *${minutes}m ${seconds}s*\n\n👑 *DEVLYONN*`)
  }
  
  // Calcular fuerza y suerte del minero
  const fuerza = user.strength || 5
  const suerte = Math.floor(Math.random() * 100) + 1
  const nivel = user.level || 1
  
  // Seleccionar recurso según suerte y fuerza
  let recursoIndex = Math.min(Math.floor(suerte / 15), recursos.length - 1)
  if (fuerza > 10) recursoIndex = Math.min(recursoIndex + 1, recursos.length - 1)
  if (nivel > 10) recursoIndex = Math.min(recursoIndex + 1, recursos.length - 1)
  
  const recurso = recursos[recursoIndex]
  const cantidad = Math.floor(Math.random() * (recurso.max - recurso.min + 1) + recurso.min) + Math.floor(fuerza / 5)
  
  // Evento aleatorio (20% de probabilidad)
  const tieneEvento = Math.random() < 0.2
  let evento = null
  let gananciaTotal = recurso.valor * cantidad
  
  if (tieneEvento) {
    evento = eventos[Math.floor(Math.random() * eventos.length)]
    if (evento.perdida) {
      gananciaTotal = Math.max(10, gananciaTotal - evento.valor)
    } else if (evento.multiplicador) {
      gananciaTotal = Math.floor(gananciaTotal * evento.multiplicador)
    } else if (evento.bono) {
      gananciaTotal += evento.bono
    }
  }
  
  // Ganar experiencia
  const expGanada = Math.floor(gananciaTotal / 10) + 5
  const expAnterior = user.exp || 0
  user.exp = (user.exp || 0) + expGanada
  user.coins = (user.coins || 0) + gananciaTotal
  user.miningCooldown = now
  
  // Verificar subida de nivel
  let nivelUp = false
  const nextExp = (user.level || 1) * 100
  if (user.exp >= nextExp) {
    user.level = (user.level || 1) + 1
    user.exp = user.exp - nextExp
    user.strength = (user.strength || 5) + 2
    user.defense = (user.defense || 3) + 1
    nivelUp = true
  }
  
  await global.db.write()
  
  // Descargar imagen de la mina
  let minaImg = null
  try {
    const imgRes = await fetch(MINA_IMG)
    if (imgRes.ok) minaImg = Buffer.from(await imgRes.arrayBuffer())
  } catch (e) {}
  
  // Construir mensaje
  let text = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  text += `> ⛏️ *MINERÍA EN PROFUNDIDAD* ⛏️\n\n`
  text += `✦ 𝗥𝗘𝗖𝗨𝗥𝗦𝗢 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢 ✦\n`
  text += `> 🪨 *Recurso:* ${recurso.nombre}\n`
  text += `> 📦 *Cantidad:* ${cantidad} unidades\n`
  text += `> 💰 *Valor unidad:* ${recurso.valor} monedas\n`
  text += `> 💎 *Ganancia:* +${gananciaTotal} monedas\n`
  text += `> 📚 *Experiencia:* +${expGanada}\n\n`
  
  if (evento) {
    if (evento.perdida) {
      text += `✦ ⚠️ *EVENTO NOCTURNO* ⚠️\n`
      text += `> 🕯️ *${evento.nombre}*\n`
      text += `> 💔 *Has perdido:* ${evento.valor} monedas\n\n`
    } else {
      text += `✦ ✨ *EVENTO AUSPICIOSO* ✨\n`
      text += `> 🎉 *${evento.nombre}*\n`
      if (evento.multiplicador) text += `> 📈 *Multiplicador x${evento.multiplicador}*\n`
      if (evento.bono) text += `> 🎁 *Bono:* +${evento.bono} monedas\n`
      text += `\n`
    }
  }
  
  text += `✦ 𝗘𝗦𝗧𝗔𝗗𝗢 𝗔𝗖𝗧𝗨𝗔𝗟 ✦\n`
  text += `> 🪙 *Monedas:* ${user.coins}\n`
  text += `> 📚 *Experiencia:* ${user.exp}/${nextExp}\n`
  text += `> ⚡ *Nivel:* ${user.level || 1}\n`
  
  if (nivelUp) {
    text += `\n✨ *¡SUBISTE DE NIVEL!* ✨\n`
    text += `> 💪 *Fuerza:* ${user.strength}\n`
    text += `> 🛡️ *Defensa:* ${user.defense}\n`
  }
  
  text += `\n⧼⋆꙳•〔 🛸 𝗕𝗔𝗟𝗗𝗪𝗜𝗡𝗗 𝗜𝗩 〕⋆꙳•⧽\n`
  text += `> 👑 *DEVLYONN*\n`
  text += `╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯\n`
  text += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
  
  // Enviar con imagen
  await conn.sendMessage(m.chat, {
    image: minaImg,
    caption: text,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'mine', 'mineria']
handler.register = false

export default handler