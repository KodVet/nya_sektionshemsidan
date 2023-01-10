<script context="module">
    export let max_height = 100;
</script>
<script>
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    import { null_to_empty } from "svelte/internal";
    export let baseUrl;
    export let active;
    import { pages } from '../../../pageStructure.json'
    let navbar;
    let yScrollPosition;
    let viewportWidth;
    let ddcontentWidth;
    let ddcontentHeight;
    let staticBackground;
    let ddbuttons
    let hero
    let contentReplaced
    export let isOpaque = false 
    
    let lines = []
    
    onMount(() =>{
        //Alla DOM-element som binds enklast här istället för med bind:this i markupen
        hero = document.getElementById('heroimg')
        ddbuttons = Object.values(document.getElementsByClassName('ddbutton'))
        
        //Lines
        for (let i=0; i<pages.length; i++) {
            lines.push(Object.values(ddbuttons[i].getElementsByClassName('line')))
        }

        //Funktioner som körs för att rätta till variabler och utseende vid en reload
        if (hero) oberserver.observe(hero)
        handleNavigation(active)
        handleResize()
        generateBreakpoints(15)

        //Enksilda checkar
        if (!isOpaque) {
            navbar.style.backgroundColor = 'var(--koggis-grön)'
        }
        contentReplaced = Math.random()
        document.addEventListener('swup:contentReplaced', ()=> contentReplaced = Math.random())
    });

    beforeUpdate(() => {
        
    });

    afterUpdate(() => {
 
    })


    const oberserver = new IntersectionObserver(entries=>{
        entries.forEach(entry => {
            navbar.classList.toggle('intersectingHero', entry.isIntersecting)
            staticBackground.classList.toggle('intersectingHero', entry.isIntersecting)
        })
    }, {rootMargin: `${-10}px`})
    
    let min_height = 50;
    
    let max_scroll = 100;
    let navHeight = max_height;
    function animateNavHeight(breakpoint, totalBreakpoints) {
            navHeight = max_height - ((max_height-min_height)/totalBreakpoints)*breakpoint
    }

    const maxFontSize = 24
    const minFontSize = 18
    let navFontSize = maxFontSize;
    function getFontSize(breakpoint, totalBreakpoints, eager=false) {
            navFontSize = (maxFontSize - (((maxFontSize-minFontSize)/totalBreakpoints))*breakpoint)
            
    }
      
    function generateBreakpoints(total){
                for (let i = 0; i <= total; i++) {
                    if (((i*max_scroll)/total)<=yScrollPosition) {
                        animateNavHeight(i, total);
                        getFontSize(i, total);
                    }
                }
            }

    function newActive(href) {
        // console.log(`nu är active: ${active}`)
        if (href.startsWith('#')) return 
        active = href.replace(/\#.*/, '')
        // console.log(`nu är active: `, active.split('/'))
    }

    function dotWasActive() {
        const activeDot = document.querySelector('.active .dot')
        activeDot.style.transition ="300ms ease-in-out"
        activeDot.style.transform = "translateY(3px)"
        activeDot.style.height = "5px"
        activeDot.style.clipPath = "inset(2.5px 2.5px 2.5px 2.5px)" 
        setTimeout(() => {
            activeDot.style.transition =""
            activeDot.style.transform = ""
            activeDot.style.height = ""
            activeDot.style.clipPath = ""
        }, 300)
        
    }

    function adjustPads() {
        const activeDdcontentHeight = document.querySelector('.ddbutton.active .ddcontent')?.clientHeight
        staticBackground.style.marginBottom = `${activeDdcontentHeight}px`

        
        
        for (let ddbutton of ddbuttons) {
            if (!ddbutton.querySelector('.ddcontent')) continue
            const pad = ddbutton.querySelector('.pad')
            const ddcontent = ddbutton.querySelector('.ddcontent')
            pad.style.height = `${ddcontent.clientHeight + 40}px`
        };
    }
     
    function checkLines() {
        for (let i = 0; i<(lines?.length); i++) {

            if (!lines[i]) continue

            for (let j=0;j<(lines[i].length - 1); j++) {

                const line = lines[i][j]
                const nextLine = lines[i][j+1]
                const previousLine = lines[i][j-1]

                if (!previousLine) continue

                //Kolla efter linjer i början av rader
                if (line.offsetLeft < previousLine.offsetLeft && previousLine.nextSibling.offsetTop < line.nextSibling.offsetTop) {
                 line.style.visibility = "hidden"
                }
                else line.style.visibility = "visible"
                
                //Kolla efter linjer i slutet av rader
                if (line.offsetLeft > nextLine.offsetLeft && line.offsetLeft > line.nextSibling.offsetLeft) {
                    line.style.visibility = "hidden"
                }
                else line.style.visibility = "visible"
                //Tror jag, det kanske va tvärt om
            }
        }
    }
    function readLinks(links) {
        Object.values(links).forEach(link => {
            const href = link.getAttribute('href')
            
            link.addEventListener('click', () => {
                handleNavigation(href)
            })
        })
    }
    
    //handleScroll
    //Med denna variant kan jag lösa buggen med snabb skroll.
    //Att namge kodstycke här till en funktionen och binda en event-listener funkar ej,
    //vet inte vrf
    let previousScrollPosition
    $: {
        // (viewportWidth)
        previousScrollPosition = yScrollPosition;
        const scrollDelta = Math.abs(yScrollPosition - previousScrollPosition); 
        generateBreakpoints(30-Math.floor(scrollDelta/10))

        //Detta är det som lägger på bl.a blur effekten på startsidan
        if (isOpaque) {
            navbar?.classList.toggle('scrolled', yScrollPosition >= max_scroll)
            staticBackground?.classList.toggle('scrolled', yScrollPosition >= max_scroll) 
        }
    }

    function handleNavigation(href) {
        const href_topPath = href.split('/')[1]
        const active_topPath = active.split('/')[1]
        if (href_topPath != active_topPath) {
                dotWasActive();
            }
        
        newActive(href)
        if (active === '/') {
            isOpaque = true
        } 
        else {
            isOpaque = false
        }
        adjustPads()
        
    }

    let lastCallms = 0
    function handleResize () {
        //En basic throttle. Begränsar funktionsanrop till max en gång varje 40ms
        if ((Date.now() - lastCallms) < 50 && lastCallms != 0) {
            // console.log("throttle", Date.now())
            return   
        }
        adjustPads()
        checkLines()
        lastCallms = Date.now() 
    }
    //När sidans innehåll uppdateras (av swup)
    $: {
        if (contentReplaced) {
            readLinks(document.getElementsByTagName('a'))
            hero = document.getElementById('heroimg')
            if (hero) oberserver.observe(hero)
        } 
    }

</script>

<svelte:window 
    on:resize={handleResize}    
    bind:scrollY={yScrollPosition} 
    bind:innerWidth={viewportWidth}/>
<div id="staticBackground"
    bind:this={staticBackground}
    class:isOpaque={isOpaque} 
    style="--maxHeight: {max_height}px; --navHeight: {navHeight}px"></div>
<nav 
    bind:this={navbar} 
    id={isOpaque?'isOpaque':''}
    style="height:{navHeight}px; background-color: {isOpaque ? 'transparent' : 'transparent'}">
        <a href="/" on:click={()=>handleNavigation("/")}>
        </a>
    <img id="logo" src={baseUrl + "/images/KogvetHuvet.svg"} alt="det är ju loggan hummer" />
    
    <ul id="navList">
        {#each pages as { url, btnName, childPages }, topIndex}
        <li  class="navBtn" id="{btnName}">
            <span class="ddbutton"
                style="font-size:clamp(0px, {navFontSize}px, 3.1vw)" 
                class:active={active.split('/')[1] === (baseUrl+url).split('/')[1]}>
                <a tabindex="0" 
                    href="{baseUrl + url}">{btnName}
                </a>
                <span class="wrapper">
                    <div class="dot"></div>
                </span>
                {#if childPages.length > 1}
                <div class="ddcontent" 
                    class:isOpaque={isOpaque} 
                    id={btnName} 
                    bind:clientWidth={ddcontentWidth} 
                    bind:clientHeight={ddcontentHeight}>
                    <ul>
                    {#each childPages as { url, btnName }, index}
                        <li class="button" 
                        class:active={active.split('/')[2] && (active.split('/')[2] === (baseUrl+url).split('/')[2])}>
                            <div class="dot"></div>
                            <a 
                                tabindex={'0'} 
                                href="{baseUrl + url}">
                                {btnName}
                            </a>
                        </li>
                         <li class="line"></li>
                        
                        {/each}
                    </ul>
                </div>
                {/if}
                <div class="pad"></div>
            </span>
        </li>
        {/each}
    </ul>
</nav>



<style lang="scss">
@mixin pseudoTemplate {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    transition: all .2s ease-out;
}
* {
    transition: opacity .3s ease-in-out;
}
#staticBackground {
    display: none;
    height: var(--maxHeight);
    background-color: var(--navbar-bg);
    transition: all .3s;
    width: 100%;
    // z-index: -1;
}
nav {
    opacity: 100%;
    position: fixed;
    width: 100%;    
    display: none;
    visibility: hidden;
    justify-content: space-between;
    transition: height 10ms;
    box-shadow: 0 -10px 50px black;
    background-color: transparent;
    
    top: 0%;
    z-index: 1;
    &::after {
        @include pseudoTemplate;
        background-color: var(--navbar-bg);
        opacity: 1;
    }

    &>a{
        position: absolute;
        height: 80%;
        width: 7%;
        padding: 10px;
        padding-left: clamp(10px, 3vw, 60px);
    }

    #logo {
        padding: 10px;
        padding-left: clamp(10px, 3vw, 60px);
        overflow: visible;
    }
    #navList{
        display: flex;
        justify-content: center;
        list-style: none;
        width: 100%;
        padding-left: 0;
        height: 100%;
        margin: 0px;
        // gap: clamp(10px, 4%, 50px);

        .navBtn{
        display: flex;
        justify-content: flex-end;
        height: 100%;
        // padding-inline: clamp(1px, calc(12vw - 85px), 30px);
        margin-inline: clamp(1px, .4%, 5px);
        flex-grow: 1;
        // padding-inline: clamp(0px, calc(3%), 30px);
        
        &:first-child {
            flex-grow: 5;
            // margin-left: clamp(5px, calc(18vw - 120px), 300px);
        }
        &:last-child {
            margin-right: 30px;
            
        }

            .ddbutton {
            height: 100%;
            width: max-content;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: font-size 50ms;
            
            .wrapper {
                z-index: 20;
                width: 100%;
                height: 5px;
                opacity: 100%;
                &>.dot {
                    position: relative;
                    margin: auto;
                    background: white;
                }
            }

                & > a {
                text-decoration: none;
                color: var(--reflex-vit);
                transition: color ease-in-out .2s;
                }

                .ddcontent:has(a) {
                    position: absolute;
                    height: min-content;
                    /* pixel-värdet är bredden av scrollbaren */
                    width: 100%;
                    right: 0;
                    font-size: 1rem;
                    box-shadow:0px 0px 10px black;
                    background-color: var(--navbar-dropdown-bg);
                    top: 100%;

                    ul {
                        text-decoration: none;
                        list-style: none;
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: row;
                        justify-content: center;
                        align-content: center;
                        align-items: center;
                        column-gap: 15px;
                        row-gap: 2px;
                        margin-top: 3px;
                        margin-bottom: 3px;
                        width: 85%;
                        height: 100%;
                        margin-left: auto;
                        margin-right: auto;
                        padding: 0;
                        * {
                            text-decoration: none;
                        }
                    }

                    .button {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        margin-left: -4px;
                        height: 100%;
                        a {
                            color: var(--buckethat-svart);
                           padding: 9px;
                           pointer-events: all;
                           mix-blend-mode: darken;
                        }
                        .dot {
                            height: 5px;
                            width: 5px;
                            clip-path: inset(2.5px 2.5px 2.5px 2.5px);
                            position: relative;
                            background-color: var(--buckethat-svart);
                            transform: none;
                            right: -5px;
                            transition: clip-path ease-in-out .2s;
                            
                        }    
                    }

                    .line {
                        height: 1.3em;
                        border: var(--buckethat-svart) .4px solid; /*Fattar inte varför, men med width:1px så får de olika bredd, ser megakonstigt ut*/
                        &:last-child {
                            display: none;
                            // margin-right: -20px;    
                        }
                    }
                }
                &:has(.ddcontent a) .pad {
                    pointer-events: none;
                    right: 0;
                    width: 100vw;
                    height: 100px;
                    opacity: 0;
                    position: absolute;
                    top: 100%;
                    z-index: -1;
                }
            }
        }
    }
}


    /* Animation och interaktivitet med knapparna och dropdowns */
nav {
#navList {
.navBtn{
    .ddcontent:has(a) {
        /* det som animeras */
        clip-path: inset(100% 0 -100px 0);
        transform: translateY(-100%);
        opacity: 0%;
        transition: ease-in-out .4s;
        transition-property: opacity, transform, clip-path, background-color;
        a:hover {
            text-decoration: underline;
        }
    }
    .wrapper .dot {
        transition: all .4s ease-in-out;
        /* det som animeras */
        width: 0px;
        height: 2px;

    }
    a:hover {
        color: rgb(152, 152, 152);
    }
    &:hover {
        &:not(:has(.active .ddcontent:hover, .pad:hover)) .wrapper .dot {
        clip-path: inset(0 0 -100px 0);
        width: 98%;
        transform: translateY(0px);
        height: 2px;
        border-radius: 0px;

        }
        .ddcontent {
        opacity: 100%;
        pointer-events: all;
        transform: translate3d(0,0,0);
        clip-path: inset(0px 0 -100px 0);
        }
        .ddbutton:has(a) .pad {
        pointer-events: all;
        }
    }
    /* Active ddcontent animeras tillbaka när den andra fokuseras */
    &:hover ~ .navBtn .active .ddcontent,
    &:has(~ .navBtn:hover) .active .ddcontent {
        opacity: 0%;
        clip-path: inset(100% 0 -100px 0);
        transform: translateY(-100%);
    }
    .active {
        .ddcontent:has(a) {
        opacity: 100%;
        background-color: var(--navbar-active-dropdown-bg);
        transform: translate3d(0, 0, 0);
        clip-path: inset(0 0 -100px 0);
        .button.active .dot {
                clip-path: inset(0 0 0 0);
            }
        }

        .dot {
            clip-path: inset(0 0 0 0);
            transform: translateY(3px);
            border-radius: 5px;
            width: 5px;
            height: 5px;
        }

    }


}}}


@keyframes ddCollapse {

}

//Styles för när den är genomskinlig
#staticBackground:global(.isOpaque) {
    height: 0;
    margin-bottom: 0 !important; //!important har högst, så detta överskrider den margin den får av javascript
    &::after {

    }
    &:global(.scrolled)::after {
        @include pseudoTemplate;
        opacity: 1;
        height: var(--navHeight);
        position: fixed;
        top: 0%;
        z-index: -5;
        background-color: var(--navbar-bg);
    }
}
nav:global(#isOpaque) {

    box-shadow: none;
    &::after {
        @include pseudoTemplate;
        backdrop-filter: blur(15px);
        background-color: transparent;
    }
    &::before {
        @include pseudoTemplate;
        box-shadow: 0 -10px 60px black;
    }

    #navList>.navBtn>.ddbutton>.ddcontent {
        background-color: rgba(25, 253, 0, 0.03);
        // background-color: transparent;
        // box-shadow: inset -200px 0 30px var(--koggis-grön);
        box-shadow: none;
        backdrop-filter: blur(4px);
        a {
            transition: color .3s ease-in-out;
        }
        &::after {
            @include pseudoTemplate;
            // backdrop-filter: invert(100%);
            box-shadow:  0 0 10px black;
            top: 0;
        }
    }
    
    &:global(.scrolled) {
        &::after, &::before {
            opacity: 1 !important;
        }
        #navList>.navBtn>.ddbutton>.ddcontent::after {
            opacity: 1 !important;         
            // box-shadow: inset 0 0 10px black;
        }
    }

    &:global(.intersectingHero) {
        .ddcontent .line {
            opacity: 0 !important;
        }
        .ddcontent a {
            color: var(--reflex-vit) !important;
        }
    }
    //Styles efter yScrollPosition har överskridit max_scroll och hero fortfarande syns
    &:global(.scrolled.intersectingHero) {
        
    }

    &:global(.scrolled):not(.intersectingHero) {
        &::after {
            opacity: 1;
            background-color: var(--navbar-bg);
            // backdrop-filter: none;
            // box-shadow: none;
        }
        #navList>.navBtn>.ddbutton>.ddcontent {
            background-color: var(--reflex-vit);
        }
    }
}

@media (min-width: 577px) {
    nav {
        visibility: unset;
        display: flex;
        margin: auto;
        width: 100%; 
    }
    #staticBackground {
        display: block;
    }
}
</style>