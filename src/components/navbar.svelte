<script>
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    export let baseUrl;
    export let active;
    import { pages } from '../pageStructure.json'
    let navbar;
    let yScrollPosition;
    

    // console.log("inuti navbar-komponenten:", baseUrl, pages)
    let lines
    onMount(() =>{
        console.log("nu är active: ", active)
        console.log("och splittad är den: ", active.split('/'))
        lines = document.getElementsByClassName('line')
        const observer = new ResizeObserver((entries) => {
            console.log(entries)
        })
        observer.observe(navbar)
    });

    beforeUpdate(() => {
        
    });

    afterUpdate(() => {
        

    })


    let min_height = 50;
    let max_height = 100;
    let max_scroll = 200;
    let nav_height = String(max_height) + "px";
    function navHeight() {
            nav_height = String(max_height - ((max_height-min_height)/max_scroll)*yScrollPosition) + "px"

    }

    const maxFontSize = 24
    const minFontSize = 18
    let navFontSize;
    function animateFontSize() {
            navFontSize = String(maxFontSize - ((maxFontSize-minFontSize)/max_scroll)*yScrollPosition) + "px"
            console.log("navFontSize", navFontSize)
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

    function handleScroll() {
        if (0<=yScrollPosition && max_scroll>=yScrollPosition) {
            console.log(max_scroll, yScrollPosition)
            navHeight();
            animateFontSize();
        }
        
    }

    function handleNavigation(href) {
        // console.log("active var: ", active)
        // console.log("och splittad är den: ", active.split('/'))
        let href_topPath = href.split('/')[1]
        let active_topPath = active.split('/')[1]
        if (href_topPath != active_topPath) {
                // console.log('kör')
                dotWasActive();
            }
        
        newActive(href)
        
        
        
        // console.log("och länken: ", href)
        // console.log("splittad: ", href.split('/'))
        console.log(lines)
        
    }

</script>

<svelte:window on:scroll={handleScroll} bind:scrollY={yScrollPosition}/>
<div id="navbarElement" class="container">
<nav bind:this={navbar} style="height:{nav_height}">
    <img  id="logo" src={baseUrl + "/images/KogvetHuvet.svg"} alt="det är ju loggan hummer" />
    <ul id="navList">
        {#each pages as { url, btnName, childPages }}
        <li  class="navBtn" id="{btnName}">
            <span  class="ddbutton" style="font-size:{navFontSize}" class:active={active.split('/')[1] === (baseUrl+url).split('/')[1]}>
            <a tabindex="0" on:click={() => baseUrl+url !== active && handleNavigation(baseUrl + url)} href="{baseUrl + url}">{btnName}</a>
                <span class="wrapper">
                    <div class="dot"></div>
                </span>
                <div class="ddcontent" id={btnName}>
                    <ul>
                    {#each childPages as { url, btnName }, index}
                        <li class="button" class:active={active.split('/')[2] && (active.split('/')[2] === (baseUrl+url).split('/')[2])}>
                            <div class="dot"></div>
                            <a tabindex={'0'} on:click={() => baseUrl+url !== active && handleNavigation(baseUrl + url)} href="{baseUrl + url}">{btnName}</a>
                        </li>
                        <li class="line"></li>
                    {/each}
                    </ul>
                </div>
                <div class="pad"></div>
            </span>
        </li>
        {/each}
    </ul>
</nav>
</div>


<style lang="scss">


nav {
    opacity: 100%;
    position: fixed;
    width: 100%;    
    background-color: var(--koggis-grön);
    display: none;
    visibility: hidden;
    justify-content: space-between;
    transition: height 15ms;
    top: 0%;
    z-index: 1;
    
    #logo {
        padding: 15px;
        padding-left: 60px;
    }
    #navList{
        display: flex;
        justify-content: flex-end;
        list-style: none;
        align-items: center;
        padding: 0%;
        height: 100%;
        margin: 0px;

        .navBtn{
        font-size: x-large;
        font: bold;
        height: 100%;
        padding-inline: 30px;

            .ddbutton {
            transition: all ease-in-out .5s;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: font-size 15ms;
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
                    padding: 8px;
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
                        gap: 18px;
                        width: 85%;
                        margin: auto;
                    }

                    .button {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        margin-left: -4px;
                        a {
                            color: var(--buckethat-svart);
                        }
                        .dot {
                            height: 5px;
                            width: 5px;
                            clip-path: inset(2.5px 2.5px 2.5px 2.5px);
                            position: relative;
                            background-color: var(--buckethat-svart);
                            transform: none;
                            right: 4px;
                            transition: clip-path ease-in-out .2s;
                            
                        }    
                    }

                    .line {
                        height: 1.3em;
                        border: var(--buckethat-svart) .4px solid; /*Fattar inte varför, men med width:1px så får de olika bredd, ser megakonstigt ut*/
                        &:last-child {
                            height: 0;
                            border: none;
                        }
                    }
                }
                &:has(.ddcontent:has(a)) .pad {
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
    }
    .wrapper .dot {
        transition: all .4s ease-in-out;
        /* det som animeras */
        width: 0px;
        height: 2px;

    }
    filter: drop-shadow(0px 110px 10px 10px #888888);
    a:hover {
        color: rgb(152, 152, 152);
    }
    &:hover {
        .wrapper .dot {
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
        pointer-events: all;
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




@media (min-width: 577px)
{nav {
    visibility: visible;
    display: flex;
    margin: auto;
    width: 100%; }
}
</style>