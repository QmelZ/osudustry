function tooltip(cell, text){
    let tip = new Tooltip(e => e.background(Styles.black8).margin(4).add(text).style(Styles.outlineLabel));
    cell.get().addListener(tip);
}

function build(t){
    t.clearChildren();
    t.defaults().width(164).height(136);
    t.name = "buttons";
    
    t.button(Icon.settings, Styles.clearPartiali, () => Vars.ui.settings.show()).self(s => tooltip(s, "Settings"));
    
    t.image(prov(() => Core.atlas.find("osudustry-logo"))).size(300, 300);
    
    t.button(Icon.play, Styles.clearPartiali, () => buildPlay(t)).self(s => tooltip(s, "Play"));
    t.button(Icon.terrain, Styles.clearPartiali, () => Vars.ui.maps.show()).self(s => tooltip(s, "Editor"));
    t.button(Icon.book, Styles.clearPartiali, () => Vars.ui.mods.show()).self(s => tooltip(s, "Mods"));
    t.button(Icon.exit, Styles.clearPartiali, () => Core.app.exit()).self(s => tooltip(s, "Exit"));
}

function buildPlay(t){
    t.clearChildren();
    t.defaults().width(164).height(136);
    t.name = "play";
    
    t.button(Icon.leftOpen, Styles.clearPartiali, () => build(t)).self(s => tooltip(s, "Back"));
    
    t.image(prov(() => Core.atlas.find("osudustry-logo"))).size(300, 300);
    
    t.button(Icon.play, Styles.clearPartiali, () => Vars.ui.planet.show()).self(s => tooltip(s, "Campaign"));
    t.button(Icon.add, Styles.clearPartiali, () => Vars.ui.join.show()).self(s => tooltip(s, "Multiplayer"));
    t.button(Icon.terrain, Styles.clearPartiali, () => Vars.ui.custom.show()).self(s => tooltip(s, "Custom Game"));
    t.button(Icon.download, Styles.clearPartiali, () => Vars.ui.load.show()).self(s => tooltip(s, "Load Game"));
}

function buildTop(t){
    t.fill(cons(f => {
        f.defaults().width(56).height(56);
        f.top().left().button(Icon.settings, Styles.clearPartiali, () => Vars.ui.settings.show()).self(s => tooltip(s, "Settings"));
    }));
    
    t.defaults().minWidth(56).maxWidth(210).height(56);
    t.right();
    
    t.button(Icon.paste, Styles.clearPartiali, () => Core.app.openURI("https://github.com/Anuken/Mindustry/releases/")).self(s => tooltip(s, "Changelogs"));
    t.button(Icon.info, Styles.clearPartiali, () => Vars.ui.about.show()).self(s => tooltip(s, "About"));
    t.button(Core.settings.getString("name"), Icon.playersSmall, Styles.transt, () => {}).self(s => {
        s.touchable(Touchable.disabled);
    }).width(Core.settings.getString("name").length * 23).maxWidth(210).right().margin(6);
    t.button(Icon.book, Styles.clearPartiali, () => Vars.ui.database.show()).self(s => tooltip(s, "Core Database"));
}

function menu(){
    let container = Vars.ui.menuGroup.children.get(0).children.get(1);
    container.clear();
    container.setSize(Core.graphics.getWidth(), Core.graphics.getHeight());
    container.center();
    container.add().height(Core.graphics.getHeight() / 10);
    container.table(Styles.black6, t => {
        build(t);
    }).height(136).growX();
    
    Vars.ui.menuGroup.children.get(0).fill(cons(t => {
        t.clear();
        t.setSize(Core.graphics.getWidth(), Core.graphics.getHeight());
        t.top();
        t.add().height(Core.graphics.getHeight() / 20);
        t.table(Styles.black6, table => {
            buildTop(table);
        }).height(56).growX();
    }));
    
    Vars.ui.menuGroup.children.get(0).fill(cons(t => {
        t.clear();
        t.setSize(Core.graphics.getWidth(), Core.graphics.getHeight());
        t.bottom();
        t.add().height(Core.graphics.getHeight() / 20);
        t.table(Styles.none, table => {
            if(Version.build === -1){
                t.label(() => "[#fc8140aa]Custom Build[]");
            }else if(Version.type === "bleeding-edge"){
                t.label(() => "osu!dustry " + Version.build + " bleeding edge");
            }else{
                t.label(() => "osu!dustry " + Version.buildString());
            }
        }).height(24);
    }));
}

Events.on(ClientLoadEvent, () => {
    Timer.schedule(() => {
        menu();
        Vars.ui.menuGroup.children.get(0).children.get(2).remove();
        Events.on(ResizeEvent, () => {
            menu();
        });
    }, 0.1);
});
