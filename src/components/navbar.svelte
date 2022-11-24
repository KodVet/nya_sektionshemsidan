<script>
    import Dropdown from "./dropdown.svelte";
    
    // import funktionen alt1:
    //         ||
    const pages = import.meta.glob('../pages/**/index.astro')
    //console.log("pages", pages)
    let pageParams = getPageParams();
    async function getPageParams() {
        let params = [];
        for (const path in pages) {
        await pages[path]().then((mod) => {
            const temp = {
                url: ((mod.url) ? mod.url : '/'),
                btnName: mod.btnName
            }
            params.push(JSON.parse(JSON.stringify(temp)));
            params = params;
            // console.log(path, mod, mod.btnName, temp.url)
        })
    }
    return params;
    };
    // pageParams.then(resolved => console.log(resolved, "här är den"));






	export let active;
    let y;
    let nav;

    let min_h = 60;
    let max_h = 115;
    let max_scroll = 100;
    let nav_h = String(max_h) + "px";

    let sticky = false
    function nav_scroll() {
        if(0<=y && 100>=y){
            nav_h = String(max_h - ((max_h-min_h)/max_scroll)*y) + "px"
            console.log("nav_scroll", nav_h, y, nav.offsetTop)
        }
    }

    function sticky_nav(){
        if (y >= nav.offsetTop){
            sticky = true
            console.log("I AM STICKY", nav.offsetTop)
        }
        else {
            sticky=false
        }
    }
    let margin_max = 40;
    let margin = "40px";
        function margin_scroll() {
            if(0<=y && 100>=y){
                margin = String(margin_max - ((margin_max-23.5)/max_scroll)*y) + "px"
                console.log(margin)
            }
    }
    function scroll_funcs() {
        sticky_nav();
        nav_scroll();
        margin_scroll();
    }
    console.log("javascript funkar")

</script>

<svelte:window on:scroll={scroll_funcs} bind:scrollY={y}/>
<nav bind:this={nav} style="height:{nav_h}" class:stickied={sticky}> 
    <img id="logo" src="images/KogvetHuvet.svg" alt="det är ju loggan hummer" />
<!--     <div>
        Du har scrollat {y} pixlar
    </div> -->

    <ul>
        {#await pageParams then result}
        {#each result as params}

        <div class="ddbutton"><li><a href="{params.url}" class={active}>{params.btnName}</a></li>
            <div class="ddcontent" style = "margin-top:{margin};">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
            </div>
        </div>

        {/each}
        {/await}
        <!-- <div class="ddbutton">
            <li><a href="/" class={active === "start" ? 'underlined' : ''}>Start</a></li>
            <div class="ddcontent" style = "margin-top:{margin};">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
            </div>
        </div>

        <div class="ddbutton">
            <li><a href="/student" class={active === "student" ? 'underlined' : ''}>Student</a></li>
            <div class="ddcontent" style = "margin-top:{margin};">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href='#'>Link 3</a>
           </div>
        </div>

        <div class="ddbutton">
            <li><a href="/sektionen" class={active === "sektionen" ? 'underlined' : ''}>Om sektionen</a></li>
            <div class="ddcontent" style = "margin-top:{margin};">
                <a href="sektionen/inlägg">inlägg</a>
                <a href="#">Link 2</a>
            </div>
        </div>

        <div class="ddbutton">
            <li><a href="/medlemmar" class={active === "medlemmar" ? 'underlined' : ''}>För medlemmar</a></li>
            <div class="ddcontent" style = "margin-top:{margin};">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
            </div>
        </div>

        <div class="ddbutton">
            <li><a href="/kontakt" class={active === "kontakt" ? 'underlined' : ''}>Kontakt</a></li>
            <div class="ddcontent" style = "margin-top:{margin};">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
            </div>
        </div> -->
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
        position: relative;
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
        display: none;
        position: fixed;
        left: 0px;
        background-color: #f9f9f9;
        width:100%;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
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