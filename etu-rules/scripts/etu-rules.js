Hooks.on("ready", async () => {
  if(game.modules.get("compendium-folders") == undefined){
    ui.notifications.error("Please download & enable COMPENDIUM FOLDERS module for ETU-Rules to function properly!")
  } else if(game.modules.get("compendium-folders").active == false){
    ui.notifications.error("Please enable COMPENDIUM FOLDERS modules in this world for ETU-Rules to work properly!")
  }
  if(game.modules.get("gm-notes") == undefined){
    ui.notifications.error("Please download & enable GM NOTES for ETU-Rules to function properly!")
  } else if(game.modules.get("gm-notes").active == false){
    ui.notifications.error("Please enable GM NOTES modules in this world for ETU-Rules to work properly!")
  }
  if(game.modules.get("game-icons-net") == undefined){
    ui.notifications.error("Please download & enable GAME-ICONS.NET module for ETU-Rules to function properly!")
  } else if(game.modules.get("game-icons-net").active == false){
    ui.notifications.error("Please enable GAME-ICONS.NET modules in this world for ETU-Rules to work properly!")
  }

  //Force Building Pack Indexes so Entity Links don't break
  for(let pack of game.packs.entries){
    if(pack.collection.includes("etu-rules"))
    pack.getIndex();
  }

  // Register Tooltip Setting
  game.settings.register('etu-rules', 'show-welcome-screen', {
    name: "Show Welcome Screen on Start",
    label: "Show Welcome Screen on Start",
    type: Boolean,
    default: true,
    config: true,
  })
  // Show tooltip if Setting is True
  if(game.settings.get("etu-rules", "show-welcome-screen")){
    new Dialog({
      name: "Savage Worlds for the Eberron Campaign Setting",
      content: await renderTemplate('modules/etu-rules/templates/welcomescreen.hbs'),
      buttons: {
        ok: {
          label: "Ok",
          callback: async (html) => {
            if(html.find("#hide-tooltip")[0].checked){
              game.settings.set("etu-rules", "show-welcome-screen", false)
            }
          }
        },
      }
    }, {
      id: "tooltip"
    }).render(true)
  }

  game.settings.register("etu-rules", "entity-linking-css", {
    name: "Enable SWADE Entity Linking CSS",
    label: "Enable SWADE Entity Linking CSS (Requires refresh to take effect)",
    type: Boolean,
    default: true,
    config: true
  })

  if(game.settings.get('etu-rules', 'entity-linking-css')){
    let rule = `
    .swade-core a.entity-link,
    .swade-core a.inline-roll {
      background: transparent;
      border: none;
      padding: 0;
      color: var(--red);
      text-decoration: underline;
    }`
    let sheet = window.document.styleSheets[0]
    sheet.insertRule(rule, sheet.cssRules.length);
  }
})
