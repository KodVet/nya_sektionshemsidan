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
<nav bind:this={nav} style="height:{nav_h}">
    <!-- <nav bind:this={nav} style="height:{nav_h}" class:stickied={sticky}> -->
        <img id="logo" src="images/KogvetHuvet.svg" alt="det är ju loggan hummer" />
    <!--     <div>
            Du har scrollat {y} pixlar
        </div> -->
    
        <ul>
            {#each Object.values(pages) as pageData}
            <li class="navBtn">
                <div class="ddbutton" on><a href="{pageData.url}" class={active === pageData.url ? 'underlined' : ''}>{pageData.pageData.btnName}</a>
                    <div class="ddcontent">
                        <a href="#">Link 1</a>
                        <a href="#">Links...</a>
                        <a href="#">{active}</a>
                        <a href="#">{pageData.url}</a>
                    </div>
                </div>
            </li>
            {/each}
        </ul>
    
</nav>

<style>
    #logo {
        padding: 15px;
        padding-left: 60px;
    }
    li{
        font-size: x-large;
        font: bold;
    }
    a{
        text-decoration: none;
        color: inherit;
    }

    .underlined{
        text-decoration: underline;
    }

    ul{
        display: flex;
        justify-content: space-between;
        width: 650px;
        list-style: none;
        align-items: center;
        padding-right: 100px;
    }

    nav {
        position: fixed;
        width: 100%;
        background-color: rgba(3, 125, 79, 1);
        display: none;
        justify-content: space-between;
        transition: 20ms;
    }

    .ddbutton:hover .ddcontent {
      display:flex;
    }
    .ddcontent{
        position: absolute;
        display: none;
        left: 0px;
        background-color: #f9f9f9;
        width:100%;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        top: 100%;
    }

    .ddcontent a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
}

    .stickied{
        position: fixed !important;
        top: 0px;
    }

@media (min-width: 577px)
{nav {
    display:flex;
    margin: auto;
    width: 90%; }
}
</style>