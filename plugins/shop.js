// ⚔️ Código creado por DEVLYONN 👑
// 🛡️ BALDWIND IV - TIENDA MÁGICA

const items = {
  // Pociones
  'pocion': { name: '🧪 Poción de Vida', price: 50, type: 'consumible', effect: 'health', value: 30, desc: 'Restaura 30 de salud' },
  'mana': { name: '🔮 Poción de Maná', price: 40, type: 'consumible', effect: 'mana', value: 25, desc: 'Restaura 25 de maná' },
  'pocion_x': { name: '✨ Poción X', price: 500, type: 'consumible', effect: 'exp', value: 100, desc: 'Gana 100 de experiencia' },
  'elixir': { name: '💎 Elixir Legendario', price: 1000, type: 'consumible', effect: 'level', value: 1, desc: 'Aumenta 1 nivel' },
  
  // Armas
  'espada_hierro': { name: '⚔️ Espada de Hierro', price: 200, type: 'weapon', effect: 'strength', value: 8, desc: 'Aumenta +8 de fuerza' },
  'espada_plata': { name: '🗡️ Espada de Plata', price: 500, type: 'weapon', effect: 'strength', value: 15, desc: 'Aumenta +15 de fuerza' },
  'espada_legendaria': { name: '⚜️ Espada Legendaria', price: 1500, type: 'weapon', effect: 'strength', value: 30, desc: 'Aumenta +30 de fuerza' },
  
  // Armaduras
  'armadura_hierro': { name: '🛡️ Armadura de Hierro', price: 200, type: 'armor', effect: 'defense', value: 8, desc: 'Aumenta +8 de defensa' },
  'armadura_plata': { name: '🛡️ Armadura de Plata', price: 500, type: 'armor', effect: 'defense', value: 15, desc: 'Aumenta +15 de defensa' },
  'armadura_legendaria': { name: '🛡️ Armadura Legendaria', price: 1500, type: 'armor', effect: 'defense', value: 30, desc: 'Aumenta +30 de defensa' },
  
  // Comida
  'comida': { name: '🍖 Comida', price: 20, type: 'consumible', effect: 'health', value: 15, desc: 'Restaura 15 de salud' },
  'fruta': { name: '🍎 Fruta Mágica', price: 30, type: 'consumible', effect: 'mana', value: 15, desc: 'Restaura 15 de maná' }
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
  // Inicializar usuario
  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = { registered: false, coins: 0, inventory: [] }
  }
  
  let user = global.db.data.users[m.sender]
  
  if (!user.registered) {
    return m.reply(`❌ *No estás registrado*\n📌 Usa: *${usedPrefix}registrar Nombre.Edad*`)
  }

  // Mostrar tienda
  if (command === 'shop' || command === 'tienda') {
    let text = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
    text += `> 🛒 *TIENDA MÁGICA*\n`
    text += `> 🪙 *Tus monedas:* ${user.coins || 0}\n\n`

    text += `✦ 𝗣𝗢𝗖𝗜𝗢𝗡𝗘𝗦 ✦\n`
    for (let [id, item] of Object.entries(items)) {
      if (item.type === 'consumible') {
        text += `> 📦 *${item.name}*\n`
        text += `> 💰 Precio: ${item.price} | ✨ ${item.desc}\n`
        text += `> 📌 *${usedPrefix}comprar ${id}*\n\n`
      }
    }

    text += `✦ 𝗔𝗥𝗠𝗔𝗦 ✦\n`
    for (let [id, item] of Object.entries(items)) {
      if (item.type === 'weapon') {
        text += `> ⚔️ *${item.name}*\n`
        text += `> 💰 Precio: ${item.price} | ✨ ${item.desc}\n`
        text += `> 📌 *${usedPrefix}comprar ${id}*\n\n`
      }
    }

    text += `✦ 𝗔𝗥𝗠𝗔𝗗𝗨𝗥𝗔𝗦 ✦\n`
    for (let [id, item] of Object.entries(items)) {
      if (item.type === 'armor') {
        text += `> 🛡️ *${item.name}*\n`
        text += `> 💰 Precio: ${item.price} | ✨ ${item.desc}\n`
        text += `> 📌 *${usedPrefix}comprar ${id}*\n\n`
      }
    }

    text += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
    return m.reply(text)
  }

  // Comprar item
  if (command === 'comprar' || command === 'buy') {
    let itemId = text.toLowerCase().trim()
    if (!items[itemId]) {
      return m.reply(`❌ *Item no encontrado*\n📌 Usa: *${usedPrefix}shop* para ver los items disponibles`)
    }

    let item = items[itemId]
    let userCoins = user.coins || 0

    if (userCoins < item.price) {
      return m.reply(`❌ *No tienes suficientes monedas*\n💰 Precio: ${item.price}\n🪙 Tienes: ${userCoins}`)
    }

    user.coins = userCoins - item.price

    // Aplicar efecto según tipo
    if (item.type === 'consumible') {
      if (item.effect === 'health') {
        user.health = Math.min((user.health || 100) + item.value, 100)
        m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🛒 *COMPRA EXITOSA*\n> 📦 *${item.name}*\n> ❤️ *Salud restaurada:* +${item.value}\n> 🪙 *Monedas restantes:* ${user.coins}`)
      } 
      else if (item.effect === 'mana') {
        user.mana = Math.min((user.mana || 50) + item.value, 100)
        m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🛒 *COMPRA EXITOSA*\n> 📦 *${item.name}*\n> 🔮 *Maná restaurado:* +${item.value}\n> 🪙 *Monedas restantes:* ${user.coins}`)
      }
      else if (item.effect === 'exp') {
        user.exp = (user.exp || 0) + item.value
        m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🛒 *COMPRA EXITOSA*\n> 📦 *${item.name}*\n> 📚 *Experiencia ganada:* +${item.value}\n> 🪙 *Monedas restantes:* ${user.coins}`)
      }
      else if (item.effect === 'level') {
        user.level = (user.level || 1) + item.value
        m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🛒 *COMPRA EXITOSA*\n> 📦 *${item.name}*\n> ⚡ *Nivel aumentado:* +${item.value}\n> 🪙 *Monedas restantes:* ${user.coins}`)
      }
    } 
    else if (item.type === 'weapon') {
      user.weapon = item.name
      user.strength = (user.strength || 5) + item.value
      m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🛒 *COMPRA EXITOSA*\n> ⚔️ *${item.name} equipada*\n> 💪 *Fuerza:* +${item.value}\n> 🪙 *Monedas restantes:* ${user.coins}`)
    } 
    else if (item.type === 'armor') {
      user.armor = item.name
      user.defense = (user.defense || 3) + item.value
      m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🛒 *COMPRA EXITOSA*\n> 🛡️ *${item.name} equipada*\n> 🛡️ *Defensa:* +${item.value}\n> 🪙 *Monedas restantes:* ${user.coins}`)
    }

    // Guardar inventario
    if (!user.inventory) user.inventory = []
    user.inventory.push({ id: itemId, name: item.name, date: new Date() })
    
    await global.db.write()
  }
}

handler.help = ['shop', 'buy <item>']
handler.tags = ['rpg']
handler.command = ['shop', 'tienda', 'comprar', 'buy']
handler.register = false
export default handler