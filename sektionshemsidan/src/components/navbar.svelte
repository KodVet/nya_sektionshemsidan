<script>
	export let active;    
</script>


<nav> 
    <img src="images/vector.png" alt="det är ju loggan hummer" />
    <ul>
        <li><a href="index.astro" class={active === "start" ? 'underlined' : ''}>Start</a></li>
        <li><a href="" class={active === "student" ? 'underlined' : ''}>Student</a></li>
        <li><a href="">Om sektionen</a></li>
        <li><a href="">Förmedlemmar</a></li>
        <li><a href="">Kontakt</a></li>
    </ul>
   
</nav>


<style>
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
        padding-right: 30px;
    }
    
    nav {
        width: 100%;
        background-color: green;
        display: flex;
        justify-content: space-between;
        
    }
</style>