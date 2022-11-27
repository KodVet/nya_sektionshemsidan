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
            <li class="navBtn" id="{pageData.pageData.btnName}">
                <div class="ddbutton" on><a href="{pageData.url}" class={active === pageData.url ? 'underlined' : ''}>{pageData.pageData.btnName}</a>
                    <div class="ddcontent" id="{pageData.pageData.btnName}" style = "background-color: {active === pageData.url ? 'lightgreen' : 'grey'};">
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

    .navBtn {
        counter-increment: navBtncount; 
    }

    .ddbutton:hover .ddcontent {
        opacity: 100%;
        transform: translateY(0);
    }
    .navBtn:has(.underlined) .ddcontent {
        opacity: 100%;
        transform: translateY(0);
        transition: none;
        z-index: 0;
    }
    .ddcontent{
        position: absolute;
        left: 0px;
        /* background-color: #f9f9f9; */
        width:100%;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        display: flex;
        transform: translateY(-50%);
        opacity: 0%;
        transition: all ease-in-out .5s;
        top: 100%;
    }

    .ddcontent a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
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