from string import Template

input = {"orderBotm":["fn","ts","qu"],
"orderCombo":["combo-player","na"],
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


def generate_css(input):
    top = input['orderTopThree']
    mid = input['orderCombo']
    bottom  = input['orderBotm']

    result = ""
    
    result += css_top(top)
    result += css_mid(mid)
    result += css_bottom(bottom)

    res = """
    html,
    button,
    input,
    select,
    textarea {
        color: #222;
    }

    html {
        font: 1em "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
        line-height: 1.4;
    }

    ::-moz-selection {
        background: #b3d4fc;
        text-shadow: none;
    }

    ::selection {
        background: #b3d4fc;
        text-shadow: none;
    }

    hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
    }

    audio,
    canvas,
    img,
    video {
        vertical-align: middle;
    }

    fieldset {
        border: 0;
        margin: 0;
        padding: 0;
    }

    textarea {
        resize: vertical;
    }

    h1 {
        color: #000;
        width: 100%;
        font-size: 1.25em;
        line-height: 1.5em;
        text-transform: uppercase;
        letter-spacing: 1.75px;
        margin: 0;
        padding: 5px 0;
        display: inline-block;
        background-color: transparent;
    }

    font[size="12"] {
        font-size: 1em !important;
    }
    font[size="14"] {
        font-size: 1.1em !important;
    }
    font[size="16"] {
        font-size: 1.2em !important;
    }

    a {
        text-decoration: none;
    }

    /* ==========================================================================
       Author's custom styles
       ========================================================================== */
    /* Main Containers */
    html{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #main {
        background: #eeeeee;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

        /* ==========================================================================
       input styles
       ========================================================================== */
    input[type='range']{
        -webkit-appearance: none;
        background-color: #000;
        height: 5px;
        margin-top: 0;
        vertical-align: middle;
        padding: 0;
        width: 130px;
        outline: none;
    }
    input[type='range']::-moz-range-track {
    -webkit-appearance: none;
      background-color: #000;
      margin-top: 16px;
      vertical-align: middle;
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
      margin-right: 18px !important;
    }
    input[type="range"]::-moz-range-track {
      border: inherit;
      background: transparent;
    }

    input[type="range"]::-ms-track {
      border: inherit;
      color: transparent; /* don't drawn vertical reference line */
      background: transparent;
    }

    input[type="range"]::-ms-fill-lower,
    input[type="range"]::-ms-fill-upper {
      background: transparent;
    }

    input[type="range"]::-ms-tooltip {
      display: none;
    }

    /* Thumb */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 10px;
      height: 20px;
      border: none;
      border-radius: 0px;
      background: #000000;
      /*background: #7ca392;*/
    }
    input[type="range"]::-moz-range-thumb {
      width: 10px;
      height: 20px;
      border: none;
      border-radius: 0px;
       background: #000000;
      /*background: #7ca392;*/
    }
    input[type="range"]::-ms-thumb {
      width: 10px;
      height: 20px;
      border-radius: 0px;
      border: 0;
      background: #000000;
      /*background: #7ca392;*/
    }

    /* ==========================================================================
       Media Queries
       ========================================================================== */
    /* iPads (portrait and landscape) ----------- */
    @media only screen
    and (min-device-width : 768px)
    and (max-device-width : 1024px) {
        html, body, #main {
            min-height: 600px;
        }
        #thumb_float {
            display: none !important;
        }
    }
    @media screen and (max-width : 1400px) {
        #transcript_wrapper header {
            -webkit-transition: margin-left .5s, margin-right .5s;
            transition: text-align .5s;
        }
        #search{
            display: none;
        }
    }
    @media screen and (max-width : 725px) {
        #zoom {
            display: none !important;
        }
        #presentation_title{
            right: 10px;
        }
    }
    @media screen and (max-height : 450px)
    {
        .brand{
            font-size: 0.6em;
            bottom: -5px;
        }
    }

    /* ==========================================================================
       Helper classes
       ========================================================================== */

    .ir {
        background-color: transparent;
        border: 0;
        overflow: hidden;
        text-indent: -9999px;
    }

    .ir:before {
        content: "";
        display: block;
        width: 0;
        height: 150%;
    }

    .hidden {
        display: none !important;
        visibility: hidden;
    }

    .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    .visuallyhidden.focusable:active,
    .visuallyhidden.focusable:focus {
        clip: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
    }

    .invisible {
        visibility: hidden;
    }

    .clearfix:before,
    .clearfix:after {
        content: " ";
        display: table;
    }

    .clearfix:after {
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }
    """

    result += res

    return result

def css_top(top):
    controls = """
    #controls {
    display: flex;
    width:100%;
    height: 6.25em;
    right: 0px;
    left: 0em;
    -webkit-transition: left .5s;
    transition: left .5s;
    }
    """

    zoom = Template("""
    /* ZOOM Style */
    #zoom_wrapper {
        display: inline-block;
        line-height: 6.25em;
        width: $zoom_width;
        background-color: $zoom_background;
    }
    #zoom{  
        height: 6.25em;
        width:100%;
    }
    .zoom-icon {
        font-size: 20px;
        padding: 4px;
    }
    .zoom-icon, .fullscreen-icon {
        cursor: pointer;
    }
    .zoom_wrapper input {
        margin: 0 8px;
        background-image:none;
    }

    .fullscreen-icon{
        font-size: 20px;
        padding: 0px 4px 4px 10px;
        
        position: absolute;
        top: 0px;
        right: 0px;
    }
    """)

    title = Template("""
    #title_wrapper{
    display: inline-block;
    line-height: 6.25em;
    height: 6.25em;
    width: $title_width;
    background-color: $title_background;
    }

    #presentation_title{
    position: absolute;
    display: inline-block;
    width:$title_width;
    
    font-size: 28px;
    color: #000;
    
    overflow-y: hidden;
    height: 100%;
    
    font-weight: bold;
    line-height: 1.2;
    top: 1.15em;
    }
    """)

    logo = Template("""
    /* logo */
    #logo_wrapper{
        display: inline-block;
        height: 6.25em;
        width: $logo_width;
        background: #ffffff;
        background-color: $logo_background;
    }
    #logo_link {
        line-height: 6.25em;
        margin-top: 10px;
        margin-left: 10px;
        height: 100%;
        max-height: 5.80em;
    }
    #logo_image{
        max-width: 19em;
        max-height: 5.8em;
    }
    """)

    result = ""
    top_width = "0"
    zoom_background = input['zm']['background-color']
    logo_background = input['lg']['background-color']
    title_background = input['tt']['background-color']

    if len(input['orderTopThree']) == 3:
        top_width = "33.3%"
    elif len(input['orderTopThree']) == 2:
        top_width = "50%"
    elif len(input['orderTopThree']) == 1:
        top_width = "100%"

    result += controls

    for i in range(len(top)):
        if top[i] == "zm":
            result += zoom.substitute(zoom_width = top_width, zoom_background = zoom_background)
        elif top[i] == 'tt':
            result += title.substitute(title_background = title_background, title_width = top_width)
        elif top[i] == "lg":
            result += logo.substitute(logo_width = top_width, logo_background = logo_background)


    
    return result    

def css_mid(mid):
    result = ""

    combo = Template("""
    #content {
    position: absolute;
    top: 6.25em;
    left: $combo_left;
    right: $combo_right;
    bottom: 205px;
    
    -webkit-transition: left .5s;
    transition: left .5s;
    }

    #combo_wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #player_innerwrap{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
    }

    .combo-player {
        width: 100%;
        position: relative;
    }
    .combo-player-video {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    """)

    navigation = Template(
    """
    /* Navigation */
    #navigation {
        width: 20em;
        position: absolute;

        background-color:$navigation_background
        $navigation_position: 0;

        top: 6.25em;
        bottom: 0px;
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
        background-color: $navigation_background;
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
        left: $nav_menu;
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
        background-color: $chapter_color;
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
        $navigation_font
        $navigation_font_size
        $navigation_color
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

    navigation_background = "#ffffff"
    chapter_color = "#ffffff"

    combo_option = input['combo-player']
    navigation_background = input['na']['background-color']
    chapter_color = input['na']['background-color']
    navigation_font = input['na']['font']
    navigation_font_size = input['na']['fontsize']
    navigation_color = input['na']['color'] 
    chapter_color = input['na']['background-color']
    nav_menu = "5px"

    mid_num = len(mid)

    if mid_num == 1:
        combo_left = "0em"
        combo_right = "0em"
        result += combo.substitude(combo_left = combo_left, combo_right = combo_right, combo_option = combo_option)

    if mid_num == 2 and mid[0] == "na":
        navigation_position = "left"
        combo_left = "20em"
        combo_right = "0em"
        result += navigation.substitute(navigation_background = navigation_background, 
                        navigation_position = navigation_position,
                        nav_menu = nav_menu, 
                        chapter_color = chapter_color, 
                        navigation_font = navigation_font, 
                        navigation_font_size = navigation_font_size, 
                        navigation_color = navigation_color)
        result += combo.substitute(combo_left = combo_left, combo_right = combo_right, combo_option = combo_option)

    if mid_num == 2 and mid[0] == "combo-player":
        navigation_position = "right"
        combo_left = "0"
        combo_right = "20em"
        nav_menu = "577px"
        result += combo.substitute(combo_left = combo_left, combo_right = combo_right, combo_option = combo_option)
        result += navigation.substitute(navigation_background = navigation_background, 
                        navigation_position = navigation_position,
                        nav_menu = nav_menu,  
                        chapter_color = chapter_color, 
                        navigation_font = navigation_font, 
                        navigation_font_size = navigation_font_size, 
                        navigation_color = navigation_color)

    return result

def css_bottom(bottom):
    content_wrapper = """
    #content_wrapper {
    position: absolute;
    display: flex;
    width: 99%;
    left: 0.5%;
    height: 205px;
    bottom:0;
    margin: 1% 0 0;
    }
    """

    question = Template("""
    /* Questions */
    #qa_wrapper {
        display: inline-block;
        width:100%;
        background-color: $question_background;
    }
    #qa-form {
        position: absolute;
        overflow-y: auto;
        background: #ffffff;
    }

    #qa_background, #attachments_background {
        width: 100%;
        height: 40px;
        background-color: $question_background;
    }

    #qa-form input, #qa-form textarea {
        width: 100%;
        padding: 5px;
        margin: 5px 0;
        border: none;
        background: #e5e5e4;
        
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    ::-webkit-input-placeholder, :-moz-placeholder, ::-moz-placeholder, :-ms-input-placeholder {
       color: #838384;
    }
    #smFormName{
        width: 46% !important;
        padding-left: 1% !important;
        padding-right: 1% !important;
        margin-left: 2% !important;
    }
    #smFormEmail{
        width: 48% !important;
        padding-left: 1%!important;
        padding-right: 1%!important;
    }
    #smFormQuestion{
        margin-left: 2% !important;
        width: 96% !important;
    }
    #submit_holder {
        margin: 0;
        padding: 0;
    }
    #submit_button, #response {
        float: right;
    }
    input#submit_button {
        width: 33%;
        padding: 8px 0 8px 5px;
        color: #ffffff;
        text-align: center;
        background: #999999;
        border: 1px solid #eeeeee;
    }
    #search_button{
        color: #000;
        float: right;
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 20px;
        z-index: 999;
    }
    #response {
        width: 67%;
        height: 30px;
        position: relative;
        top: 8px;
    }
    .dropdown-menu .active > a, .dropdown-menu .active > a:hover{
        background-color: #cccccc !important;
        background-image: none !important;
    }

    .brand {
        color: #000000;
        font-size: .8em;
        line-height: .65em;
        text-decoration: none;
        font-weight: normal;
        position: absolute;
        bottom: 0em;
        right: 5px;
        z-index: 200;
        margin: 0;
    }
    .brand a{
        color: #7ca392;
    }

    question-form{
    display: inline-block;
    width: $question_width;
    background-color:$question_background;
    }
    """)

    

    transcript = Template("""
    #transcript_wrapper, #qa_wrapper, #attachments_wrapper {
    border: 1px solid #d9d9d9;
    }

    #transcript_background{
        width: 100%;
        height: 40px;
        background-color: $transcript_background;
    }
    #transcript_title, #question_title, #attachments_title{
        padding-left: 10px;
    }
    .body{
        width: 100%;
        top: 0px;
        bottom: 0px;
        background: #ffffff !important;
    }
    #transcript_wrapper{
        display: inline-block;
        height: 205px;
        width: $transcript_width;
    }

    #transcript_wrapper header{
        margin-left: 0%;
        margin-right: 0%;
        overflow-x: hidden;
        color: #fff;
        text-align: left;
        padding-left: 0px;
        background-color: $transcript_background;
    }
    #transcript_wrapper header, #qa_wrapper header, #attachments_wrapper header {
        border-bottom: 1px solid #d9d9d9;
    }

    /* Transcript */
    #transcript {
        display: inline-block;
        height:165px;
        width: 100%;
        background-color: $transcript_background;        
        overflow-y: auto;
    }
    .transcript span {
        font-size: 1em;
        color: #aaaaaa;
    }
    .transcript span.selected {
        color: #000000;
    }
    #search {
        float: right;
        position: absolute;
        top: 8px;
        right: 30px;
        display: none;
    }
    .dropdown-menu {
        top: 25px !important;
        left: -95px !important;
    }
    .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        background: none;
        background-color: #c5c5c4;
        color: #ffffff;
    }
    """)


    footnote = Template("""
    #footnote_wrapper{
    height: 205px;
    width: $footnote_width;
    background-color: $footnote_background;
    }
    #footnote_wrapper header {
        margin: 0 0px;
        padding-left: 0px;
    }
    #footnote_background{
        width: 100%;
        height: 40px;
        background: #eee;
        background-color: $footnote_background;
    }
    #footnote_title{
        padding-left: 10px;
    }
    #footnotes {
        height: 160px;
        padding: 0 10px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #footnotes, #footnotes p {
        font-size: 1em;
    }
    #footnotes p {
        margin: 0;
        padding: 2px;
    }
    """)

    result = ""
    result += content_wrapper
    bottom_width = "0"
    question_background = input['qu']['background-color']
    transcript_background = input['ts']['background-color']
    footnote_background = input['fn']['background-color']

    if len(bottom) == 3:
        bottom_width = "33%"
    elif len(bottom) == 2:
        bottom_width = "50%"
    elif len(bottom) == 1:
        bottom_width == "100%"


    for i in range(len(bottom)):
        if bottom[i] == "qu":
            result += question.substitute(question_background = question_background, question_width = bottom_width)
        elif bottom[i] == "ts":
            result += transcript.substitute(transcript_background = transcript_background, transcript_width = bottom_width)
        elif bottom[i] == "fn":
            result += footnote.substitute(footnote_width = bottom_width, footnote_background = footnote_background)

    return result


css_file = open("main.css", "w")
css_file.write(generate_css(input))
css_file.close()
