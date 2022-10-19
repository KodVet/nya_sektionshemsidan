<script>
	export let active;    
</script>


<nav> 
    <img src="images/vector.png" alt="det är ju loggan hummer" />
    <ul>
        <li><a href="index" class={active === "start" ? 'underlined' : ''}>Start</a></li>
        <li><a href="student" class={active === "student" ? 'underlined' : ''}>Student</a></li>
        <li><a href="sektionen">Om sektionen</a></li>
        <li><a href="medlemmar">Förmedlemmar</a></li>
        <li><a href="kontakt">Kontakt</a></li>
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