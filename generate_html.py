input = {"orderBotm":["ts","qu","fn"],
         "orderCombo":["combo-player","na"],
         "orderTopThree":["tt","zm","lg"],
         "qu":{"color":"#00ffff","background-color":"#00ffff"},
         "fn":{"color":"#cc0000","background-color":"#bd1f1f"},
         "ts":{"color":"#ff00ff","background-color":"#ff00ff"},
         "qz":{},
         "na":{"option":"chapter",
                       "exist":True,"color":"#7adb4e","background-color":"#d1eecc"},
         "lg":{"background-color":"#bd1f1f"},
         "tt":{"color":"#ffff00","background-color":"#ffff00"},
         "zm":{"background-color":"#ff9900"},
         "theme":{},"combo-player":"fixed"}


def generate_html(input):
    top = input['orderTopThree']
    mid = input['orderCombo']
    bottom  = input['orderBotm']


    top_num = len(top)
    mid_num = len(mid)
    bottom_num = len(bottom)


    result = """
    <!DOCTYPE html>
    <html class="no-js">

    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/normalize.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    </head>

    <body>
    <div id="main" role="main" allow-edit="style.background-color,style.background-image">
    """

    end = """
        </div>
        <script src="js/main.js" type="text/javascript"></script>
        <script src="js/full.js" type="text/javascript"></script>
    </body>
</html>
    """


    result += generate_top(top)

    for i in range(mid_num):
        result += generate_mid(mid[i])

    result += generate_bottom(bottom)

    result += end
    return result


def generate_top(top):
    result = """<section id="controls" class="controls-container">"""

    logo = """
    <section id="logo_wrapper" class="logo-container">
        <a href="" id="logo_link" allow-edit="href" target="_blank">
            <img src="img/logo.png" id="logo_image" allow-edit="src" alt="logo">
        </a>
    </section>       
    """

    title = """
    <div id="title_wrapper">
        <presentation-title id="presentation_title" allow-edit="style.display,style.color"></presentation-title>
    </div>
    """

    zoom = """
    <div id="zoom_wrapper">
        <div id="zoom_display" allow-edit="style.display">
            <div id="zoom">
                <label class="zoom-icon user-icon" zoom-level="-1"><span class="fa fa-user"></span></label>
                <zoom-control></zoom-control>
                <label class="zoom-icon picture-icon" zoom-level="1"><span class="fa fa-picture-o"></span></label>
            </div>
        </div>
        <label class="fullscreen-icon" id="fullscreen_button" allow-edit="style.display"><span id="fullscreen"class="fa fa-arrows-alt"></span></label>
    </div>
    """

    for i in range(len(top)):
        if top[i] == "lg":
            result += logo
        elif top[i] == "tt":
            result += title
        elif top[i] == "zm":
            result += zoom

    result += """</section>"""
    return result


def generate_mid(mid):
    navigation = """
    <section id="navigation">
        <label id="nav_menu" class="menu-icon"><span class="fa fa-bars"></span></label>
    	<header id="navigation_background" allow-edit="style.background-color">
    		<h1 id="navigation_title" allow-edit="text,style.color">Navigation</h1>
            <ul id="nav_buttons" class="clearfix">
                <li><label class="chapters-icon active"><span class="fa fa-list-ol"></span></label></li>
                <li><label class="thumbnails-icon"><span class="fa fa-th"></span></label></li>
            </ul>
        </header>
    """

    navigation_chapter = """
    <section id="chapter_wrapper">
        <chapter-navigator id="chapters" class="component"></chapter-navigator>
    </section>
    """

    navigation_thumbnail = """
    <section id="thumbnail_wrapper">
        <thumbnail-navigator id="thumbnails" class="component"></thumbnail-navigator>
    </section>
    """

    navigation_end = """
    </section>
    """

    combo_player = """
    <section id="content">
        <section id="combo_wrapper">
            <section id="player_innerwrap">
                <p class="brand" target="_blank">Powered by <a href="http://www.knowledgevision.com" target="_blank">KnowledgeVision</a></p>
                <combo-player id="player" playerChrome="combo" allow-edit="playerChrome"></combo-player>
            </section>
        </section>
    </section>
    """
    result = ""

    if mid == "na":
        result += navigation
        if input['na']['option'] == "chapter":
            result += navigation_chapter + navigation_end
        elif mid['na']['option'] == "thumbnail":
            result += navigation_thumbnail + navigation_end
        elif mid['na']['option'] == "both":
            result += navigation_chapter + navigation_thumbnail + navigation_end

    elif mid == "combo-player":
        type = input['combo-player']
        if type == "combo":
            result += combo_player.format("combo")
        elif type == "fixed":
            result += combo_player.format("fixed")
        elif type == "video":
            result += combo_player.format("video")
    return result


def generate_bottom(bottom):
    result = """<section id="content_wrapper">"""

    logo = """
    <section id="logo_wrapper" class="logo-container">
        <a href="" id="logo_link" allow-edit="href" target="_blank">
            <img src="img/logo.png" id="logo_image" allow-edit="src" alt="logo">
        </a>
    </section>
    """

    transcript = """
    <section id="transcript_wrapper">
        <header id="transcript_background">
            <h1 id="transcript_title" allow-edit="text,style.color">Transcript</h1>
            <transcript-search id="search"></transcript-search>
            <label id="search_button"><span class="fa fa-search"></span></label>
        </header>
        <div class="body">
            <transcript id="transcript"></transcript>
        </div>
    </section>

    """

    question = """
    <question-form>
        <section id="qa_wrapper">
            <header id="question_background">
                <h1 id="question_title" allow-edit="text,style.color">Questions</h1>
            </header>
            <div class="body">
                <form target="smFormResponse" action="https://kvsync.kvcentral.com/tools/php/simple_email_0_8_curl.php" method="post" id="qa-form" role="form" class="component">
                    <input type="text" id="smFormName" name="name" placeholder="Name" required>
                    <input type="email" id="smFormEmail" name="email" placeholder="Email" required>
                    <textarea rows="2" id="smFormQuestion" name="question" placeholder="Question" required></textarea>
                    <input type="hidden" id="email_Recipient" name="recipient" value="YOUR EMAIL HERE" allow-edit="value">
                    <input type="hidden" id="account" name="account" value="YOUR COMPANY HERE" allow-edit="value">
                    <div id="submit_holder" class="clearfix">
                        <input type="submit" id="submit_button" value="Submit" allow-edit="value,style.background-color"/>
                        <iframe id="response" name="smFormResponse" frameborder="0"></iframe>
                    </div>
                </form>
            </div>
        </section>
    </question-form>
    """

    footnotes = """
    <section id="footnote_wrapper">
        <header id="footnote_background">
            <h1 id="footnote_title" allow-edit="text,style.color">Notes &amp; References</h1>
        </header>
        <footnotes id="footnotes" class="component"></footnotes>
    </section>
    """
    end = """</section>"""

    for i in range(len(bottom)):
        if bottom[i] == "lg":
            result += logo
        elif bottom[i] == "ts":
            result += transcript
        elif bottom[i] == "qu":
            result += question
        elif bottom[i] == "fn":
            result += footnotes

    result += end
    return result

html_file = open("index.html", "w")
html_file.write(generate_html(input))
html_file.close()
