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
    export let isOpaque = false 
    // $: console.log(ddcontentWidth)
    

    // console.log("inuti navbar-komponenten:", baseUrl, pages)
    let lines = [[],[],[],[], []]
    onMount(() =>{
        // if (isOpaque) {
        //     console.log("opaque yep")
        //     navbar.style.backgroundColor = 'transparent'
        //     staticBackground.style.display = 'none'
        // }
        lines = document.getElementsByClassName('line')
        generateBreakpoints(15)
        console.log("lines:", lines)
        ddbuttons = Object.values(document.getElementsByClassName('ddbutton')).map(ddbutton => {
            if (ddbutton.querySelector('.ddcontent').querySelector('a')) {
                return ddbutton
            }
        })
        // navbar.style.backgroundColor = "black"
        // document.getElementsByTagName("nav").style.backgroundColor = "black"
        // console.log("ddbuttons: HALLÅ DITT FANSKAP", ddbuttons)
        // console.log("logga då jävla sopa")
    });

    beforeUpdate(() => {
        
    });

    afterUpdate(() => {
        const activeDdcontentHeight = document.querySelector('.ddbutton.active .ddcontent').clientHeight
        // console.log("activeDdcontentHeight: ", activeDdcontentHeight)
        staticBackground.style.marginBottom = `${activeDdcontentHeight}px`

        
        
        for (ddbutton of ddbuttons) {
            if (!ddbutton) continue
            const pad = ddbutton.querySelector('.pad')
            const ddcontent = ddbutton.querySelector('.ddcontent')
            pad.style.height = `${ddcontent.clientHeight + 40}px`
            // console.log(ddbutton)
        };
        // const ddcontentPad = document.querySelector('.ddbutton.active .pad')
        // ddcontentPad.style.height = `${activeDdcontentHeight + 50}px`
        
    })

    let min_height = 50;
    let max_height = 100;
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
        active = href
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
    
    //handleScroll
    let previousScrollPosition
    $: {
        // console.log(viewportWidth)
        previousScrollPosition = yScrollPosition;
        const scrollDelta = Math.abs(yScrollPosition - previousScrollPosition); 

        function handleScroll(){
            generateBreakpoints(30-Math.floor(scrollDelta/10))
        }
        handleScroll()

        // console.log("previousScrollPosition innan: ", previousScrollPosition);
        if (scrollDelta>100) {
            setTimeout(handleScroll, 100)
        };
        // console.log("previousScrollPosition efter : ", previousScrollPosition);
        
    }

    function handleNavigation(href) {
        // console.log("active var: ", active)
        // console.log("och splittad är den: ", active.split('/'))
        const href_topPath = href.split('/')[1]
        const active_topPath = active.split('/')[1]
        if (href_topPath != active_topPath) {
                dotWasActive();
            }
        
        newActive(href)
        // console.log(lines)
        if (active === '/') {
            isOpaque = true
        } else isOpaque = false
    }
    let ddbutton;
    $: {
        let _ = viewportWidth
            for (let i = 0; i<(lines?.length); i++) {
                for (let j=0;j<(lines[i].length-1); j++) {
                    function checkTrailingLines(){
                        if (lines[i][j].offsetLeft > lines[i][j+1].offsetLeft && lines[i][j].offsetLeft > lines[i][j].nextSibling.offsetLeft) {
                            lines[i][j].style.visibility = "hidden"
                    }
                    
                        else {
                            lines[i][j].style.visibility = "visible"
                        }
                    }
                    checkTrailingLines()
                    function checkLeadingLines(){
                        if (j!=0){
                            if (lines[i][j].offsetLeft < lines[i][j-1].offsetLeft && lines[i][j-1].nextSibling.offsetTop < lines[i][j].nextSibling.offsetTop) {
                                lines[i][j].style.visibility = "hidden"
                            }
                        }
                    
                        else {
                            lines[i][j].style.visibility = "visible"
                        }
                    }
                    checkLeadingLines()
                }
            }
    }

        

</script>

<svelte:window bind:scrollY={yScrollPosition} bind:innerWidth={viewportWidth}/>
<div id="staticBackground" bind:this={staticBackground} 
style="height:{isOpaque ? '0' : max_height}px"></div>
<nav bind:this={navbar} 
style="height:{navHeight}px; background-color: {isOpaque ? 'transparent' : ''}">
        <a href="/" on:click={()=>handleNavigation("/")}>
        </a>
    <img id="logo" src={baseUrl + "/images/KogvetHuvet.svg"} alt="det är ju loggan hummer" />
    
    <ul id="navList">
        {#each pages as { url, btnName, childPages }, topIndex}
        <li  class="navBtn" id="{btnName}">
            <span bind:this={ddbutton} class="ddbutton"
             style="font-size:clamp(0px, {navFontSize}px, 3.1vw)" 
             class:active={active.split('/')[1] === (baseUrl+url).split('/')[1]}>
            <a tabindex="0" 
            on:click={() => baseUrl+url !== active && handleNavigation(baseUrl + url)} 
            href="{baseUrl + url}">{btnName}
            </a>
                <span class="wrapper">
                    <div class="dot"></div>
                </span>
                <div class="ddcontent" 
                style="background-color: {isOpaque ? 'transparent' : ''};" id={btnName} bind:clientWidth={ddcontentWidth} bind:clientHeight={ddcontentHeight}>
                    <ul>
                    {#each childPages as { url, btnName }, index}
                        <li class="button" 
                        class:active={active.split('/')[2] && (active.split('/')[2] === (baseUrl+url).split('/')[2])}>
                            <div class="dot"></div>
                            <a 
                            style="color: {isOpaque ? 'white' : ''};" 
                            tabindex={'0'} 
                            on:click={() => baseUrl+url !== active && handleNavigation(baseUrl + url)} 
                            href="{baseUrl + url}">{btnName}</a>
                        </li>
                         <li 
                         bind:this={lines[topIndex][index]}
                         class="line"
                         style="display: {isOpaque ? 'none' : ''}"></li>
                        
                        {/each}
                    </ul>
                </div>
                <div class="pad"></div>
            </span>
        </li>
        {/each}
    </ul>
</nav>



<style lang="scss">

#staticBackground {
    display: none;
    background-color: var(--koggis-grön);
    transition: all .3s;
}
nav {
    opacity: 100%;
    position: fixed;
    width: 100%;    
    // background-color: var(--koggis-grön);
    background-color: transparent;
    display: none;
    visibility: hidden;
    justify-content: space-between;
    transition: height 10ms;
    // transition: background-color 2000ms;
    top: 0%;
    z-index: 1;

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
                    font-size: 1.125rem;
                    box-shadow: 0px 110px 10px 10px #888888;
                    background-color: var(--reflex-vit);
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
                        gap: 15px;
                        margin-top: 5px;
                        margin-bottom: 5px;
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
        clip-path: inset(0 0 100% 0);

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
    filter: box-shadow(0px 110px 10px 10px #888888);
    a:hover {
        color: rgb(152, 152, 152);
    }
    &:hover {
        &:not(:has(.active .ddcontent:hover, .pad:hover)) .wrapper .dot {
        clip-path: inset(0 0 0 0);
        width: 98%;
        transform: translateY(0px);
        height: 2px;
        border-radius: 0px;

        }
        .ddcontent {
        opacity: 100%;
        pointer-events: all;
        clip-path: inset(0 0 0 0);
        }
        .ddbutton:has(a) .pad {
        pointer-events: all;
        }
    }
    /* Active ddcontent animeras tillbaka när den andra fokuseras */
    &:hover ~ .navBtn .active .ddcontent,
    &:has(~ .navBtn:hover) .active .ddcontent {
        opacity: 0%;
        clip-path: inset(0 0 100% 0);
    }
    .active {
        .ddcontent:has(a) {
        opacity: 100%;
        background-color: var(--limejuice);
        clip-path: inset(0 0 0 0);
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




@media (min-width: 577px) {
    nav {
        visibility: visible;
        display: flex;
        margin: auto;
        width: 100%; 
    }
    #staticBackground {
        display: block;
    }
}
</style>