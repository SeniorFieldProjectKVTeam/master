def generate_html(input):
    result = """<!DOCTYPE html>
    <html class="no-js">

    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/normalize.min.css">
    <link rel="stylesheet" href="css/main.css">
    </head>

    <body>
    <div id="main" role="main" allow-edit="style.background-color,style.background-image">
    """

    combo_player = """<section id="content" "{}">
    <section id="combo_wrapper">
    <section id="player_innerwrap">
    <p class="brand" target="_blank" href="http://www.knowledgevision.com">Powered by <a href="http://www.knowledgevision.com" target="_blank">KnowledgeVision</a></p>
    <combo-player id="player" playerChrome="{}" allow-edit="playerChrome"></combo-player>
    </section>
    </section>"""

    navigation = """
    <section id="navigation" "{}">

    <header>
    <h1 id="navigation_title" allow-edit="text,style.color">Navigation</h1>
    <ul id="nav_buttons" class="clearfix">
    <li><a id="nav_chapters" class="nav_button ir active">Chapters</a></li>
    <li><a id="nav_thumbs" class="nav_button ir">Thumbnails</a></li>
    </ul>
    </header>

    <section id="chapter_wrapper">
    <chapter-navigator id="chapters" class="component"></chapter-navigator>
    </section>

    <section id="thumbnail_wrapper">
    <thumbnail-navigator id="thumbnails" class="component"></thumbnail-navigator>
    </section>

    <section id="footnote_wrapper">

    <header>
    <h1 id="footnote_title" allow-edit="text,style.color">Notes &amp; References</h1>
    </header>

    <footnotes id="footnotes" class="component"></footnotes>
    </section>
    </section>
    """

    if input['navigation']:
        result += navigation.format('style = "width: navigation_size%"')

    if input['combo-player'] == 'combo':
        result += combo_player.format('style = "width: combo_size%"', "combo")
    elif input['combo-player'] == 'fixed':
        result += combo_player.format("fixed")
    elif input['combo-player'] == 'video':
        result += combo_player.format("video")
    elif input['combo-player'] == 'none':
        result += combo_player.format("none")

    if input['transcript']:
        result += """
        section id="transcript_wrapper">
        <header>
        <h1 id="transcript_title" allow-edit="text,style.color">Transcript</h1>
        <transcript-search id="search"></transcript-search>
        </header>
        <transcript id="transcript"></transcript>
        </section>"""

    if input['qa']:
        result += """
        <question-form>
        <section id="qa_wrapper">
        <header>
        <h1 id="question_title" allow-edit="text,style.color">Questions</h1>
        </header>
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
        </section>
        </question-form>
        """

    result += """</section>
    </div>
    <script src="js/main.js" type="text/javascript"></script>
    <script src="js/full.js" type="text/javascript"></script>
    </body>
    </html>
    """
    return result

def generate_css(input):
    result = """
/* Navigation */
#navigation {
    width: 20em;
    background: #ffffff;
    position: absolute;
    left: 0;
    top: 6.25em;
    bottom: 0;
    z-index: 100;
    
    -moz-box-shadow: 3px 0px 5px 0px  #929292;
    -webkit-box-shadow: 3px 0px 5px 0px  #929292;
    box-shadow: 3px 0px 5px 0px #929292;
    -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#929292')";
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#929292');
    
    -webkit-transition: left .5s;
    transition: left .5s;
}
#navigation header{
    border-bottom: 1px solid #d9d9d9;
}
#navigation_title{
position: absolute;
    left: 40px;
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
.nav_button {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    display: block;
    overflow: hidden;
    cursor: pointer;
}
.nav_button:hover {
    background-color: rgba(163, 197, 189, 0.25);
}
#nav_menu {
    background-image: url(../img/nav_menu.png);
    display: inline-block;
    float: left;
    position: absolute;
    top: 101px;
    z-index: 999;
    -webkit-transition: display .5s;
    transition: display .5s;
}
#nav_chapters {
    background-image: url(../img/nav_sprite_small.png);
    background-position: top left;
}
#nav_chapters.active {
    background-color: #c5c5c4;
    background-position: top right;
}
#nav_thumbs {
    background-image: url(../img/nav_sprite_small.png);
    background-position: bottom left;
}
#nav_thumbs.active {
    background-color: #c5c5c4;
    background-position: bottom right;
}"""

    return result