<script>
	export let active;    
</script>


<nav> 
    <img id="logo" src="images/KogvetHuvet.svg" alt="det är ju loggan hummer" />
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
        width: 100%;
        background-color: rgba(3, 125, 79, 1);
        display: flex;
        justify-content: space-between;
        
    }
</style>