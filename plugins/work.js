// ⚔️ Código creado por DEVLYONN 👑
// 🛡️ BALDWIND IV - SISTEMA DE TRABAJO

let handler = async (m, { conn, usedPrefix }) => {
  // Inicializar usuario si no existe
  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = { registered: false, coins: 0, bank: 0, workClaim: 0 }
  }
  
  let user = global.db.data.users[m.sender]
  
  if (!user.registered) {
    return m.reply(`❌ *No estás registrado*\n📌 Usa: *${usedPrefix}registrar Nombre.Edad*`)
  }

  let now = Date.now()
  let workCooldown = 3 * 60 * 1000 // 30 minutos

  if (user.workClaim && now - user.workClaim < workCooldown) {
    let remaining = workCooldown - (now - user.workClaim)
    let minutes = Math.floor(remaining / (60 * 1000))
    let seconds = Math.floor((remaining % (60 * 1000)) / 1000)
    return m.reply(`⏳ *Ya trabajaste recientemente*\n📌 Espera *${minutes}m ${seconds}s* para volver a trabajar.`)
  }

  const trabajos = [
    { nombre: '🧹 Limpiador del Reino', ganancia: 50, exp: 5 },
    { nombre: '📦 Repartidor Real', ganancia: 80, exp: 8 },
    { nombre: '🛡️ Guardia de la Muralla', ganancia: 120, exp: 12 },
    { nombre: '🔮 Aprendiz de Mago', ganancia: 100, exp: 10 },
    { nombre: '⚔️ Cazador de Monstruos', ganancia: 150, exp: 15 },
    { nombre: '🌾 Agricultor Real', ganancia: 60, exp: 6 },
    { nombre: '🐉 Domador de Bestias', ganancia: 200, exp: 20 },
    { nombre: '🏰 Constructor Real', ganancia: 130, exp: 13 },
    { nombre: '📜 Escriba del Reino', ganancia: 90, exp: 9 },
    { nombre: '🔨 Herrero Mágico', ganancia: 170, exp: 17 }
  ]

  const trabajo = trabajos[Math.floor(Math.random() * trabajos.length)]
  const bonus = Math.floor(Math.random() * 50) + 1
  const total = trabajo.ganancia + bonus

  user.coins = (user.coins || 0) + total
  user.exp = (user.exp || 0) + trabajo.exp
  user.workClaim = now

  // Verificar subida de nivel
  let nivelUp = false
  let nextExp = (user.level || 1) * 100
  if (user.exp >= nextExp) {
    user.level = (user.level || 1) + 1
    user.exp = user.exp - nextExp
    user.strength = (user.strength || 5) + 2
    user.defense = (user.defense || 3) + 1
    nivelUp = true
  }

  await global.db.write()

  let text = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  text += `> 💼 *TRABAJO COMPLETADO*\n`
  text += `> 📋 *Puesto:* ${trabajo.nombre}\n`
  text += `> 💰 *Ganancia base:* ${trabajo.ganancia}\n`
  text += `> ✨ *Bonus:* +${bonus}\n`
  text += `> 📚 *Exp ganada:* +${trabajo.exp}\n`
  text += `> 🪙 *Total ganado:* +${total}\n\n`

  text += `✦ 𝗘𝗦𝗧𝗔𝗗𝗢 𝗔𝗖𝗧𝗨𝗔𝗟 ✦\n`
  text += `> 🪙 *Monedas:* ${user.coins}\n`
  text += `> 🏦 *Banco:* ${user.bank || 0}\n`
  text += `> 📚 *Experiencia:* ${user.exp}/${(user.level || 1) * 100}\n`
  text += `> ⚡ *Nivel:* ${user.level || 1}\n`

  if (nivelUp) {
    text += `\n✨ *¡SUBISTE DE NIVEL!* ✨\n`
    text += `> 💪 *Fuerza:* ${user.strength}\n`
    text += `> 🛡️ *Defensa:* ${user.defense}\n`
  }

  text += `\n⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`

  await conn.sendMessage(m.chat, { text }, { quoted: m })
}

handler.help = ['work']
handler.tags = ['rpg']
handler.command = ['work', 'trabajar']
handler.register = false
export default handler