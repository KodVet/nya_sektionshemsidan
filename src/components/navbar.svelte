<script>

    export let pages;
    //console.log("inuti navbar-komponenten:", pages)
    export let active;
    let y;
    let nav;

    let min_h = 60;
    let max_h = 115;
    let max_scroll = 200;
    let nav_h = String(max_h) + "px";
    function nav_scroll() {
        if(0<=y && max_scroll>=y){
            nav_h = String(max_h - ((max_h-min_h)/max_scroll)*y) + "px"
            console.log("nav_scroll", nav_h, y, nav.offsetTop)
        }
        else{
            nav_h = String(min_h) + "px"
        }
    }

    let sticky = false
    // function sticky_nav(){
    //     if (y >= nav.offsetTop){
    //         sticky = true
    //         console.log("I AM STICKY", nav.offsetTop)
    //     }
    //     else {
    //         sticky=false
    //     }
    // }

    function scroll_funcs() {
        // sticky_nav();
        nav_scroll();
    }

    console.log("javascript funkar")

</script>

<svelte:window on:scroll={scroll_funcs} bind:scrollY={y}/>
<div class="wrapper">
<nav bind:this={nav} style="height:{nav_h}">
    <img id="logo" src="images/KogvetHuvet.svg" alt="det är ju loggan hummer" />
    <ul>
        {#each Object.values(pages) as pageData}
        <li class="navBtn" id="{pageData.pageData.btnName}">
            <div class="ddbutton" class:active="{active === pageData.url}"><a href="{pageData.url}">{pageData.pageData.btnName}</a>
                <div class="dot" style={active === pageData.url ? 'display: block;' : 'display: none;'}></div>
                <div class="ddcontent" id="{pageData.pageData.btnName}" style = "background-color: {active === pageData.url ? '#D1F2D5' : '#F3F3F4'};">
                    <a href="#">Link 1</a>
                    <a href="#">Links...</a>
                    <a href="#">{active}</a>
                    <a href="{pageData.url}">{pageData.url}</a>
                </div>
            </div>
        </li>
        {/each}
    </ul>
</nav>
</div>


<style>
    #logo {
        padding: 15px;
        padding-left: 60px;
    }
    li{
        font-size: x-large;
        font: bold;
        height: 100%;
        padding-inline: 30px;
    }
    li:first-child {
        padding-left: 200px;
    }
    .ddbutton > a {
        text-decoration: none;
        color: inherit;
    }
    .wrapper {
        position: relative;
        z-index: 10;
        width: 100%;
        height: fit-content;
    }

    .underlined{
        text-decoration: underline;
    }

    ul{
        display: flex;
        justify-content: flex-start;
        width: 1100px;
        list-style: none;
        align-items: center;
        padding: 0%;
        height: 100%;
        margin: 0px;
    }

    nav {
        opacity: 100%;
        position: fixed;
        width: 100%;
        background-color: rgba(3, 125, 79, 1);
        display: none;
        justify-content: space-between;
        transition: 20ms;
        top: 0%;
        z-index: 5;
    }
    nav > * {
        position: relative;
        opacity: 100%;
    }
    nav * {
        z-index: initial;
    }
    .ddbutton {
        transition: color ease-in-out .5s;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .navBtn:hover .ddcontent {
        opacity: 100%;
        pointer-events: all;
        transform: translateY(0%);
        clip-path: inset(0 0 0 0);
    }
    .navBtn:hover {
        color: aliceblue;
    }

    .navBtn:hover ~ .navBtn .active .ddcontent {
        opacity: 0%;
        transform: translateY(-100%);
        clip-path: inset(95px 0 0 0);
        /* transition: all ease-in-out .5s; */
    }
    /* .navBtn:has(~ .active) */

    .active .ddcontent {
        opacity: 100%;
        /* transition: none; */
        transform: translateY(0%);
        clip-path: inset(0 0 0 0);
        z-index: -10;

    }
    ul .active {
        margin-top: 3px;
    }
    .ddcontent{
        position: absolute;
        pointer-events: none;
        height: 60px;
        /* pixel-värdet är bredden av scrollbaren */
        width: calc(100vw - 16px);
        right: 0;
        padding: 0px;
        /* box-shadow: 0px 8px 36px 0px rgba(0,0,0,0.7); */
        display: flex;
        z-index: -5;
        top: 100%;
        background-clip: content-box;
        padding-bottom: 35px;

        /* animationen */
        clip-path: inset(95px 0 0 0);
        transform: translateY(-100%);
        opacity: 0%;
        transition: opacity, transform, clip-path, ease-in-out .5s;
    }

    .ddcontent a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
}
    .navBtn .dot {
        position: relative;
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        left: 50%;
        transform: translateY(5px);
    }

    .stickied{
        position: fixed !important;
        top: 0px;
    }

@media (min-width: 577px)
{nav {
    display: flex;
    margin: auto;
    width: 100%; }
}
</style>