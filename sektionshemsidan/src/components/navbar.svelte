<script>
	export let active;  
    let y;
    let nav_h;
    let min_h = 75;
    let max_h = 107;
    let max_scroll = 100;
    function nav_scroll() {
        if(0<=y && 100>=y){
            nav_h = String(max_h - ((max_h-min_h)/max_scroll)*y) + "px"
            console.log(nav_h) 
        }  
    }
</script>

<svelte:window on:scroll={nav_scroll} bind:scrollY={y}/>
<nav style="height:{nav_h}"> 
    <img id="logo" src="images/KogvetHuvet.svg" alt="det är ju loggan hummer" />
<!--     <div>
        Du har scrollat {y} pixlar
    </div> -->
    <ul>
        <li><a href="/" class={active === "start" ? 'underlined' : ''}>Start</a></li>
        <li><a href="student" class={active === "student" ? 'underlined' : ''}>Student</a></li>
        <li><a href="sektionen">Om sektionen</a></li>
        <li><a href="medlemmar">För medlemmar</a></li>
        <li><a href="kontakt">Kontakt</a></li>
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
        display: flex;
        justify-content: space-between;
        
    }
</style>