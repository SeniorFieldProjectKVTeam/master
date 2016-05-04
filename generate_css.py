from string import Template


input = {"orderBotm":["fn","ts","qu"],
"orderCombo":["combo-player", "na"],
"orderTopThree":["lg","tt","zm"],


"qu":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"fn":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"ts":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"qz":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"na":{"exist":True,"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900","option":"chapter"},

"lg":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"tt":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"zm":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"theme":{"font":"Arial Black,Arial Black,Gadget,sans-serif","fontsize":"16px","background-color":"#ff0000","color":"#ff9900"},

"combo-player":"combo"}


def nav(input):
    navigation = Template("""
    /* Navigation */
    #navigation {
        width: 20em;
        background: $navigation_background;
        position: absolute;
        $navigation_position: 0;
        top: 6.25em;
        bottom: 0;
        z-index: 100;
        -webkit-transition: left .5s;
        transition: left .5s;
    }
    #navigation header{
        border-bottom: 1px solid #d9d9d9;
        left: 0px;
    }
    #navigation_background{
        width: 100%;
        height: 50px;
        background-color: #eee;
    }

    #navigation_title{
        position: absolute;
        left: 40px;
    }

    .menu-icon, .chapters-icon, .thumbnails-icon {
        font-size: 24px;
        cursor: pointer;

        display: inline-block;
        color: #000000;
    }

    .menu-icon {
        text-shadow: 1px 1px #6e6e6e;

        position: absolute;
        left: 5px;
        top: 4.35em;

        z-index: 900;
    }

    .chapters-icon, .thumbnails-icon {
        margin: 6px 10px;
        color:  #636363;
    }
    .chapters-icon.active, .thumbnails-icon.active {
        color: #000000;
    }

    #nav_buttons {
        list-style-type: none;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 300;
    }
    #nav_buttons li {
        margin: 0;
        padding: 0;
        float: left;
    }

    /* Chapters, Thumbs, Footnotes*/
    #chapter_wrapper, #thumbnail_wrapper{
        position: absolute;
        top: 41px;
        bottom: 205px;
        left: 0;
        right: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background: $chapter_color;
    }
    #thumbnail_wrapper {
        display: none;
    }
    #chapters {
        margin: 0;
        padding: 0;
    }
    .chapter-navigator-item, .chapter-navigator-item-selected {
        padding: 5px 1px 5px 10px;
    }
    .chapter-navigator-item a, .chapter-navigator-item-selected a {
        font-size: 1em;
        text-decoration: none;
    }
    .chapter-navigator-item{
        background-color: #ffffff;
    }
    .chapter-navigator-item a {
        color: #666666;
        font-family: $navigation_font;
        font-size: $navigation_font_size
        font-color: $navigation_color
    }
    .chapter-navigator-item-selected {
        background-color: #c5c5c4 !important;
    }
    .chapter-navigator-item-selected a {
        color: #ffffff;
    }

    #thumbnails {
        width: 100%;
        overflow-x: hidden;
    }
    .thumbnail-navigator-item{
        width: 46% !important;
        height: auto !important;
        padding: 2% !important;
        border: none !important;
        border-radius: 0px !important;
        float: left;
    }
    .thumbnail-navigator-item:hover {
        background-color:#d3d3d3;
    }
    .thumbnail-navigator-item.selected {
        background-color: #c5c5c4 !important;
    }
    #thumb_float {
        width: 300px;
        height: auto;
        border: 6px solid #a3c6be;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 200;
        display: none;
    }

    """)

    result = ""

    if input['orderCombo'][0] == "combo-player":
        navigation_background = "green"
        result += navigation.substitute(navigation_background = navigation_background, navigation_position = "right", chapter_color = "yellow", navigation_font = "12", navigation_font_size = "2", navigation_color = "ge")

    return result

print(nav(input))